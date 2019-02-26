const spawn = require('child_process').spawn;

const args = [];

spawn('./build-lib.sh', args, {stdio:'inherit'});