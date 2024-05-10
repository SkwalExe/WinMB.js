import { babel } from '@rollup/plugin-babel'

export default {
    input: 'dist/lib-esm/main.js',
    output: {
        file: 'dist/winmb.umd.js',
        format: 'umd',
        name: 'WinMB'
    },
    plugins: [babel({ babelHelpers: 'bundled' })]
}
