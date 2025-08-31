import { describe } from "vitest";
import {
  addPadFillTillSixBit,
  binary2Base64,
  bit2DecimalList,
  char2Binary,
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
  it("should return 'YWI=' for text2Base64('YWJjZGVmZw==')", () => {
    expect(text2Base64("abcdefg")).toBe("YWJjZGVmZw==");
  });
});
