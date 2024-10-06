npx tsc -p src/modules/core/tsconfig.json --outDir packages/@readymade/core/esm2022 --declarationDir  packages/@readymade/core/typings
npx rollup -c src/modules/core/rollup.config.js
cp src/modules/core/package.json packages/@readymade/core/package.json
cp CHANGELOG.md packages/@readymade/core/CHANGELOG.md
cp src/modules/core/LICENSE.txt packages/@readymade/core/LICENSE.txt
cp src/modules/core/README.md packages/@readymade/core/README.md


npx tsc -p src/modules/dom/tsconfig.json --outDir packages/@readymade/dom/esm2022 --declarationDir  packages/@readymade/dom/typings
npx rollup -c src/modules/dom/rollup.config.js
cp src/modules/dom/package.json packages/@readymade/dom/package.json
cp src/modules/dom/LICENSE.txt packages/@readymade/dom/LICENSE.txt
cp src/modules/dom/README.md packages/@readymade/dom/README.md


npx tsc -p src/modules/router/tsconfig.json --outDir packages/@readymade/router/esm2022 --declarationDir  packages/@readymade/router/typings
npx rollup -c src/modules/router/rollup.config.js
cp src/modules/router/package.json packages/@readymade/router/package.json
cp src/modules/router/LICENSE.txt packages/@readymade/router/LICENSE.txt
cp src/modules/router/README.md packages/@readymade/router/README.md


npx tsc -p src/modules/ui/tsconfig.json --outDir packages/@readymade/ui/esm2022 --declarationDir  packages/@readymade/ui/typings
npx rollup -c src/modules/ui/rollup.config.js
cp src/modules/ui/package.json packages/@readymade/ui/package.json
cp src/modules/ui/LICENSE.txt packages/@readymade/ui/LICENSE.txt
cp src/modules/ui/README.md packages/@readymade/ui/README.md
