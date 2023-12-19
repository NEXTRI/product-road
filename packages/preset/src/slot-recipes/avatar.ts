import { defineSlotRecipe } from "@pandacss/dev";

export const avatar = defineSlotRecipe({
  className: "avatar",
  description: "Styles for the Avatar component",
  slots: ["root", "image", "fallback"],
  base: {
    root: {
      position: "relative",
      display: "flex",
      flexShrink: "0",
      overflow: "hidden",
      rounded: "full",
    },
    image: {
      aspectRatio: "square",
      h: "full",
      w: "full",
    },
    fallback: {
      display: "flex",
      h: "full",
      w: "full",
      alignItems: "center",
      justifyContent: "center",
      rounded: "full",
      bg: "muted",
    },
  },
  variants: {
    size: {
      xs: {
        root: {
          h: "8",
          w: "8",
        },
        fallback: {
          textStyle: "xs",
        },
      },
      sm: {
        root: {
          h: "9",
          w: "9",
        },
        fallback: {
          textStyle: "sm",
        },
      },
      md: {
        root: {
          h: "10",
          w: "10",
        },
        fallback: {
          textStyle: "md",
        },
      },
      lg: {
        root: {
          h: "11",
          w: "11",
        },
        fallback: {
          textStyle: "lg",
        },
      },
      xl: {
        root: {
          h: "12",
          w: "12",
        },
        fallback: {
          textStyle: "xl",
        },
      },
      "2xl": {
        root: {
          h: "16",
          w: "16",
        },
        fallback: {
          textStyle: "2xl",
        },
      },
    },
    radius: {
      none: {
        root: {
          borderRadius: "0",
        },
      },
      sm: {
        root: {
          borderRadius: "sm",
        },
      },
      md: {
        root: {
          borderRadius: "md",
        },
      },
      lg: {
        root: {
          borderRadius: "lg",
        },
      },
      full: {
        root: {
          borderRadius: "full",
        },
      },
    },
    isBordered: {
      true: {
        root: {
          boxShadow: "0 0 0 2px white, 0 0 0 4px #d4d4d8",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    radius: "full",
    isBordered: false,
  },
});
