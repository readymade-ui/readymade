#!/bin/bash

if [[ ! -e dist ]]; then
    mkdir dist
fi

if [[ ! -e dist/style ]]; then
    mkdir dist/style
fi

if [[ ! -e dist/assets ]]; then
    mkdir dist/assets
fi

cp src/app/index.html dist/index.html
cp src/app/404.html dist/404.html
cp -R src/app/assets/. dist/assets/

node_modules/.bin/postcss src/app/style/main.css --output dist/style/main.css

if [[ $NODE_ENV == 'prod' ]]; then
    node_modules/.bin/rollup -c rollup.config.prod.js
else
    node_modules/.bin/rollup -c rollup.config.js
fi