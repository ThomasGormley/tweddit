declare module "snudown-js" {
    export interface options {
        nofollow: boolean;
        target: string;
        enableToc: boolean;
        tocIdPrefix: string;
    }
    export function markdown(text: string, options?: options): string;
    export function markdownWiki(text: string, options?: options): string;
}
