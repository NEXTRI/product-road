import { defineRecipe } from "@pandacss/dev";

export const button = defineRecipe({
  className: "button",
  description: "Styles for the Button component",
  base: {
    display: "inline-flex",
    alignItems: "center",
    px: "3",
    py: "1",
    textStyle: "xs",
    fontWeight: "semibold",
    transition: "colors",
    focusRingOffsetColor: "background",
    gap: 1,
  },
  variants: {
    variant: {
      default: {
        borderColor: "blue",
        bg: "green",
        color: "primary.foreground",
      },
      // secondary: { 
      //   borderColor: "transparent", 
      //   bg: "blue", 
      //   color: "secondary.foreground", 

      //   _hover: { 
      //     bga: "secondary/80", 
      //   }, 
      // }, 
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
    radius: "none",
  },
});
