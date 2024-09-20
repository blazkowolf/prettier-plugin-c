import type { SyntaxNode } from 'tree-sitter';
import { doc, type Printer } from 'prettier';

const { group, indent, join, line, softline, hardline } = doc.builders;

// const BACK_SLASH = '\\';
const COMMA = ',';
const DOUBLE_QUOTE = '"';
const INCLUDE = '#include';
const LEFT_PAREN = '(';
const RIGHT_PAREN = ')';
const SEMICOLON = ';';
const SPACE = ' ';

export const print: Printer<SyntaxNode>['print'] = (
  path,
  options,
  print,
  args,
) => {
  const { node } = path;

  if (node.type === 'translation_unit') console.log(node.toString());

  console.log(node.type, ':', node.text);

  switch (node.type) {
    // Non-terminals
    case 'translation_unit':
    case 'call_expression':
      return path.map(print, 'namedChildren');
    case 'preproc_include':
      return [INCLUDE, SPACE, path.call(print, 'firstNamedChild'), hardline];
    case 'expression_statement':
      return [path.call(print, 'firstNamedChild'), SEMICOLON];
    case 'string_literal':
      return [DOUBLE_QUOTE, path.call(print, 'firstNamedChild'), DOUBLE_QUOTE];
    case 'argument_list':
      return group([
        LEFT_PAREN,
        indent([
          softline,
          join([COMMA, line], path.map(print, 'namedChildren')),
        ]),
        softline,
        RIGHT_PAREN,
      ]);

    // Terminals
    case 'comment':
    case 'system_lib_string':
    case 'primitive_type':
    case 'identifier':
    case 'string_content':
    case 'number_literal':
      return node.text;

    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
};
