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

export function divideEachSixBit(binary: string): string[] {
  const result: string[] = [];
  for (let i = 0; i < binary.length; i += 6) {
    result.push(binary.slice(i, i + 6));
  }
  return result;
}

export function addPadFillTillSixBit(binary: string): string {
  const padding = 6 - (binary.length % 6);
  if (padding === 6) return binary;
  return binary + "0".repeat(padding);
}

export function sixBitToDecimal(sixBit: string): i32 {
  if (sixBit.length !== 6) {
    throw new Error("Input must be a 6-bit binary string.");
  }
  return i32.parse(sixBit, 2);
}
