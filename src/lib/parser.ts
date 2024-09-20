import { default as TreeSitter, SyntaxNode } from 'tree-sitter';
import C from 'tree-sitter-c';
import type { Parser } from 'prettier';

export const parse: Parser<SyntaxNode>['parse'] = (text, options) => {
  const parser = new TreeSitter();
  parser.setLanguage(C);

  const ast = parser.parse(text);

  return ast.rootNode;
};
