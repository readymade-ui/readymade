import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import inlinePostCSS from 'rollup-plugin-inline-postcss';

export default [
    {
        input: 'src/app/polyfill.ts',
        plugins: [
            resolve(),
            typescript()
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
            typescript()
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
            inlinePostCSS(),
            typescript()
        ],
        onwarn: ( warning, next ) => {
            if ( warning.code === 'THIS_IS_UNDEFINED' ) return;
            next( warning );
        },
        output: {
            name: 'app',
            file: 'dist/main.js',
            format: 'iife'
        }
    }];