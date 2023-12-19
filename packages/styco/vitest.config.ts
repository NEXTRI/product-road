import { defineConfig, mergeConfig } from "vitest/config";
import configShared from "../../vitest.config";
import react from "@vitejs/plugin-react";

export default mergeConfig(
  configShared,
  defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./__tests__/setupTest.ts",
    },
  })
);
