node_modules/.bin/tsc -p tsconfig.lib.json
node_modules/.bin/rollup -c rollup.library.js
rm -rf packages/@readymade/core/fesm2015/modules
rm -rf packages/@readymade/core/bundles/modules
rm -rf packages/@readymade/core/fesm2015/app
rm -rf packages/@readymade/core/bundles/app