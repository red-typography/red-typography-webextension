import Typograf from 'typograf';

declare global {
    interface Window {
        Typograf: typeof Typograf;
    }
}