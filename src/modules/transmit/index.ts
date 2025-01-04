interface RTCConfiguration {
  iceServers?: RTCIceServer[];
  iceTransportPolicy?: RTCIceTransportPolicy;
  bundlePolicy?: RTCBundlePolicy;
  rtcpMuxPolicy?: RTCRtcpMuxPolicy;
  peerIdentity?: string;
  certificates?: RTCCertificate[];
  iceCandidatePoolSize?: number;
}

interface RTCIceServer {
  urls: string | string[];
  username?: string;
  credential?: string;
  credentialType?: RTCIceCredentialType;
}

type RTCIceTransportPolicy = 'all' | 'relay';
type RTCBundlePolicy = 'balanced' | 'max-bundle' | 'max-compat';
type RTCRtcpMuxPolicy = 'require';
type RTCIceCredentialType = 'password' | 'oauth';

export interface TransmitterServerConfiguration {
  http?: {
    protocol: string;
    hostname: string;
    port: number;
  };
  ws?: {
    osc?: {
      protocol: string;
      hostname: string;
      port: number;
    };
    signal?: {
      protocol: string;
      hostname: string;
      port: number;
    };
    announce?: {
      protocol: string;
      hostname: string;
      port: number;
    };
    message?: {
      protocol: string;
      hostname: string;
      port: number;
    };
  };
}

export interface TransmitterConfiguration {
  id?: string;
  sharedKey?: string;
  channelName?: string;
  onMessage?: any;
  onConnect?: any;
  onDisconnect?: any;
  rtcConfig?: RTCConfiguration;
  serverConfig?: TransmitterServerConfiguration;
}

export interface TransmitterMessage {
  id: string;
  type: string;
  source: string;
  target: string;
  payload: any;
}

const uuid = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const randomSharedKey = function () {
  let text = '';
  const possible = 'ABCDEFGHJKMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz023456789';

  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
};

export class Transmitter {
  public id: string;
  public sharedKey: string;
  public name: string;
  public dataChannelConfig: any;
  public remotePeerId: any;
  public peerConnection: RTCPeerConnection;
  public hasPulse: boolean;
  public isOpen: boolean;
  public channelName: any;
  public dataChannel: any;
  public connections: Record<string, RTCPeerConnection>;
  public debug: boolean = true;
  public rtcConfiguration: RTCConfiguration;
  public config: TransmitterConfiguration;
  public channel: RTCDataChannel;
  public store: {
    messages: Array<any>;
  };
  private ws: Record<string, WebSocket>;
  constructor(config: TransmitterConfiguration) {
    this.config = config;
    this.id = this.config.id || uuid();
    this.sharedKey = this.config.sharedKey || randomSharedKey();
    this.channelName = this.config.channelName
      ? this.config.channelName
      : 'channel'; // the name of the channel
    this.hasPulse = false;
    this.isOpen = false;
    this.connections = {};
    this.remotePeerId = null;
    this.store = { messages: [] };
    this.rtcConfiguration = config.rtcConfig
      ? config.rtcConfig
      : ({
          iceServers: [
            {
              urls: ['stun:stun.l.google.com:19302'],
            },
          ],
        } as RTCConfiguration);
    this.dataChannelConfig = {
      ordered: false,
      maxPacketLifeTime: 1000,
    };
    this.ws = {
      osc: this.config.serverConfig?.ws?.osc
        ? new WebSocket(
            this.getWebSocketAddress(this.config.serverConfig?.ws?.osc),
          )
        : null,
      signal: this.config.serverConfig?.ws?.signal
        ? new WebSocket(
            this.getWebSocketAddress(this.config.serverConfig?.ws?.signal),
          )
        : null,
      announce: null,
      message: this.config.serverConfig?.ws?.message
        ? new WebSocket(
            this.getWebSocketAddress(this.config.serverConfig?.ws?.message),
          )
        : null,
    };
    const connectMessage = {
      sharedKey: this.sharedKey,
      id: this.id,
      type: 'connect',
      method: 'webrtc',
    };

    if (this.debug) {
      console.log('id: ', this.id);
      console.log('sharedKey: ', this.sharedKey);
    }

    this.ws.signal?.addEventListener('open', () => {
      if (this.debug) console.log('Connected to Signal WebSocket server');
      this.ws.signal.send(JSON.stringify(connectMessage));
    });

    this.ws.signal?.addEventListener('message', (event) => {
      if (this.debug)
        console.log('Message from Signal server:', JSON.parse(event.data));
      const data = JSON.parse(event.data);
      if (data.id !== this.id) {
        this.onSignal(data);
      }
    });

    // Event listener for when the connection is opened
    this.ws.message?.addEventListener('open', () => {
      if (this.debug) console.log('Connected to Message WebSocket server');
      // Send a message to the server
      this.ws.message.send(JSON.stringify(connectMessage));
    });

    // Event listener for when a message is received from the server
    this.ws.message?.addEventListener('message', (event) => {
      if (this.debug)
        console.log('Message from Message server:', JSON.parse(event.data));
      const data = JSON.parse(event.data);
      if (data.id !== this.id) {
        this.onWebSocketMessage(event);
      }
    });

    if (
      this.config.serverConfig?.ws?.signal &&
      this.config.serverConfig?.ws?.announce
    ) {
      this.init();
      this.sendAnnounce();
    }
  }

  init(): void {
    const RTCPeerConnection =
      (<any>window).RTCPeerConnection ||
      (<any>window).mozRTCPeerConnection ||
      (<any>window).webkitRTCPeerConnection;

    this.peerConnection = new RTCPeerConnection(this.rtcConfiguration);
    this.peerConnection.onicecandidate = this.onICECandidate.bind(this);
    this.peerConnection.oniceconnectionstatechange =
      this.onICEStateChange.bind(this);
    this.channel = this.peerConnection.createDataChannel(
      this.channelName,
      this.dataChannelConfig,
    );
    this.channel.onopen = this.onDataChannelOpen.bind(this);
    this.channel.onmessage = this.onDataChannelMessage.bind(this);

    this.connections[this.remotePeerId] = this.peerConnection;

    if (this.debug)
      console.log('Setting up peer connection with ' + this.remotePeerId);
  }

  sendAnnounce(): void {
    const connectMessage = {
      sharedKey: this.sharedKey,
      id: this.id,
      type: 'connect',
      method: 'webrtc',
    };

    this.ws.announce = new WebSocket(
      this.getWebSocketAddress(this.config.serverConfig?.ws?.announce),
    );

    // Event listener for when the connection is opened
    this.ws.announce.addEventListener('open', () => {
      if (this.debug) console.log('Connected to Announce WebSocket server');
      // Send a message to the server
      this.ws.announce.send(JSON.stringify(connectMessage));
      if (this.debug)
        console.log('Announced our sharedKey is ' + this.sharedKey);
      if (this.debug) console.log('Announced our ID is ' + this.id);
    });

    // Event listener for when the connection is closed
    this.ws.announce.addEventListener('close', () => {
      if (this.debug) console.log('Disconnected from WebSocket server');
    });

    // Event listener for when an error occurs
    this.ws.announce.addEventListener('error', (event) => {
      console.error('WebSocket error:', event);
    });

    this.ws.announce.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      this.onAnnounce(data);
    });
  }

  onAnnounce(snapshot): void {
    const msg = snapshot;
    if (msg.id != this.id && msg.sharedKey == this.sharedKey) {
      if (this.debug)
        console.log('Discovered matching announcement from ' + msg.id);
      this.remotePeerId = msg.id;
      this.connect();
    }
  }

  sendSignal(msg): void {
    msg.source = this.id;
    msg.target = this.remotePeerId;
    this.ws.signal?.send(JSON.stringify(msg));
  }

  connect(): void {
    this.peerConnection
      .createOffer()
      .then((sessionDescription) => {
        if (this.debug) console.log('Sending offer to ' + this.remotePeerId);
        this.peerConnection.setLocalDescription(
          new RTCSessionDescription(sessionDescription),
        );
        this.sendSignal(sessionDescription);
      })
      .catch(function (err) {
        console.error('Could not create offer for ' + this.remotePeerId, err);
      });
  }

  onOffer(msg): void {
    const RTCSessionDescription =
      (<any>window).RTCSessionDescription ||
      (<any>window).mozRTCSessionDescription;
    this.hasPulse = true;
    if (this.debug) console.log('Client has pulse');
    this.remotePeerId = msg.source;
    this.init();
    this.peerConnection.setRemoteDescription(new RTCSessionDescription(msg));
    this.peerConnection
      .createAnswer()
      .then((sessionDescription) => {
        if (this.debug) console.log('Sending answer to ' + msg.source);
        this.sendSignal(sessionDescription);
        this.peerConnection.setLocalDescription(
          new RTCSessionDescription(sessionDescription),
        );
      })
      .catch(function (err) {
        console.error('Could not create answer for ' + this.remotePeerId, err);
      });
  }

  onAnswerSignal(msg): void {
    const RTCSessionDescription =
      (<any>window).RTCSessionDescription ||
      (<any>window).mozRTCSessionDescription;
    if (this.debug) console.log('Handling answer from ' + this.remotePeerId);
    this.peerConnection.setRemoteDescription(new RTCSessionDescription(msg));
  }

  onCandidateSignal(msg): void {
    const candidate = new (<any>window).RTCIceCandidate(msg);
    if (this.debug)
      console.log('Adding candidate to peerConnection: ' + this.remotePeerId);
    this.peerConnection.addIceCandidate(candidate);
  }

  onSignal(snapshot): void {
    const msg = snapshot;
    const sender = msg.source;
    const type = msg.type;
    if (!this.isOpen) {
      if (this.debug)
        console.log(
          "Received a '" +
            type +
            "' signal from " +
            sender +
            ' of type ' +
            type,
        );
      if (type == 'offer') {
        this.onOffer(msg);
      } else if (type == 'answer') {
        this.onAnswerSignal(msg);
      } else if (type == 'candidate' && this.hasPulse) {
        this.onCandidateSignal(msg);
      }
    }
  }

  onICEStateChange(): void {
    if (this.peerConnection.iceConnectionState == 'disconnected') {
      if (this.debug) console.log('Client disconnected!');
      if (this.config.onDisconnect) {
        this.config.onDisconnect({ remotePeerId: this.remotePeerId });
      }
    }
  }

  onICECandidate(ev): void {
    const candidate = ev.candidate;
    if (candidate) {
      if (this.debug) console.log('Sending candidate to ' + this.remotePeerId);
      this.sendSignal(candidate);
    } else {
      if (this.debug) console.log('All candidates sent');
    }
  }

  onDataChannelOpen(): void {
    if (this.debug)
      console.log(
        'Data channel created! The channel is: ' + this.channel.readyState,
      );

    if (this.channel.readyState == 'open') {
      this.isOpen = true;
      if (this.config.onConnect) {
        this.config.onConnect();
      }
    }
  }

  onDataChannelClosed(): void {
    if (this.debug) console.log('The data channel has been closed!');
    if (this.config.onDisconnect) {
      this.config.onDisconnect({ remotePeerId: this.remotePeerId });
    }
  }

  onWebSocketSignal(snapshot): void {
    const msg = snapshot.val();
    const sender = msg.source;
    const type = msg.type;
    if (sender === this.remotePeerId) {
      if (this.debug)
        console.log(
          "Received a '" +
            type +
            "' signal from " +
            sender +
            ' of type ' +
            type,
        );
      if (type == 'offer') {
        this.onOffer(msg);
      } else if (type == 'answer') {
        this.onAnswerSignal(msg);
      } else if (type == 'candidate' && this.hasPulse) {
        this.onCandidateSignal(msg);
      }
    }
  }

  createMessage(data: any) {
    const msg: TransmitterMessage = {
      id: uuid(),
      type: 'message',
      source: this.id,
      target: this.remotePeerId,
      payload: data,
    };
    if (this.debug)
      console.log('Sending message from: ' + msg.source + ' to: ' + msg.target);
    return JSON.stringify(msg);
  }

  send(data: any): void {
    const msg = this.createMessage(data);
    this.channel.send(msg);
  }

  sendSocketMessage(data: any): void {
    const msg = this.createMessage(data);
    this.ws.message?.send(msg);
  }

  sendTouchOSCMessage(address: string, data: Array<any>): void {
    const jsonString = JSON.stringify({
      address,
      args: data,
    });
    this.ws.osc?.send(jsonString);
  }

  onMessage(message: MessageEvent): void {
    const data = JSON.parse(message.data);
    this.store.messages.push(data);
    if (data.target === this.id) {
      if (this.debug) console.log('Received Message: ', message);
      if (this.config.onMessage) {
        this.config.onMessage(data);
      }
    }
  }

  onDataChannelMessage(message): void {
    this.onMessage(message);
  }

  onWebSocketMessage(message): void {
    this.onMessage(message);
  }

  getWebSocketAddress(config?: {
    protocol: string;
    hostname: string;
    port: number;
  }): string {
    return `${config?.protocol ? config.protocol : 'ws'}://${config?.hostname ? config.hostname : 'localhost'}:${config?.port ? config.port : 4448}`;
  }

  findMessagesByProperty(prop: string, value: any): Array<TransmitterMessage> {
    return this.store.messages.filter((message) => message[prop] === value);
  }
}
