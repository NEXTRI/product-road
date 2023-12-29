import { defineSemanticTokens } from "@pandacss/dev";

export const shadows = defineSemanticTokens.shadows({
  base: { value: "0" },
  primary: { value: "0 4px 20px #563bff59" },
  secondary: { value: "0 4px 20px #9384f345" },
});
