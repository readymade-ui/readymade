import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import pkgMinifyHTML from 'rollup-plugin-minify-html-literals';
import pkgInlinePostCSS from 'rollup-plugin-inline-postcss';
import cleanup from 'rollup-plugin-cleanup';
import terser from '@rollup/plugin-terser';

const minifyHTML = pkgMinifyHTML.default;
const inlinePostCSS = pkgInlinePostCSS.default;

const clean = {
  comments: ['none'],
  extensions: ['ts', 'js'],
};

export default [
  {
    input: 'src/modules/ui/index.ts',
    plugins: [
      resolve(),
      typescript({
        sourceMap: false,
        declarationDir: 'packages/@readymade/ui/fesm2022/typings',
      }),
      cleanup(clean),
    ],
    onwarn: (warning, next) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      next(warning);
    },
    output: {
      file: 'packages/@readymade/ui/fesm2022/index.js',
      format: 'esm',
      sourcemap: true,
    },
  },
];
