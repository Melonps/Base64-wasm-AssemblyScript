// The entry file of your WebAssembly module.

export function fib(n: i32): i32 {
  var a = 0,
    b = 1;
  if (n > 0) {
    while (--n) {
      let t = a + b;
      a = b;
      b = t;
    }
    return b;
  }
  return a;
}

export function char2Binary(char: string): string {
  let binary = char.charCodeAt(0).toString(2);
  return "00000000".slice(binary.length) + binary;
}
