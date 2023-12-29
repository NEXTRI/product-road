import type { Config } from "@pandacss/types";
import { colors as socialColors } from "./colors/socials";
import { recipes } from "./recipes";
import { colors as semanticColors } from "./semantic-tokens/colors";
import { borders as semanticBorders } from "./semantic-tokens/borders";
import { radii as semanticRadii } from "./semantic-tokens/radii";
import { animations as semanticAnimations } from "./semantic-tokens/animations";
import { shadows as semanticShadows } from "./semantic-tokens/shadows";
import { textStyles } from "./text-styles";
import { layerStyles } from "./layer-styles";
import { slotRecipes } from "./slot-recipes";
import { utilities } from "./utilities";
import { globalCss } from "./global-css";
import { keyframes } from "./keyframes";

const definePreset = <T extends Config>(config: T) => config;

export const preset = definePreset({
  globalCss,
  utilities,
  theme: {
    extend: {
      tokens: {
        colors: socialColors,
      },
      semanticTokens: {
        colors: semanticColors,
        borders: semanticBorders,
        radii: semanticRadii,
        animations: semanticAnimations,
        shadows: semanticShadows,
      },
      textStyles,
      layerStyles,
      recipes,
      slotRecipes,
      keyframes,
    },
  },
  conditions: {
    extend: {
      groupDataSelected: ".group:is([aria-selected=true], [data-selected]) &",
    },
  },
});

export default preset;
