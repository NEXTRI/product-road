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
        shadows: {
          basic: {
            value:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
