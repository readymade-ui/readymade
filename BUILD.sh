npx tsc -p src/modules/core/tsconfig.json --outDir dist/packages/@readymade/core/esm2022 --declarationDir  dist/packages/@readymade/core/typings 
npx rollup -c src/modules/core/rollup.config.js
cp src/modules/core/package.json dist/packages/@readymade/core/package.json
cp CHANGELOG.md dist/packages/@readymade/core/CHANGELOG.md
cp src/modules/core/LICENSE.txt dist/packages/@readymade/core/LICENSE.txt
cp src/modules/core/README.md dist/packages/@readymade/core/README.md


npx tsc -p src/modules/dom/tsconfig.json --outDir dist/packages/@readymade/dom/esm2022 --declarationDir  dist/packages/@readymade/dom/typings
npx rollup -c src/modules/dom/rollup.config.js
cp src/modules/dom/package.json dist/packages/@readymade/dom/package.json
cp src/modules/dom/LICENSE.txt dist/packages/@readymade/dom/LICENSE.txt
cp src/modules/dom/README.md dist/packages/@readymade/dom/README.md


npx tsc -p src/modules/router/tsconfig.json --outDir dist/packages/@readymade/router/esm2022 --declarationDir  dist/packages/@readymade/router/typings
npx rollup -c src/modules/router/rollup.config.js
cp src/modules/router/package.json dist/packages/@readymade/router/package.json
cp src/modules/router/LICENSE.txt dist/packages/@readymade/router/LICENSE.txt
cp src/modules/router/README.md dist/packages/@readymade/router/README.md


npx tsc -p src/modules/ui/tsconfig.json --outDir dist/packages/@readymade/ui/esm2022 --declarationDir  dist/packages/@readymade/ui/typings
npx rollup -c src/modules/ui/rollup.config.js
cp src/modules/ui/package.json dist/packages/@readymade/ui/package.json
cp src/modules/ui/LICENSE.txt dist/packages/@readymade/ui/LICENSE.txt
cp src/modules/ui/README.md dist/packages/@readymade/ui/README.md
cp src/client/style/readymade-ui.css dist/packages/@readymade/ui/readymade-ui.css

npx tsc -p src/modules/transmit/tsconfig.json --outDir dist/packages/@readymade/transmit/esm2022 --declarationDir  dist/packages/@readymade/transmit/typings
npx rollup -c src/modules/transmit/rollup.config.js
cp src/modules/transmit/package.json dist/packages/@readymade/transmit/package.json
cp src/modules/transmit/LICENSE.txt dist/packages/@readymade/transmit/LICENSE.txt
cp src/modules/transmit/README.md dist/packages/@readymade/transmit/README.md


rm -rf dist/packages/@readymade/core/fesm2022/typings
rm -rf dist/packages/@readymade/dom/fesm2022/typings
rm -rf dist/packages/@readymade/router/fesm2022/typings
rm -rf dist/packages/@readymade/transmit/fesm2022/typings
rm -rf dist/packages/@readymade/ui/fesm2022/typings
