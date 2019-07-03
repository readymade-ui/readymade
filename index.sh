#!/bin/bash
rm -rf dist
mkdir dist
mkdir -p dist/lib
mkdir dist/style
mkdir dist/assets
mkdir dist/fonts
cp node_modules/web-animations-js/web-animations.min.js dist/lib/web-animations.min.js
cp node_modules/web-animations-js/web-animations.min.js.map dist/lib/web-animations.min.js.map
cp src/app/index.html dist/index.html
cp src/app/404.html dist/404.html
cp src/app/favicon.ico dist/favicon.ico
cp -R src/app/style/fonts/. dist/fonts
cp -R src/app/assets/. dist/assets/

node_modules/.bin/postcss src/app/style/main.css --output dist/style/main.css

if [[ $NODE_ENV == 'prod' ]]; then
    node_modules/.bin/rollup -c rollup.config.prod.js
else
    node_modules/.bin/rollup -c rollup.config.js
    node_modules/.bin/tsc -p tsconfig.json --watch
fi