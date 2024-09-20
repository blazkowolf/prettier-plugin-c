import { format } from 'prettier';
import * as plugin from './plugin';

describe('prettier-plugin-c', () => {
  it('should work', async () => {
    const expected = `#include "stdio.h"
// Some code here
int main(int argc, char *argv[]) {
  printf("Hello, World!");
  return 0;
}`;
    const actual = await format(expected, { parser: 'c', plugins: [plugin] });

    expect(actual).toEqual(expected);
    // (translation_unit
    //   (preproc_include path: (system_lib_string))
    //   (function_definition
    //     type: (primitive_type)
    //     declarator:
    //       (function_declarator
    //         declarator: (identifier)
    //         parameters:
    //           (parameter_list
    //             (parameter_declaration
    //               type: (primitive_type)
    //               declarator: (identifier))
    //             (parameter_declaration
    //               type: (primitive_type)
    //               declarator:
    //                 (pointer_declarator
    //                   declarator: (array_declarator declarator: (identifier))))))
    //     body:
    //       (compound_statement
    //         (expression_statement
    //           (call_expression
    //             function: (identifier)
    //             arguments:
    //               (argument_list
    //                 (string_literal (string_content)))))
    //         (return_statement (number_literal)))))
  });

  it.skip('function_call', async () => {
    const input = `hello(
  "Hello, World",
  0
);`;

    // console.log(expected);
    const actual = await format(input, { parser: 'c', plugins: [plugin] });

    expect(actual).toEqual(`hello("Hello, World", 0);`);
  });
});
