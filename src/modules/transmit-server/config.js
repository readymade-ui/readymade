const ReadymadeServerConfiguration = {
  osc: {
    remoteAddress: '127.0.0.1',
    remotePort: 57122,
    broadcast: true,
    metadata: false,
  },
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
};

export default ReadymadeServerConfiguration;
