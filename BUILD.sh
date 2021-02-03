npx tsc -p src/modules/core/tsconfig.json
npx rollup -c src/modules/core/rollup.config.js
cp src/modules/core/package.json packages/@readymade/core/package.json
cp CHANGELOG.md packages/@readymade/core/CHANGELOG.md
cp src/modules/core/LICENSE.txt packages/@readymade/core/LICENSE.txt
cp src/modules/core/README.md packages/@readymade/core/README.md
mkdir -p packages/@readymade/core/types
cp -R src/modules/core/typings/* packages/@readymade/core/types
rm -rf src/modules/core/typings

npx tsc -p src/modules/dom/tsconfig.json
npx rollup -c src/modules/dom/rollup.config.js
cp src/modules/dom/package.json packages/@readymade/dom/package.json
cp src/modules/dom/LICENSE.txt packages/@readymade/dom/LICENSE.txt
cp src/modules/dom/README.md packages/@readymade/dom/README.md
mkdir -p packages/@readymade/dom/types
cp -R src/modules/dom/typings/dom/* packages/@readymade/dom/types
rm -rf src/modules/dom/typings

npx tsc -p src/modules/router/tsconfig.json
npx rollup -c src/modules/router/rollup.config.js
cp src/modules/router/package.json packages/@readymade/router/package.json
cp src/modules/router/LICENSE.txt packages/@readymade/router/LICENSE.txt
cp src/modules/router/README.md packages/@readymade/router/README.md
mkdir -p packages/@readymade/router/types
cp -R src/modules/router/typings/* packages/@readymade/router/types
rm -rf src/modules/router/typings

npx tsc -p src/modules/ui/tsconfig.json
npx rollup -c src/modules/ui/rollup.config.js
cp src/modules/ui/package.json packages/@readymade/ui/package.json
cp src/modules/ui/LICENSE.txt packages/@readymade/ui/LICENSE.txt
cp src/modules/ui/README.md packages/@readymade/ui/README.md
mkdir -p packages/@readymade/ui/types
cp -R src/modules/ui/typings/* packages/@readymade/ui/types
rm -rf src/modules/ui/typings