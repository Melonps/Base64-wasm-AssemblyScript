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
  if (char.length !== 1) {
    throw new Error("Input must be a single character.");
  }
  let binary = char.charCodeAt(0).toString(2);
  return "00000000".slice(binary.length) + binary;
}

export function text2Binary(text: string): string {
  let binary = "";
  for (let i = 0; i < text.length; i++) {
    binary += char2Binary(text.charAt(i));
  }
  return binary;
}
