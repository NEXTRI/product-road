import { defineKeyframes } from "@pandacss/dev";

export const keyframes = defineKeyframes({
  enter: {
    from: {
      opacity: "var(--nextri-enter-opacity, 1)",
      transform:
        "translate3d(var(--nextri-enter-translate-x, 0), var(--nextri-enter-translate-y, 0), 0) scale3d(var(--nextri-enter-scale, 1), var(--nextri-enter-scale, 1), var(--nextri-enter-scale, 1)) rotate(var(--nextri-enter-rotate, 0))",
    },
  },
  exit: {
    to: {
      opacity: "var(--nextri-exit-opacity, 1)",
      transform:
        "translate3d(var(--nextri-exit-translate-x, 0), var(--nextri-exit-translate-y, 0), 0) scale3d(var(--nextri-exit-scale, 1), var(--nextri-exit-scale, 1), var(--nextri-exit-scale, 1)) rotate(var(--nextri-exit-rotate, 0))",
    },
  },
  "accordion-down": {
    from: { height: 0 },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  "accordion-up": {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: 0 },
  },
});
