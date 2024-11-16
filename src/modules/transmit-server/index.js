import WebSocket from 'ws';
import osc from 'osc';
import http from 'http';
import https from 'https';
import express from 'express';
import freeice from 'freeice';
import cors from 'cors';

import config from './config.js';

const DEBUG = process.env.DEBUG ? Boolean(process.env.DEBUG) : false;
const HTTP_PROTOCOLS = {
  http,
  https,
};

const protocol = config.http.protocol ? config.http.protocol : 'http';
const hostname = config.http.hostname ? config.http.hostname : 'localhost';
const httpPort = config.http.port ? config.http.port : 4449;

const touchOSCWSPort = config.ws.osc.port ? config.ws.osc.port : 4445;
const signalPort = config.ws.signal.port ? config.ws.signal.port : 4446;
const announcePort = config.ws.announce.port ? config.ws.announce.port : 4447;
const messagePort = config.ws.message.port ? config.ws.message.port : 4448;

const oscServer = HTTP_PROTOCOLS[protocol].createServer(
  config.ws.osc.serverOptions ? config.ws.osc.serverOptions : {},
);
const signalServer = HTTP_PROTOCOLS[protocol].createServer(
  config.ws.signal.serverOptions ? config.ws.signal.serverOptions : {},
);
const announceServer = HTTP_PROTOCOLS[protocol].createServer(
  config.ws.announce.serverOptions ? config.ws.announce.serverOptions : {},
);
const messageServer = HTTP_PROTOCOLS[protocol].createServer(
  config.ws.message.serverOptions ? config.ws.message.serverOptions : {},
);

const touchOSCWSS = new WebSocket.Server({ server: oscServer });
const signalWSS = new WebSocket.Server({ server: signalServer });
const announceWSS = new WebSocket.Server({ server: announceServer });
const messageWSS = new WebSocket.Server({ server: messageServer });

const signalClients = new Map();
const announceClients = new Map();
const messageClients = new Map();

if (config.osc) {
  const udpPort = new osc.UDPPort(config.osc);
  udpPort.open();

  touchOSCWSS.on('connection', (ws) => {
    // This is the format of oscM mssage
    // {
    //   address: '/osc/address',
    //   args: [message],
    //   message can equal value or { type: string, value: string } when typed
    // }
    udpPort.on('message', function (oscMessage, timeTag, info) {
      if (DEBUG) console.log('received osc message:', oscMessage, info);
      ws.send(JSON.stringify(oscMessage));
    });
    ws.on('message', (data) => {
      if (Buffer.isBuffer(data)) {
        const jsonString = data.toString();
        try {
          const jsonData = JSON.parse(jsonString);
          if (DEBUG)
            console.log(
              'osc:',
              jsonData,
              config.osc.remoteAddress + ':' + config.osc.remotePort,
            );
          udpPort.send(
            jsonData,
            config.osc.remoteAddress,
            config.osc.remotePort,
          );
        } catch (error) {
          console.error('Invalid JSON received:', error);
        }
      } else {
        try {
          const jsonData = JSON.parse(data);
          if (DEBUG)
            console.log(
              'osc:',
              jsonData,
              config.osc.remoteAddress + ':' + config.osc.remotePort,
            );
          udpPort.send(
            jsonData,
            config.osc.remoteAddress,
            config.osc.remotePort,
          );
        } catch (error) {
          console.error('Invalid JSON received:', error);
        }
      }
    });
  });
}

signalWSS.on('connection', (ws) => {
  let id;
  ws.on('message', (data) => {
    if (Buffer.isBuffer(data)) {
      const jsonString = data.toString();
      try {
        const jsonData = JSON.parse(jsonString);
        if (DEBUG) console.log('signal:', jsonData);
        if (jsonData.type === 'connect') {
          id = jsonData.id;
          signalClients.set(jsonData.id, ws);
        }
        if (jsonData.target) {
          signalClients.get(jsonData.target).send(JSON.stringify(jsonData));
        }
      } catch (error) {
        console.error('Invalid JSON received:', error);
      }
    } else {
      try {
        const jsonData = JSON.parse(data);
        if (DEBUG) console.log('signal:', jsonData);
        if (jsonData.type === 'connect') {
          id = jsonData.id;
          signalClients.set(jsonData.id, ws);
        }
        if (jsonData.target) {
          signalClients.get(jsonData.target).send(JSON.stringify(jsonData));
        }
      } catch (error) {
        console.error('Invalid JSON received:', error);
      }
    }
  });
  ws.on('close', () => {
    if (id) {
      signalClients.delete(id);
    }
  });
});

announceWSS.on('connection', (ws) => {
  let id; // Add Function to generate a unique ID for the client
  ws.on('message', (data) => {
    if (Buffer.isBuffer(data)) {
      const jsonString = data.toString();
      try {
        const jsonData = JSON.parse(jsonString);
        if (DEBUG) console.log('announce:', jsonData);
        if (jsonData.type === 'connect') {
          id = jsonData.id;
          announceClients.set(jsonData.id, ws);
        }
        delete jsonData.connect;
        for (const [key, client] of announceClients.entries()) {
          if (DEBUG) console.log('sending message to:', key);
          client.send(JSON.stringify(jsonData));
        }
      } catch (error) {
        console.error('Invalid JSON received:', error);
      }
    } else {
      try {
        const jsonData = JSON.parse(data);
        if (DEBUG) console.log('announce:', jsonData);
        if (jsonData.type === 'connect') {
          id = jsonData.id;
          announceClients.set(jsonData.id, ws);
        }
        delete jsonData.connect;
        for (const [key, client] of announceClients.entries()) {
          if (DEBUG) console.log('sending message to:', key);
          client.send(JSON.stringify(jsonData));
        }
      } catch (error) {
        console.error('Invalid JSON received:', error);
      }
    }
  });
  ws.on('close', () => {
    if (id) {
      announceClients.delete(id);
    }
  });
});

messageWSS.on('connection', (ws) => {
  let id; // Add function to generate a unique ID for the client if needed on server
  ws.on('message', (data) => {
    if (Buffer.isBuffer(data)) {
      const jsonString = data.toString();
      try {
        const jsonData = JSON.parse(jsonString);
        if (DEBUG) console.log('message:', jsonData);
        if (jsonData.type === 'connect') {
          id = jsonData.id;
          messageClients.set(jsonData.id, ws);
        }
        if (jsonData.target) {
          messageClients.get(jsonData.target).send(JSON.stringify(jsonData));
        }
      } catch (error) {
        console.error('Invalid JSON received:', error);
      }
    } else {
      try {
        const jsonData = JSON.parse(data);
        if (DEBUG) console.log('message:', jsonData);
        if (jsonData.type === 'connect') {
          id = jsonData.id;
          messageClients.set(jsonData.id, ws);
        }
        if (jsonData.target) {
          messageClients.get(jsonData.target).send(JSON.stringify(jsonData));
        }
      } catch (error) {
        console.error('Invalid JSON received:', error);
      }
    }
  });
  ws.on('close', () => {
    if (id) {
      messageClients.delete(id);
    }
  });
});

oscServer.listen(touchOSCWSPort, hostname, () => {
  console.log(
    `TouchOSC Message Server is listening on ${protocol}://${hostname}:${touchOSCWSPort}`,
  );
});

signalServer.listen(signalPort, hostname, () => {
  console.log(
    `Signal Server is listening on ${protocol}://${hostname}:${signalPort}`,
  );
});

announceServer.listen(announcePort, hostname, () => {
  console.log(
    `Announce Server is listening on ${protocol}://${hostname}:${announcePort}`,
  );
});

messageServer.listen(messagePort, hostname, () => {
  console.log(
    `Message Server is listening on ${protocol}://${hostname}:${messagePort}`,
  );
});

const app = express();
const corsOptions = {};
app.use(cors(corsOptions));
app.get('/ice', (req, res) => {
  const iceServers = freeice();
  res.json(iceServers);
});
app.listen(httpPort, () => {
  console.log(
    `Express Server is listening on ${protocol}://${hostname}:${httpPort}`,
  );
  console.log(
    `Free ICE servers available by making a GET request to ${protocol}://${hostname}:${httpPort}/ice`,
  );
});
