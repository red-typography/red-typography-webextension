import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-import-css';
import resolve from '@rollup/plugin-node-resolve';

const plugins = [typescript({ tsconfig: './tsconfig.json' })];

export default [
    {
        input: 'src/content.ts',
        output: {
            format: 'iife',
            file: './addon/content.js'
        },
        plugins,
    },
    {
        input: 'src/background.ts',
        output: {
            format: 'iife',
            file: './addon/background.js'
        },
        plugins: [
            ...plugins,
            resolve({
                browser: true,
            }),
        ]
    },
    {
        input: 'src/popup/index.ts',
        output: {
            format: 'iife',
            file: './addon/popup/index.js'
        },
        plugins: [
            ...plugins,
            css({
                output: 'index.css',
            }),
        ],
    }
];
