import nodeResolve from '@rollup/plugin-node-resolve';
import commonjsResolve from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import html from 'rollup-plugin-string-html';

export default [{
    input: 'src/client/index.ts',
    treeshake: true,
    output: {
        file: 'src/client/index.js',
        format: 'esm'
    },
    plugins: [
        nodeResolve({
            mainFields: ['module', 'jsnext'],
            extensions: ['.ts', '.js']
        }),
        postcss({
            extract: false,
            modules: false,
            use: [
                ['sass', {
                    includePaths: ['src/client/style']
                }]
            ],
            minimize: true
        }),
        html({
            include: ["**/*.html"],
            exclude: ["**/index.html"],
            minifier: {}
        }),
        typescript(),
        commonjsResolve()
    ],
    onwarn: function (message) {

        console.log(message);

    }
}]