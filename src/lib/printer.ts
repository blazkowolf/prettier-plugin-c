import type { SyntaxNode } from 'tree-sitter';
import { doc, type Printer } from 'prettier';

const { group, indent, join, line, softline, hardline } = doc.builders;

// const BACK_SLASH = '\\';
const ASTERISK = '*';
const COMMA = ',';
const DOUBLE_QUOTE = '"';
const INCLUDE = '#include';
const LEFT_PAREN = '(';
const RIGHT_PAREN = ')';
const LEFT_BRACKET = '[';
const RIGHT_BRACKET = ']';
const LEFT_BRACE = '{';
const RIGHT_BRACE = '}';
const RETURN = 'return';
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
    case 'function_definition':
    case 'function_declarator':
    case 'parameter_declaration':
      return path.map(print, 'namedChildren');

    case 'preproc_include':
      return [INCLUDE, SPACE, path.call(print, 'firstNamedChild'), hardline];

    case 'expression_statement':
      return [path.call(print, 'firstNamedChild'), SEMICOLON];

    case 'return_statement':
      return [RETURN, SPACE, path.call(print, 'firstNamedChild'), SEMICOLON];

    case 'compound_statement':
      return [
        LEFT_BRACE,
        indent([hardline, join(hardline, path.map(print, 'namedChildren'))]),
        hardline,
        RIGHT_BRACE,
      ];

    case 'string_literal':
      return [DOUBLE_QUOTE, path.call(print, 'firstNamedChild'), DOUBLE_QUOTE];

    case 'pointer_declarator':
      return [ASTERISK, path.call(print, 'firstNamedChild')];

    case 'array_declarator':
      return [path.call(print, 'firstNamedChild'), LEFT_BRACKET, RIGHT_BRACKET];

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

    case 'parameter_list':
      return group([
        LEFT_PAREN,
        indent([
          softline,
          join([COMMA, line], path.map(print, 'namedChildren')),
        ]),
        softline,
        RIGHT_PAREN,
        SPACE,
      ]);

    // Terminals
    case 'comment':
      return [node.text, hardline];

    case 'primitive_type':
      return [node.text, SPACE];

    case 'system_lib_string':
    case 'identifier':
    case 'string_content':
    case 'number_literal':
      return node.text;

    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
};
