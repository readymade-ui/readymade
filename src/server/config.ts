const env = process.env.NODE_ENV || 'development';

let config: {
  env: string;
  host: string;
  protocol: string;
  port: string;
};

if (env === 'development') {
  config = {
    env: 'development',
    host: 'http://localhost:4443',
    protocol: 'http',
    port: '4444',
  };
}

if (env === 'production') {
  config = {
    env: 'production',
    host: 'http://localhost:4444',
    protocol: 'http',
    port: '4444',
  };
}

export { config };
