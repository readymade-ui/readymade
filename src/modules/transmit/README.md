# @readymade/transmit

Swiss-army knife for communicating over WebRTC DataChannel, WebSocket or Touch OSC.

```bash
npm install @readymade/transmit
```

```bash
yarn add @readymade/transmit
```

## Getting Started

Import `Transmitter` and instantiate with a configuration Object.

```javascript
import { Transmitter, TransmitterConfig } from '@readymade/transmit';

const config: TransmitterConfig = {
  sharedKey: 'lobby',
  rtc: {
    iceServers,
  },
  serverConfig: {
    http: {
      protocol: 'http',
      hostname: 'localhost',
      port: 4449,
    },
    ws: {
      osc: {
        protocol: 'ws',
        hostname: 'localhost',
        port: 4445,
      },
      signal: {
        protocol: 'ws',
        hostname: 'localhost',
        port: 4446,
      },
      announce: {
        protocol: 'ws',
        hostname: 'localhost',
        port: 4447,
      },
      message: {
        protocol: 'ws',
        hostname: 'localhost',
        port: 4448,
      },
    },
  },
  onMessage,
  onConnect,
}

const transmitter = new Transmitter(config);
```

### Messages

When `signal` and `announce` servers are configured, the instance of `Transmitter` will automatically attempt a handshake with a remote peer. If a peer is found, a WebRTC DataChannel peer to peer connection will open. To send a message over the data channel use the `send` method.

```javascript
transmitter.send({ message: 'ping' });
```

If you want to send messages over WebSocket, use `sendSocketMessage`.

```javascript
transmitter.sendSocketMessage({ message: 'ping' });
```

To send a message over TouchOSC, use `sendTouchOSCMessage`, ensuring the data your are sending follows the OSC protocol. Below is an example of sending a OSC message with type definitions.

```javascript
transmitter.sendTouchOSCMessage('/OSCQUERY/Left Controls/Flip H', [
  {
    type: 'i',
    value: 1,
  },
]);
```

To listen for messages, inject a callback into the configuration. In the above example, `onMessage` would appear like so:

```javascript
const onMessage = (message) => {
  if (message.payload.event === 'ping') {
    this.transmitter.send({ event: 'pong' });
  }
};
```

To react to a peer to peer connection, bind an `onConnect` callback to the configuration.

## transit-server

For plug and play functionality use a Readymade `transmit-server`, a Node.js server that provides a WebRTC signaling server, WebSocket messaging channel, and WebSocket bridge for communicating over TouchOSC.

`transmit-server` is included in the Readymade starter code. Create a new Readymade project using the command `npx primr my-app`, renaming the directory `my-app` with your project name. `transmit-server` will be included in the project directory. After installing dependencies, run `yarn build:transmit` and `yarn serve:transmit`. Automatically, the WebSocket and Express servers should instantiate like so:

```bash
yarn serve:transmit
Express Server is listening on http://localhost:4449
Free ICE servers available by making a GET request to http://localhost:4449/ice
TouchOSC Message Server is listening on http://localhost:4445
Signal Server is listening on http://localhost:4446
Announce Server is listening on http://localhost:4447
Message Server is listening on http://localhost:4448
```

For more information about `primr`, read the [Readymade documentation](https://readymade-ui.github.io).
