import resolve from '@rollup/plugin-node-resolve';
import commonjsResolve from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import html from 'rollup-plugin-string-html';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';
import { terser } from 'rollup-plugin-terser';

export default [  
{
    input: 'src/client/polyfill.ts',
    plugins: [
        resolve(),
        typescript({declaration: false}),
        terser(),
        cleanup({
            comments: 'none'
        })
    ],
    onwarn: ( warning, next ) => {
        if ( warning.code === 'THIS_IS_UNDEFINED' ) return;
        next( warning );
    },
    output: {
        name: 'window',
        file: 'dist/client/static-polyfill.js',
        format: 'iife',
        sourcemap: false,
        extend: true
    }
},
{
    input: 'src/client/index.ts',
    treeshake: true,
    external: ['path', 'html-minifier-terser'],
    output: {
        file: 'dist/client/static-index.js',
        format: 'esm'
    },
    plugins: [
        resolve({
            mainFields: ['module', 'jsnext']
        }),
        json(),
        postcss({
            extract: false,
            modules: false,
            use: [
                ['sass', {
                    includePaths: ['src/client/style']
                }]
            ],
            minimize: true,
            extensions: ['.scss','.css']
        }),
        html({
            include: ["**/*.html"],
            exclude: ["**/index.html"],
            minifier: {}
        }),
        typescript({
            experimentalDecorators: true
        }),
        commonjsResolve(),
        terser(),
        cleanup({
            comments: 'none'
        })
    ],
    onwarn: function (message) {

        console.log(message);

    }
}]