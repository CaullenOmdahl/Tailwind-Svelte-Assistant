declare module "marked" {
  export interface LexerOptions {
    [key: string]: unknown;
  }
  export interface Token {
    type: string;
    text?: string;
    lang?: string;
    items?: { text: string }[];
    [key: string]: unknown;
  }
  export function lexer(src: string, options?: LexerOptions): Token[];
}