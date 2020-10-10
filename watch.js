const chokidar = require('chokidar');
const exec = require('child_process').execSync;
const spawn = require('child_process').spawn;

const watcher = chokidar.watch('./src/server');
let serve = null

function startServer() {
    if (serve !== null) {
        serve.kill();
    }
    exec('yarn prod:server', {stdio: 'inherit'});
    serve = spawn('yarn', ['serve:dev'], {stdio: 'inherit'});
}

watcher.on('ready', startServer);
watcher.on('change', startServer);