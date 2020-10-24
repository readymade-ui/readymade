npx tsc -p src/modules/core/tsconfig.json
npx rollup -c src/modules/core/rollup.config.js
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

npx tsc -p src/modules/dom/tsconfig.json
npx rollup -c src/modules/dom/rollup.config.js
cp src/modules/dom/package.json packages/@readymade/dom/package.json
cp src/modules/dom/CHANGELOG.md packages/@readymade/dom/CHANGELOG.md
cp src/modules/dom/LICENSE.txt packages/@readymade/dom/LICENSE.txt
cp src/modules/dom/README.md packages/@readymade/dom/README.md
cp -R src/modules/dom/typings/* packages/@readymade/dom/types
rm -rf src/modules/dom/typings
rm -rf packages/@readymade/dom/fesm2015/modules
rm -rf packages/@readymade/dom/bundles/modules
rm -rf packages/@readymade/dom/fesm2015/app
rm -rf packages/@readymade/dom/bundles/app