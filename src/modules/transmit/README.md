# @readymade/transmit

Swiss-army knife for communicating over WebRTC DataChannel, WebSocket or Touch OSC.

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

## transit-server

For plug and play functionality use a Readymade `transmit-server`, a Node.js server that provides a WebRTC signaling server, WebSocket messaging channel, and WebSocket bridge for communicating over TouchOSC.

`transmit-server` is included in the Readymade starter code. Create a new Readymade project using the command `npx primr my-app`, renaming the directory `my-app` with your project name. `transmit-server` will be included in the project directory. After installing dependencies, run `yarn build:transmit` and `yarn serve:transmit`. Automatically, the WebSocket and Express servers should instantiate like so:

```
yarn serve:transmit
Express Server is listening on http://localhost:4449
Free ICE servers available by making a GET request to http://localhost:4449/ice
TouchOSC Message Server is listening on http://localhost:4445
Signal Server is listening on http://localhost:4446
Announce Server is listening on http://localhost:4447
Message Server is listening on http://localhost:4448
```

For more information about `primr`, read the [Readymade documentation](https://readymade-ui.github.io).
