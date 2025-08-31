import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // describe, it, expect をグローバルに
    environment: "node",
  },
});
