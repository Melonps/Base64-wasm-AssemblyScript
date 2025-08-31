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

// Base64 decode functions
export function base64CharToDecimal(char: string): i32 {
  const index = BASE64_CHARS.indexOf(char);
  if (index === -1) {
    throw new Error("Invalid base64 character: " + char);
  }
  return index;
}

export function decimal2SixBit(decimal: i32): string {
  if (decimal < 0 || decimal > 63) {
    throw new Error("Decimal must be between 0 and 63.");
  }
  let binary = decimal.toString(2);
  return "000000".slice(binary.length) + binary;
}

export function base64CharsToDecimals(base64: string): i32[] {
  const decimals: i32[] = [];
  for (let i = 0; i < base64.length; i++) {
    const char = base64.charAt(i);
    if (char !== "=") {
      decimals.push(base64CharToDecimal(char));
    }
  }
  return decimals;
}

export function decimals2Binary(decimals: i32[]): string {
  let binary = "";
  for (let i = 0; i < decimals.length; i++) {
    binary += decimal2SixBit(decimals[i]);
  }
  return binary;
}

export function removePadding(binary: string): string {
  // Remove trailing zeros that were added as padding during encoding
  let trimmed = binary;
  while (trimmed.length > 0 && trimmed.charAt(trimmed.length - 1) === "0") {
    trimmed = trimmed.slice(0, trimmed.length - 1);
  }
  return trimmed;
}

export function binary2Bytes(binary: string): u8[] {
  const bytes: u8[] = [];
  // Process 8-bit chunks
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.slice(i, i + 8);
    if (byte.length === 8) {
      bytes.push(u8(i32.parse(byte, 2)));
    }
  }
  return bytes;
}

export function bytes2Text(bytes: u8[]): string {
  let text = "";
  for (let i = 0; i < bytes.length; i++) {
    text += String.fromCharCode(bytes[i]);
  }
  return text;
}

export function base64ToText(base64: string): string {
  // Remove padding characters
  let cleanBase64 = "";
  for (let i = 0; i < base64.length; i++) {
    const char = base64.charAt(i);
    if (char !== "=") {
      cleanBase64 += char;
    }
  }
  
  // Convert base64 characters to decimals
  const decimals = base64CharsToDecimals(cleanBase64);
  
  // Convert decimals to binary string
  const binary = decimals2Binary(decimals);
  
  // Convert binary to bytes
  const bytes = binary2Bytes(binary);
  
  // Convert bytes to text
  return bytes2Text(bytes);
}
