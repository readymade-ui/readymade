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
        // TODO: clean up logic here, make more dynamic
        if (path.includes('main.css')) {
            spawn('node_modules/.bin/postcss', ['src/app/style/main.css', '--output', 'dist/style/main.css'], {stdio:'inherit'});
        }
        if (path.includes('test.css')) {
            spawn('node_modules/.bin/postcss', ['src/app/style/test.css', '--output', 'dist/style/test.css'], {stdio:'inherit'});
        }
        if (path.includes('.html')) {
            spawn('cp', ['src/app/index.html', 'dist/index.html'], {stdio:'inherit'});
            spawn('cp', ['src/app/test.html', 'dist/test.html'], {stdio:'inherit'});
            spawn('cp', ['src/app/wc-dev.html', 'dist/wc.html'], {stdio:'inherit'});
        }
        if (path.includes('404.html')) {
            spawn('cp', ['src/app/404.html', 'dist/404.html'], {stdio:'inherit'});
        }
    });

spawn('./index.sh', args, {stdio:'inherit'});