node_modules/.bin/tsc -p src/modules/core/tsconfig.json
node_modules/.bin/rollup -c src/modules/core/rollup.config.js
cp src/modules/core/package.json packages/@readymade/core/package.json
cp src/modules/core/CHANGELOG.md packages/@readymade/core/CHANGELOG.md
cp src/modules/core/LICENSE.txt packages/@readymade/core/LICENSE.txt
cp src/modules/core/README.md packages/@readymade/core/README.md
cp -R src/modules/core/typings/* packages/@readymade/core/types
rm -rf src/modules/core/typings
rm -rf packages/@readymade/core/fesm2015/modules
rm -rf packages/@readymade/core/bundles/modules
rm -rf packages/@readymade/core/fesm2015/app
rm -rf packages/@readymade/core/bundles/app
