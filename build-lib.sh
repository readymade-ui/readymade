node_modules/.bin/rollup -c rollup.library.js
cp -R packages/@readymade/core/fesm2015/modules/. packages/@readymade/core/modules/
rm -rf packages/@readymade/core/fesm2015/modules
rm -rf packages/@readymade/core/bundles/modules
rm -rf packages/@readymade/core/fesm2015/app
rm -rf packages/@readymade/core/bundles/app