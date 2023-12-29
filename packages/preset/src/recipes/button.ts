import { defineRecipe } from "@pandacss/dev";

export const button = defineRecipe({
  className: "button",
  description: "Styles for the Button component",
  base: {
    display: "inline-flex",
    alignItems: "center",
    px: "5",
    py: "2",
    textStyle: "sm",
    fontWeight: "semibold",
    transition: "colors",
    focusRingOffsetColor: "background",
    outline: 0,
    cursor: "pointer",
    gap: 1,
  },
  variants: {
    variant: {
      primary: {
        borderColor: "transparent",
        bg: "primary.purple",
        color: "primary.foreground",
        boxShadow: "primary",
        _hover: {
          bga: "primary/80",
        },
      },
      secondary: {
        borderColor: "secondary.gray",
        bg: "transparent",
        color: "secondary.gray",
        boxShadow: "secondary",
        _hover: {
          bga: "secondary/80",
        },
      },
      outline: {
        border: "base",
        bg: "transparent",
        color: "foreground",

        _hover: {
          bga: "secondary/80",
        },
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
    variant: "primary",
    radius: "lg",
  },
});
