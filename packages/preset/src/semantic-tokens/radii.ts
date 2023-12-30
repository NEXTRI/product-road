import { defineSemanticTokens } from "@pandacss/dev";

export const radii = defineSemanticTokens.radii({
  none: { value: "0" },
  sm: { value: "0.125rem" },
  base: { value: "0.25rem" },
  md: { value: "0.375rem" },
  lg: { value: "0.5rem" },
  xl: { value: "0.75rem" },
  "2xl": { value: "1rem" },
  "3xl": { value: "1.5rem" },
  full: { value: "9999px" },
});