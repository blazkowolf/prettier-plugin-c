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
//     const expected = `#include "stdio.h"
//
// // Some code here
//
// int main(int argc, char *argv[]) {
//   printf("Hello, World!");
//
//   return 0;
// }`;

    const actual = await format(expected, { parser: 'c', plugins: [plugin] });

    expect(actual).toEqual(expected);
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
