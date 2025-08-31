import { describe } from "vitest";
import {
  addPadFillTillSixBit,
  base64CharToDecimal,
  base64CharsToDecimals,
  base64ToText,
  binary2Base64,
  binary2Bytes,
  bit2DecimalList,
  bytes2Text,
  char2Binary,
  decimal2SixBit,
  decimals2Binary,
  divideEachSixBit,
  filledFourCharWithEqualSign,
  sixBit2Decimal,
  text2Base64,
  text2Binary,
} from "../build/debug.js";

describe("char2Binary", () => {
  it("should return '01100001' for char2Binary('a')", () => {
    expect(char2Binary("a")).toBe("01100001");
  });
});

describe("text2Binary", () => {
  it("should return '01100001' for text2Binary('a')", () => {
    expect(text2Binary("abc")).toBe("011000010110001001100011");
  });
});

describe("divideEachSixBit", () => {
  it("should return ['011000', '010110', '001001', '100011'] for divideEachSixBit('011000010110001001100011')", () => {
    expect(divideEachSixBit("011000010110001001100011")).toEqual([
      "011000",
      "010110",
      "001001",
      "100011",
    ]);
  });

  it("should return ['011000', '01'] for divideEachSixBit('01100001')", () => {
    expect(divideEachSixBit("01100001")).toEqual(["011000", "01"]);
  });
});

describe("addPadFillTillSixBit", () => {
  it("should return '011000' for addPadFillTillSixBit('011000')", () => {
    expect(addPadFillTillSixBit("011000")).toBe("011000");
  });

  it("should return '01100001000000' for addPadFillTillSixBit('01100001')", () => {
    expect(addPadFillTillSixBit("01100001")).toBe("011000010000");
  });
});

describe("sixBit2Decimal", () => {
  it("should return 1 for sixBitToDecimal('000001')", () => {
    expect(sixBit2Decimal("000001")).toBe(1);
  });
});

describe("bit2DecimalList", () => {
  it("should return 1 for bit2Decimal('000001')", () => {
    expect(
      bit2DecimalList(
        "01100001011000100110001101100100011001010110011001100111"
      )
    ).toEqual([24, 22, 9, 35, 25, 6, 21, 38, 25, 48]);
  });
});

describe("binary2Base64", () => {
  it("should return 'YWI=' for binary2Base64('011000010110001001100011')", () => {
    expect(
      binary2Base64("01100001011000100110001101100100011001010110011001100111")
    ).toBe("YWJjZGVmZw");
  });
});

describe("filledFourCharWithEqualSign", () => {
  it("should return 'YWI=' for filledFourCharWithEqualSign('YWI')", () => {
    expect(filledFourCharWithEqualSign("YWI")).toBe("YWI=");
  });
});

describe("text2Base64", () => {
  it("should return 'YWJjZGVmZw==' for text2Base64('abcdefg')", () => {
    expect(text2Base64("abcdefg")).toBe("YWJjZGVmZw==");
  });
});

describe("base64CharToDecimal", () => {
  it("should return 0 for base64CharToDecimal('A')", () => {
    expect(base64CharToDecimal("A")).toBe(0);
  });

  it("should return 25 for base64CharToDecimal('Z')", () => {
    expect(base64CharToDecimal("Z")).toBe(25);
  });

  it("should return 26 for base64CharToDecimal('a')", () => {
    expect(base64CharToDecimal("a")).toBe(26);
  });

  it("should return 62 for base64CharToDecimal('+')", () => {
    expect(base64CharToDecimal("+")).toBe(62);
  });

  it("should return 63 for base64CharToDecimal('/')", () => {
    expect(base64CharToDecimal("/")).toBe(63);
  });
});

describe("decimal2SixBit", () => {
  it("should return '000000' for decimal2SixBit(0)", () => {
    expect(decimal2SixBit(0)).toBe("000000");
  });

  it("should return '011001' for decimal2SixBit(25)", () => {
    expect(decimal2SixBit(25)).toBe("011001");
  });

  it("should return '111111' for decimal2SixBit(63)", () => {
    expect(decimal2SixBit(63)).toBe("111111");
  });
});

describe("base64CharsToDecimals", () => {
  it("should return [24, 22, 9] for base64CharsToDecimals('YWJ')", () => {
    expect(base64CharsToDecimals("YWJ")).toEqual([24, 22, 9]);
  });
});

describe("decimals2Binary", () => {
  it("should return correct binary for decimals2Binary([1, 2, 3, 4])", () => {
    expect(decimals2Binary([1, 2, 3, 4])).toBe("000001000010000011000100");
  });
});

describe("binary2Bytes", () => {
  it("should return [97, 98, 99] for binary2Bytes('011000010110001001100011')", () => {
    expect(binary2Bytes("011000010110001001100011")).toEqual([97, 98, 99]);
  });
});

describe("bytes2Text", () => {
  it("should return 'abc' for bytes2Text([97, 98, 99])", () => {
    expect(bytes2Text([97, 98, 99])).toBe("abc");
  });
});

describe("base64ToText", () => {
  it("should return 'abc' for base64ToText('YWJj')", () => {
    expect(base64ToText("YWJj")).toBe("abc");
  });

  it("should return 'abcdefg' for base64ToText('YWJjZGVmZw==')", () => {
    expect(base64ToText("YWJjZGVmZw==")).toBe("abcdefg");
  });

  it("should return 'Hello World!' for base64ToText('SGVsbG8gV29ybGQh')", () => {
    expect(base64ToText("SGVsbG8gV29ybGQh")).toBe("Hello World!");
  });
});

describe("Integration tests", () => {
  it("should encode and decode text correctly", () => {
    const originalText = "Hello World!";
    const encoded = text2Base64(originalText);
    const decoded = base64ToText(encoded);
    expect(decoded).toBe(originalText);
  });

  it("should encode and decode complex text correctly", () => {
    const originalText = "The quick brown fox jumps over the lazy dog";
    const encoded = text2Base64(originalText);
    const decoded = base64ToText(encoded);
    expect(decoded).toBe(originalText);
  });
});
