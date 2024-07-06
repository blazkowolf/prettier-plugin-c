import { prettierPluginC } from './prettier-plugin-c';

describe('prettierPluginC', () => {
  it('should work', () => {
    expect(prettierPluginC()).toEqual(
      '(translation_unit (preproc_include path: (system_lib_string)) (function_definition type: (primitive_type) declarator: (function_declarator declarator: (identifier) parameters: (parameter_list (parameter_declaration type: (primitive_type) declarator: (identifier)) (parameter_declaration type: (primitive_type) declarator: (pointer_declarator declarator: (array_declarator declarator: (identifier)))))) body: (compound_statement (expression_statement (call_expression function: (identifier) arguments: (argument_list (string_literal (string_content))))) (return_statement (number_literal)))))',
    );
  });
});
