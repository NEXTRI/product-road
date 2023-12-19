import type { UtilityConfig } from "@pandacss/types";

export const animate: UtilityConfig = {
  animateIn: {
    className: "animate_in",
    values: { type: "boolean" },
    transform: (value: boolean, { token }) => {
      if (!value) return {};

      return {
        animationName: "enter",
        animationDuration: token("durations.fast"),
        "--nextri-enter-opacity": 1,
        "--nextri-enter-scale": 1,
        "--nextri-enter-rotate": 0,
        "--nextri-enter-translate-x": 0,
        "--nextri-enter-translate-y": 0,
      };
    },
  },
  animateOut: {
    className: "animate_out",
    values: { type: "boolean" },
    transform: (value: boolean, { token }) => {
      if (!value) return {};

      return {
        animationName: "exit",
        animationDuration: token("durations.fast"),
        "--nextri-exit-opacity": 1,
        "--nextri-exit-scale": 1,
        "--nextri-exit-rotate": 0,
        "--nextri-exit-translate-x": 0,
        "--nextri-exit-translate-y": 0,
      };
    },
  },
  fadeIn: {
    className: "animate_fade_in",
    values: "opacity",
    transform: (value: number | string) => {
      return {
        "--nextri-enter-opacity": value,
      };
    },
  },
  fadeOut: {
    className: "animate_fade_out",
    values: "opacity",
    transform: (value: number | string) => {
      return {
        "--nextri-exit-opacity": value,
      };
    },
  },
  zoomIn: {
    className: "animate_zoom_in",
    transform: (value: number | string) => {
      return {
        "--nextri-enter-scale": Number(value) / 100,
      };
    },
  },
  zoomOut: {
    className: "animate_zoom_out",
    transform: (value: number | string) => {
      return {
        "--nextri-exit-scale": Number(value) / 100,
      };
    },
  },
  spinIn: {
    className: "animate_spin_in",
    transform: (value: number | string) => {
      return {
        "--nextri-enter-rotate": value,
      };
    },
  },
  spinOut: {
    className: "animate_spin_out",
    transform: (value: number | string) => {
      return {
        "--nextri-exit-rotate": value,
      };
    },
  },
  slideInFromTop: {
    className: "animate_slide_in_from_top",
    values: "spacing",
    transform: (value: number | string) => {
      return {
        "--nextri-enter-translate-y": `calc(${value} * -1)`,
      };
    },
  },
  slideInFromBottom: {
    className: "animate_slide_in_from_bottom",
    values: "spacing",
    transform: (value: number | string) => {
      return {
        "--nextri-enter-translate-y": value,
      };
    },
  },
  slideInFromLeft: {
    className: "animate_slide_in_from_left",
    values: "spacing",
    transform: (value: number | string) => {
      return {
        "--nextri-enter-translate-x": `calc(${value} * -1)`,
      };
    },
  },
  slideInFromRight: {
    className: "animate_slide_in_from_right",
    values: "spacing",
    transform: (value: number | string) => {
      return {
        "--nextri-enter-translate-x": value,
      };
    },
  },
  slideOutToTop: {
    className: "animate_slide_out_to_top",
    values: "spacing",
    transform: (value: number | string) => {
      return {
        "--nextri-exit-translate-y": `calc(${value} * -1)`,
      };
    },
  },
  slideOutToBottom: {
    className: "animate_slide_out_to_bottom",
    values: "spacing",
    transform: (value: number | string) => {
      return {
        "--nextri-exit-translate-y": value,
      };
    },
  },
  slideOutToLeft: {
    className: "animate_slide_out_to_left",
    values: "spacing",
    transform: (value: number | string) => {
      return {
        "--nextri-exit-translate-x": `calc(${value} * -1)`,
      };
    },
  },
  slideOutToRight: {
    className: "animate_slide_out_to_right",
    values: "spacing",
    transform: (value: number | string) => {
      return {
        "--nextri-exit-translate-x": value,
      };
    },
  },
};
