# @readymade/transmit

Messaging protocol for transmitting over WebSocket, TouchOSC, and WebRTC DataChannel

```
npm install @readymade/transmit
```

## Getting Started

Import `Transmitter` and instantiate with a configuration Object.

```
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

For plug and play functionality use a Readymade `transmit-server`, a Node.js server that provides a WebRTC signaling server, WebSocket messaging channel, and WebSocket bridge for communicating over TouchOSC.

For more information, read the [Readymade documentation](https://readymade-ui.github.io).
