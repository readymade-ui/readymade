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
        if (path.includes('main.css')) {
            spawn('node_modules/.bin/postcss', ['src/app/style/main.css', '--output', 'dist/style/main.css'], {stdio:'inherit'});
        }
        if (path.includes('.html')) {
            spawn('cp', ['src/app/index.html', 'dist/index.html'], {stdio:'inherit'});
            spawn('cp', ['src/app/docs.html', 'dist/docs.html'], {stdio:'inherit'});
        }
        if (path.includes('404.html')) {
            spawn('cp', ['src/app/404.html', 'dist/404.html'], {stdio:'inherit'});
        }
    });

spawn('./index.sh', args, {stdio:'inherit'});