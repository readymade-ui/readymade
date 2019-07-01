import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';

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
    }];