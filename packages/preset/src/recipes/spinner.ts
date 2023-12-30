import { defineRecipe } from "@pandacss/dev";

export const spinner = defineRecipe({
  className: "spinner",
  description: "Styles for the spinners",
  base: {
    border: "2px solid",
    borderRadius: "full",
    h: "7",
    w: "7",
    animation: "spin",
  },
  variants: {
    size: {
      xl: {
        h: "7",
        w: "7",
      },
      lg: {
        h: "6",
        w: "6",
      },
      md: {
        h: "5",
        w: "5",
      },
      sm: {
        h: "4",
        w: "4",
      },
      xs: {
        h: "3",
        w: "3",
      },
    },
    variant: {
      default: {
        borderTopColor: "#7869DA",
        borderRightColor: "#7869DA",
        borderLeftColor: "#F3F1FF",
        borderBottomColor: "#F3F1FF",
      },
      warning: {
        borderTopColor: "#FF9900",
        borderRightColor: "#FF9900",
        borderLeftColor: "#FFF4D7",
        borderBottomColor: "#FFF4D7",
      },
      primary: {
        borderTopColor: "#0094FF",
        borderRightColor: "#0094FF",
        borderLeftColor: "#DCF4FF",
        borderBottomColor: "#DCF4FF",
      },
      secondary: {
        borderTopColor: "#339C5D",
        borderRightColor: "#339C5D",
        borderLeftColor: "#EBFFE1",
        borderBottomColor: "#EBFFE1",
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "xl",
  },
});
