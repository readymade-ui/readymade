node_modules/.bin/rollup -c rollup.library.js
node_modules/.bin/terser --compress --mangle --output dist/readymade.min.js -- dist/readymade.js