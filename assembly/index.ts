// The entry file of your WebAssembly module.
const BASE64_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

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

export function sixBit2Decimal(sixBit: string): i32 {
  if (sixBit.length !== 6) {
    throw new Error("Input must be a 6-bit binary string.");
  }
  return i32.parse(sixBit, 2);
}

export function bit2DecimalList(binary: string): i32[] {
  const sixBit = divideEachSixBit(binary);
  const filledPadSixBit: string[] = sixBit.map((bit: string) =>
    addPadFillTillSixBit(bit)
  );
  let decimalList: i32[] = [];
  for (let i = 0; i < filledPadSixBit.length; i++) {
    decimalList.push(sixBit2Decimal(filledPadSixBit[i]));
  }
  return decimalList;
}

export function binary2Base64(binary: string): string {
  const decimals = bit2DecimalList(binary);
  let base64WithNonPadding = "";
  for (let i = 0; i < decimals.length; i++) {
    base64WithNonPadding += BASE64_CHARS.charAt(decimals[i]);
  }
  return base64WithNonPadding;
}

export function filledFourCharWithEqualSign(binary: string): string {
  const padding = 4 - (binary.length % 4);
  if (padding === 4) return binary;
  return binary + "=".repeat(padding);
}

export function text2Base64(text: string): string {
  const binary = text2Binary(text);
  const base64WithNonPadding = binary2Base64(binary);
  return filledFourCharWithEqualSign(base64WithNonPadding);
}
