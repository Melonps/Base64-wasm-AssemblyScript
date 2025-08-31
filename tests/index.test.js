import { describe } from "vitest";
import { char2Binary, fib } from "../build/debug.js";

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
