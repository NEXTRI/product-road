import type { UtilityConfig } from "@pandacss/types";

const baseTransform = {
  transform:
    "translate(var(--nextri-translate-x, 0), var(--nextri-translate-y, 0)) rotate(var(--nextri-rotate, 0)) skewX(var(--nextri-skew-x, 0)) skewY(var(--nextri-skew-y, 0)) scaleX(var(--nextri-scale-x, 1)) scaleY(var(--nextri-scale-y, 1))",
};

export const transform: UtilityConfig = {
  translate: {
    className: "translate",
    values: "spacing",
    transform: (value: string) => {
      return {
        ...baseTransform,
        "--nextri-translate-x": value,
        "--nextri-translate-y": value,
      };
    },
  },
  translateY: {
    className: "translate_y",
    values: "spacing",
    transform: (value: string) => {
      return {
        ...baseTransform,
        "--nextri-translate-y": value,
      };
    },
  },
  translateX: {
    className: "translate_x",
    values: "spacing",
    transform: (value: string) => {
      return {
        ...baseTransform,
        "--nextri-translate-x": value,
      };
    },
  },
};
