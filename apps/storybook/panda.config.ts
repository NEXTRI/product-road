import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "../../packages/components/**/*.tsx",
    "../../packages/components/**/stories/*.stories.tsx",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          athensGray: { value: "#f9f9fb" },
          frenchRose: { value: "#EF567C" },
          nevada: { value: "#64676B" },
          azureRadiance: { value: "#1675f0" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
