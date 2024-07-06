import * as TreeSitter from 'tree-sitter';
import * as C from 'tree-sitter-c';
import type { Parser, ParserOptions, SupportLanguage } from 'prettier';

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

export const parsers: Record<string, Parser<TreeSitter.SyntaxNode>> = {
  c: {
    parse(text, options) {
      throw new Error('Function not implemented.');
    },
    astFormat: 'c',
    locStart(node) {
      return node.startIndex;
    },
    locEnd(node) {
      return node.endIndex;
    },
  },
};

const parser = new TreeSitter();
parser.setLanguage(C);

export function prettierPluginC(): string {
  const source = `#include <stdio.h>
int main(int argc, char *argv[]) {
  printf("Hello, World!");
  return 0;
}
`;
  const tree = parser.parse(source);

  return tree.rootNode.toString();
}
