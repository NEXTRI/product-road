import { defineConfig } from "@pandacss/dev";
import pandaPreset from "@pandacss/preset-panda";
export default defineConfig({
  presets: [pandaPreset],
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./app/components/**/*.tsx",
    "./components/*.tsx",
    "./app/**/*.tsx",
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
        animations: {
          spin: {
            value: "spin .5s infinite linear",
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
