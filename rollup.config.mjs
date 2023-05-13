import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-import-css';

const plugins = [typescript({ tsconfig: './tsconfig.json' })];

export default [
    {
        input: 'src/content.ts',
        output: {
            format: 'umd',
            file: './addon/content.js'
        },
        plugins,
    },
    {
        input: 'src/background.ts',
        output: {
            format: 'umd',
            file: './addon/background.js'
        },
        plugins,
    },
    {
        input: 'src/popup/index.ts',
        output: {
            format: 'umd',
            file: './addon/popup/index.js'
        },
        plugins: [
            ...plugins,
            css({
                output: './addon/popup/index.css',
            }),
        ],
    }
];
