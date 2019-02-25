import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import inlinePostCSS from 'rollup-plugin-inline-postcss';

export default [
    {
        input: 'src/app/polyfill.js',
        plugins: [
            resolve()
        ],
        onwarn: ( warning, next ) => {
            if ( warning.code === 'THIS_IS_UNDEFINED' ) return;
            next( warning );
        },
        output: {
            name: 'window',
            file: 'dist/polyfill.js',
            format: 'iife',
            sourcemap: true,
            extend: true
        }
    },
    {
        input: 'src/app/vendor.ts',
        plugins: [
            resolve(),
            typescript(),
            terser()
        ],
        onwarn: ( warning, next ) => {
            if ( warning.code === 'THIS_IS_UNDEFINED' ) return;
            next( warning );
        },
        output: {
            name: 'window',
            file: 'dist/vendor.js',
            format: 'iife',
            sourcemap: true,
            extend: true
        }
    },
    {
        input: 'src/app/main.ts',
        plugins: [
            resolve(),
            minifyHTML(),
            inlinePostCSS({
                styleRegex: /(css\`((.|\n)*)\`)(,)/g
            }),
            typescript({
                typescript: require('typescript')
            }),
            terser()
        ],
        onwarn: ( warning, next ) => {
            if ( warning.code === 'THIS_IS_UNDEFINED' ) return;
            next( warning );
        },
        output: {
            name: 'app',
            file: 'dist/app/main.js',
            format: 'iife',
            sourcemap: true
        }
    }];