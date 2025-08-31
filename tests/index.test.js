import { describe } from "vitest";
import {
  addPadFillTillSixBit,
  char2Binary,
  divideEachSixBit,
  fib,
  text2Binary,
} from "../build/debug.js";

describe("fib", () => {
  it("should return 55 for fib(10)", () => {
    expect(fib(10)).toBe(55);
  });
});

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
