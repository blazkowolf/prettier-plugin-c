import { SyntaxNode } from 'tree-sitter';
import type { Parser, Printer, SupportLanguage } from 'prettier';
import { parse } from './parser';
import { print } from './printer';

/**
 * Values taken from linguist file:
 * https://github.com/github-linguist/linguist/blob/39fd5e93de98de3434cb3e857c5b1972c418f8c5/lib/linguist/languages.yml#L732
 */
export const languages: SupportLanguage[] = [
  {
    name: 'C',
    parsers: ['c'],
    tmScope: 'source.c',
    aceMode: 'c_cpp',
    codemirrorMode: 'clike',
    codemirrorMimeType: 'text/x-csrc',
    extensions: ['.c', '.cats', '.h', '.idc'],
    linguistLanguageId: 41,
    interpreters: ['tcc'],
    // Value from: https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers
    vscodeLanguageIds: ['c'],
  },
];

export const parsers: Record<string, Parser<SyntaxNode>> = {
  c: {
    parse,
    astFormat: 'c',
    locStart(node) {
      return node.startIndex;
    },
    locEnd(node) {
      return node.endIndex;
    },
  },
};

export const printers: Record<string, Printer<SyntaxNode>> = {
  c: {
    print,
  },
};
