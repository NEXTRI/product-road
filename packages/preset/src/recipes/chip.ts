import { defineRecipe } from "@pandacss/dev";

export const chip = defineRecipe({
  className: "chip",
  description: "Styles for the Chip component",
  base: {
    display: "inline-flex",
    alignItems: "center",
    border: "base",
    px: "2.5",
    py: "0.5",
    textStyle: "xs",
    fontWeight: "semibold",
    transition: "colors",
    focusRingOffsetColor: "background",
    gap: 1,

    _focus: {
      outline: "2px solid transparent",
      outlineOffset: "2px",
      focusRingWidth: "2",
      focusRingColor: "ring",
      focusRingOffsetWidth: "2",
    },
  },
  variants: {
    variant: {
      default: {
        borderColor: "transparent",
        bg: "primary",
        color: "primary.foreground",

        _hover: {
          bga: "primary/80",
        },
      },
      secondary: {
        borderColor: "transparent",
        bg: "secondary",
        color: "secondary.foreground",

        _hover: {
          bga: "secondary/80",
        },
      },
      outline: {
        color: "foreground",
      },
    },
    radius: {
      none: { borderRadius: "0" },
      sm: { borderRadius: "sm" },
      md: { borderRadius: "md" },
      lg: { borderRadius: "lg" },
      full: { borderRadius: "full" },
    },
  },
  defaultVariants: {
    variant: "default",
    radius: "full",
  },
});
