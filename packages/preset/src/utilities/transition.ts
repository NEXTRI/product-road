import type { UtilityConfig } from "@pandacss/types";

const DEFAULT_TRANSITION_DURATION = "250ms";

export const transition: UtilityConfig = {
  transition: {
    className: "transition",
    values: { type: "boolean" },
    transform: (value: boolean) => {
      if (!value) return {};
      return {
        "transition-property":
          "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
        "transition-timing-function": "ease",
        "transition-duration": DEFAULT_TRANSITION_DURATION,
      };
    },
  },
  transitionAll: {
    className: "transition-all",
    values: { type: "boolean" },
    transform: (value: boolean) => {
      if (!value) return {};
      return {
        "transition-property": "all",
        "transition-timing-function": "ease",
        "transition-duration": DEFAULT_TRANSITION_DURATION,
      };
    },
  },
  transitionBackground: {
    className: "transition-bg",
    values: { type: "boolean" },
    transform: (value: boolean) => {
      if (!value) return {};
      return {
        "transition-property": "background",
        "transition-timing-function": "ease",
        "transition-duration": DEFAULT_TRANSITION_DURATION,
      };
    },
  },
  transitionColors: {
    className: "transition-colors",
    values: { type: "boolean" },
    transform: (value: boolean) => {
      if (!value) return {};
      return {
        "transition-property":
          "color, background-color, border-color, text-decoration-color, fill, stroke",
        "transition-timing-function": "ease",
        "transition-duration": DEFAULT_TRANSITION_DURATION,
      };
    },
  },
  transitionOpacity: {
    className: "transition-opacity",
    values: { type: "boolean" },
    transform: (value: boolean) => {
      if (!value) return {};
      return {
        "transition-property": "opacity",
        "transition-timing-function": "ease",
        "transition-duration": DEFAULT_TRANSITION_DURATION,
      };
    },
  },
  transitionTransform: {
    className: "transition-transform",
    values: { type: "boolean" },
    transform: (value: boolean) => {
      if (!value) return {};
      return {
        "transition-property": "transform",
        "transition-timing-function": "ease",
        "transition-duration": DEFAULT_TRANSITION_DURATION,
      };
    },
  },
  transitionTransformOpacity: {
    className: "transition-transform-opacity",
    values: { type: "boolean" },
    transform: (value: boolean) => {
      if (!value) return {};
      return {
        "transition-property": "transform, opacity",
        "transition-timing-function": "ease",
        "transition-duration": DEFAULT_TRANSITION_DURATION,
      };
    },
  },
  transitionColorsOpacity: {
    className: "transition-colors",
    values: { type: "boolean" },
    transform: (value: boolean) => {
      if (!value) return {};
      return {
        "transition-property":
          "color, background-color, border-color, text-decoration-color, fill, stroke, opacity",
        "transition-timing-function": "ease",
        "transition-duration": DEFAULT_TRANSITION_DURATION,
      };
    },
  },
  transitionWidth: {
    className: "transition-width",
    values: { type: "boolean" },
    transform: (value: boolean) => {
      if (!value) return {};
      return {
        "transition-property": "width",
        "transition-timing-function": "ease",
        "transition-duration": DEFAULT_TRANSITION_DURATION,
      };
    },
  },
};
