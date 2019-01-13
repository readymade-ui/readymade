const spawn = require('child_process').spawn;
const chokidar = require('chokidar');
const log = console.log.bind(console);

const watcher = chokidar.watch('src/**/*.*', {
    persistent: true
});

const args = [];

if (process.argv.indexOf('--prod') > 0) {
    args.push('--prod');
}

watcher
    .on('change', path => {
        log(`File ${path} has changed`);
        spawn('./build.sh', args, {stdio:'inherit'});
    });

spawn('./build.sh', args, {stdio:'inherit'});
//spawn('live-server',  ['dist/'], {stdio:'inherit'});