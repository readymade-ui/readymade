#!/bin/bash

if [[ ! -e dist ]]; then
    mkdir dist
fi

if [[ ! -e dist/lib ]]; then
    mkdir dist/lib
fi

if [[ ! -e dist/style ]]; then
    mkdir dist/style
fi

if [[ ! -e dist/assets ]]; then
    mkdir dist/assets
fi

cp node_modules/web-animations-js/web-animations.min.js dist/lib/web-animations.min.js
cp src/app/index.html dist/index.html
cp src/app/docs.html dist/docs.html
cp src/app/404.html dist/404.html
cp -R src/app/assets/. dist/assets/

node_modules/.bin/postcss src/app/style/main.css --output dist/style/main.css

if [[ $NODE_ENV == 'prod' ]]; then
    node_modules/.bin/rollup -c rollup.config.prod.js
else
    node_modules/.bin/rollup -c rollup.config.js
    node_modules/.bin/tsc -p tsconfig.json --watch
fi