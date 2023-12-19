import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  minify: true,
  clean: true,
  target: "es2019",
  format: ["cjs", "esm"],
});
