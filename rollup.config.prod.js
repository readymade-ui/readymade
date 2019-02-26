import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import inlinePostCSS from 'rollup-plugin-inline-postcss';

export default [
    {
<<<<<<< HEAD
        input: 'src/app/polyfill.ts',
        plugins: [
            resolve(),
            typescript(),
            terser()
=======
        input: 'src/app/polyfill.js',
        plugins: [
            resolve()
>>>>>>> dev
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
<<<<<<< HEAD
            inlinePostCSS(),
            typescript(),
=======
            inlinePostCSS({
                styleRegex: /(css\`((.|\n)*)\`)(,)/g
            }),
            typescript({
                typescript: require('typescript')
            }),
>>>>>>> dev
            terser()
        ],
        onwarn: ( warning, next ) => {
            if ( warning.code === 'THIS_IS_UNDEFINED' ) return;
            next( warning );
        },
        output: {
            name: 'app',
<<<<<<< HEAD
            file: 'dist/main.js',
=======
            file: 'dist/app/main.js',
>>>>>>> dev
            format: 'iife',
            sourcemap: true
        }
    }];