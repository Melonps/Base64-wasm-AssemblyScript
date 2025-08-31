import assert from "assert";
import { fib } from "../build/debug.js";
assert.strictEqual(fib(10), 55);
console.log("ok");
