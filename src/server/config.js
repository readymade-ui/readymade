const env = process.env.NODE_ENV || 'development';

let config = {};

if (env === 'development') {
    config = {
        host: 'localhost',
        protocol: 'http',
        port: '4443'
    }
}

if (env === 'production') {
    config = {
        host: 'localhost',
        protocol: 'http',
        port: '4444'
    }
}

export { config };