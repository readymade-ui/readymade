<<<<<<< HEAD
# rollup bundles
node_modules/.bin/rollup -c rollup.library.js

# copy type definitions to root
cp -R packages/@readymade/core/fesm2015/modules/. packages/@readymade/core/modules/

# clean
=======
node_modules/.bin/tsc -p tsconfig.lib.json
node_modules/.bin/rollup -c rollup.library.js
>>>>>>> dev
rm -rf packages/@readymade/core/fesm2015/modules
rm -rf packages/@readymade/core/bundles/modules
rm -rf packages/@readymade/core/fesm2015/app
rm -rf packages/@readymade/core/bundles/app