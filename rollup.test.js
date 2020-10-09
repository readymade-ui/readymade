import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';
import { terser } from 'rollup-plugin-terser';

const clean = {
    comments: ['none'],
    extensions: ['ts', 'js']
};

export default [
{
    input: 'src/app/wc.ts',
    plugins: [
        resolve(),
        typescript({
            typescript: require('typescript')
        }),
        cleanup(clean),
        terser()
    ],
    onwarn: ( warning, next ) => {
        if ( warning.code === 'THIS_IS_UNDEFINED' ) return;
        next( warning );
    },
    output: {
        file: 'dist/app/wc.js',
        format: 'esm',
        sourcemap: false
    }
}];