import type { SemanticTokens } from "@pandacss/types";

export const semanticColors: SemanticTokens["colors"] = {
  text: {
    DEFAULT: { value: "{colors.stone.900}" },
    accent: {
      DEFAULT: {
        value: { base: "{colors.blue.800}", _dark: "{colors.blue.300}" },
        bolder: {
          value: { base: "{colors.900}", _dark: "{colors.blue.200}" },
        },
      },
      red: {
        DEFAULT: {
          value: { base: "{colors.red.800}", _dark: "{colors.red.300}" },
        },
        bolder: { value: { base: "{colors.900}", _dark: "{colors.red.200}" } },
      },
      orange: {
        DEFAULT: {
          value: { base: "{colors.orange.800}", _dark: "{colors.orange.300}" },
        },
        bolder: {
          value: { base: "{colors.900}", _dark: "{colors.orange.200}" },
        },
      },
      yellow: {
        DEFAULT: {
          value: { base: "{colors.yellow.800}", _dark: "{colors.yellow.300}" },
        },
        bolder: {
          value: { base: "{colors.900}", _dark: "{colors.yellow.200}" },
        },
      },
      green: {
        DEFAULT: {
          value: { base: "{colors.green.800}", _dark: "{colors.green.300}" },
        },
        bolder: {
          value: { base: "{colors.900}", _dark: "{colors.green.200}" },
        },
      },
      purple: {
        DEFAULT: {
          value: { base: "{colors.purple.800}", _dark: "{colors.purple.300}" },
        },
        bolder: {
          value: { base: "{colors.900}", _dark: "{colors.purple.200}" },
        },
      },
      teal: {
        DEFAULT: {
          value: { base: "{colors.teal.800}", _dark: "{colors.teal.300}" },
        },
        bolder: {
          value: { base: "{colors.900}", _dark: "{colors.teal.200}" },
        },
      },
      magenta: {
        DEFAULT: {
          value: {
            base: "{colors.magenta.800}",
            _dark: "{colors.magenta.300}",
          },
        },
        bolder: {
          value: { base: "{colors.900}", _dark: "{colors.magenta.200}" },
        },
      },
      gray: {
        DEFAULT: { value: "{colors.stone.800}" },
        bolder: { value: "{colors.stone.950}" },
      },
    },
    disabled: {
      value: "{colors.stone.400}",
    },
    inverse: {
      value: "{colors.stone.10}",
    },
    selected: {
      value: { base: "{colors.blue.700}", _dark: "{colors.blue.400}" },
    },
    brand: {
      value: { base: "{colors.blue.700}", _dark: "{colors.blue.400}" },
    },
    danger: {
      value: { base: "{colors.red.800}", _dark: "{colors.red.300}" },
    },
    warning: {
      DEFAULT: {
        value: { base: "{colors.orange.800}", _dark: "{colors.orange.300}" },
      },
      inverse: {
        value: { base: "{colors.stone.900}", _dark: "{colors.stone.50}" },
      },
    },
    success: {
      value: { base: "{colors.green.800}", _dark: "{colors.green.300}" },
    },
    discovery: {
      value: { base: "{colors.purple.800}", _dark: "{colors.purple.300}" },
    },
    information: {
      value: { base: "{colors.blue.800}", _dark: "{colors.blue.300}" },
    },
    subtle: {
      value: "{colors.stone.800}",
    },
    subtlest: {
      value: "{colors.stone.700}",
    },
  },
  icon: {
    DEFAULT: {
      value: "{colors.stone.600}",
    },
    accent: {
      blue: {
        value: "{colors.blue.500}",
      },
      red: {
        value: { base: "{colors.red.600}", _dark: "{colors.red.500}" },
      },
      orange: {
        value: { base: "{colors.orange.600}", _dark: "{colors.orange.500}" },
      },
      yellow: {
        value: { base: "{colors.yellow.600}", _dark: "{colors.yellow.500}" },
      },
      green: {
        value: { base: "{colors.green.600}", _dark: "{colors.green.500}" },
      },
      purple: {
        value: { base: "{colors.purple.600}", _dark: "{colors.purple.500}" },
      },
      teal: {
        value: { base: "{colors.teal.600}", _dark: "{colors.teal.500}" },
      },
      magenta: {
        value: { base: "{colors.magenta.600}", _dark: "{colors.magenta.500}" },
      },
      gray: {
        value: "{colors.stone.600}",
      },
    },
    disabled: {
      value: "{colors.slate.400}",
    },
    inverse: {
      value: "{colors.stone.50}",
    },
    selected: {
      value: { base: "{colors.blue.700}", _dark: "{colors.blue.400}" },
    },
    brand: {
      value: { base: "{colors.blue.700}", _dark: "{colors.blue.400}" },
    },
    danger: {
      value: { base: "{colors.red.600}", _dark: "{colors.red.500}" },
    },
    warning: {
      DEFAULT: {
        value: { base: "{colors.orange.600}", _dark: "{colors.orange.500}" },
      },
      inverse: {
        value: { base: "{colors.stone.900}", _dark: "{colors.stone.50}" },
      },
    },
    success: {
      value: { base: "{colors.green.600}", _dark: "{colors.green.500}" },
    },
    discovery: {
      value: { base: "{colors.purple.600}", _dark: "{colors.purple.500}" },
    },
    information: {
      value: { base: "{colors.blue.600}", _dark: "{colors.blue.500}" },
    },
    subtle: {
      value: "{colors.stone.700}",
    },
  },
  border: {
    DEFAULT: {
      value: "{colors.slate.300}",
    },
    bold: {
      value: "{colors.stone.600}",
    },
    accent: {
      blue: {
        value: "blue.500",
      },
      red: {
        value: { base: "{colors.red.600}", _dark: "{colors.red.500}" },
      },
      orange: {
        value: { base: "{colors.orange.600}", _dark: "{colors.orange.500}" },
      },
      yellow: {
        value: { base: "{colors.yellow.600}", _dark: "{colors.yellow.500}" },
      },
      green: {
        value: { base: "{colors.green.600}", _dark: "{colors.green.500}" },
      },
      purple: {
        value: { base: "{colors.purple.600}", _dark: "{colors.purple.500}" },
      },
      teal: {
        value: { base: "{colors.teal.600}", _dark: "{colors.teal.500}" },
      },
      magenta: {
        value: { base: "{colors.magenta.600}", _dark: "{colors.magenta.500}" },
      },
      gray: {
        value: "{colors.stone.600}",
      },
    },
    disabled: {
      value: "{colors.slate.200}",
    },
    focused: {
      value: { base: "{colors.blue.500}", _dark: "{colors.blue.300}" },
    },
    input: {
      value: "{colors.slate.300}",
    },
    inverse: {
      value: "{colors.stone.50}",
    },
    selected: {
      value: { base: "{colors.blue.700}", _dark: "{colors.blue.400}" },
    },
    brand: {
      value: { base: "{colors.blue.700}", _dark: "{colors.blue.400}" },
    },
    danger: {
      value: { base: "{colors.red.600}", _dark: "{colors.red.500}" },
    },
    warning: {
      value: { base: "{colors.orange.600}", _dark: "{colors.orange.500}" },
    },
    success: {
      value: { base: "{colors.green.600}", _dark: "{colors.green.500}" },
    },
    discovery: {
      value: { base: "{colors.purple.600}", _dark: "{colors.purple.500}" },
    },
    information: {
      value: { base: "{colors.blue.600}", _dark: "{colors.blue.500}" },
    },
  },
  background: {
    accent: {
      blue: {
        subtlest: {
          value: { base: "{colors.blue.100}", _dark: "{colors.blue.1000}" },
        },
        subtler: {
          value: { base: "{colors.blue.200}", _dark: "{colors.blue.900}" },
        },
        subtle: {
          value: { base: "{colors.blue.400}", _dark: "{colors.blue.800}" },
        },
        bolder: {
          value: { base: "{colors.blue.700}", _dark: "{colors.blue.400}" },
        },
      },
      red: {
        subtlest: {
          value: { base: "{colors.red.100}", _dark: "{colors.red.1000}" },
        },
        subtler: {
          value: { base: "{colors.red.200}", _dark: "{colors.red.900}" },
        },
        subtle: {
          value: { base: "{colors.red.400}", _dark: "{colors.red.800}" },
        },
        bolder: {
          value: { base: "{colors.red.700}", _dark: "{colors.red.400}" },
        },
      },
      orange: {
        subtlest: {
          value: { base: "{colors.orange.100}", _dark: "{colors.orange.1000}" },
        },
        subtler: {
          value: { base: "{colors.orange.200}", _dark: "{colors.orange.900}" },
        },
        subtle: {
          value: { base: "{colors.orange.400}", _dark: "{colors.orange.800}" },
        },
        bolder: {
          value: { base: "{colors.orange.700}", _dark: "{colors.orange.400}" },
        },
      },
      yellow: {
        subtlest: {
          value: { base: "{colors.yellow.100}", _dark: "{colors.yellow.1000}" },
        },
        subtler: {
          value: { base: "{colors.yellow.200}", _dark: "{colors.yellow.900}" },
        },
        subtle: {
          value: { base: "{colors.yellow.400}", _dark: "{colors.yellow.800}" },
        },
        bolder: {
          value: { base: "{colors.yellow.700}", _dark: "{colors.yellow.400}" },
        },
      },
      green: {
        subtlest: {
          value: { base: "{colors.green.100}", _dark: "{colors.green.1000}" },
        },
        subtler: {
          value: { base: "{colors.green.200}", _dark: "{colors.green.900}" },
        },
        subtle: {
          value: { base: "{colors.green.400}", _dark: "{colors.green.800}" },
        },
        bolder: {
          value: { base: "{colors.green.700}", _dark: "{colors.green.400}" },
        },
      },
      purple: {
        subtlest: {
          value: { base: "{colors.purple.100}", _dark: "{colors.purple.1000}" },
        },
        subtler: {
          value: { base: "{colors.purple.200}", _dark: "{colors.purple.900}" },
        },
        subtle: {
          value: { base: "{colors.purple.400}", _dark: "{colors.purple.800}" },
        },
        bolder: {
          value: { base: "{colors.purple.700}", _dark: "{colors.purple.400}" },
        },
      },
      teal: {
        subtlest: {
          value: { base: "{colors.teal.100}", _dark: "{colors.teal.1000}" },
        },
        subtler: {
          value: { base: "{colors.teal.200}", _dark: "{colors.teal.900}" },
        },
        subtle: {
          value: { base: "{colors.teal.400}", _dark: "{colors.teal.800}" },
        },
        bolder: {
          value: { base: "{colors.teal.700}", _dark: "{colors.teal.400}" },
        },
      },
      magenta: {
        subtlest: {
          value: {
            base: "{colors.magenta.100}",
            _dark: "{colors.magenta.1000}",
          },
        },
        subtler: {
          value: {
            base: "{colors.magenta.200}",
            _dark: "{colors.magenta.900}",
          },
        },
        subtle: {
          value: {
            base: "{colors.magenta.400}",
            _dark: "{colors.magenta.800}",
          },
        },
        bolder: {
          value: {
            base: "{colors.magenta.700}",
            _dark: "{colors.magenta.400}",
          },
        },
      },
      gray: {
        subtlest: {
          value: { base: "{colors.stone.200}", _dark: "{colors.stone.300}" },
        },
        subtler: {
          value: { base: "{colors.stone.300}", _dark: "{colors.stone.400}" },
        },
        subtle: {
          value: { base: "{colors.stone.400}", _dark: "{colors.stone.500}" },
        },
        bolder: {
          value: "{colors.stone.700}",
        },
      },
    },
    disabled: {
      value: "{colors.stone.100}",
    },
    slate: {
      DEFAULT: {
        value: "{colors.slate.200}",
      },
      hovered: {
        value: "{colors.slate.300}",
      },
      pressed: {
        value: "{colors.slate.400}",
      },
      subtle: {
        DEFAULT: {
          value: "transparent",
        },
        hovered: {
          value: "{colors.slate.200}",
        },
        pressed: {
          value: "{colors.slate.300}",
        },
      },
      bold: {
        DEFAULT: {
          value: "{colors.stone.800}",
        },
        hovered: {
          value: "{colors.stone.900}",
        },
        pressed: {
          value: "{colors.stone.900}",
        },
      },
    },
    inverse: {
      subtle: {
        DEFAULT: {
          value: { base: "#00000029", _dark: "#FFFFFF29" },
        },
        hovered: {
          value: { base: "#0000003D", _dark: "#FFFFFF3D" },
        },
        pressed: {
          value: { base: "#00000052", _dark: "#FFFFFF52" },
        },
      },
    },
    selected: {
      DEFAULT: {
        value: { base: "{colors.blue.100}", _dark: "{colors.blue.1000}" },
      },
      hovered: {
        value: { base: "{colors.blue.200}", _dark: "{colors.blue.900}" },
      },
      pressed: {
        value: { base: "{colors.blue.300}", _dark: "{colors.blue.800}" },
      },
      bold: {
        DEFAULT: {
          value: { base: "{colors.blue.700}", _dark: "{colors.blue.400}" },
        },
        hovered: {
          value: { base: "{colors.blue.800}", _dark: "{colors.blue.300}" },
        },
        pressed: {
          value: { base: "{colors.blue.900}", _dark: "{colors.blue.200}" },
        },
      },
    },
    brand: {
      bold: {
        DEFAULT: {
          value: { base: "{colors.blue.700}", _dark: "{colors.blue.400}" },
        },
        hovered: {
          value: { base: "{colors.blue.800}", _dark: "{colors.blue.300}" },
        },
        pressed: {
          value: { base: "{colors.blue.900}", _dark: "{colors.blue.200}" },
        },
      },
    },
    input: {
      DEFAULT: {
        value: { base: "{colors.stone.50}", _dark: "{colors.slate.100}" },
      },
      hovered: {
        value: { base: "{colors.stone.100}", _dark: "{colors.stone.200}" },
      },
      pressed: {
        value: { base: "{colors.stone.50}", _dark: "{colors.stone.100}" },
      },
    },
    warning: {
      DEFAULT: {
        value: { base: "{colors.yellow.100}", _dark: "{colors.yellow.1000}" },
      },
      hovered: {
        value: { base: "{colors.yellow.200}", _dark: "{colors.yellow.900}" },
      },
      pressed: {
        value: { base: "{colors.yellow.300}", _dark: "{colors.yellow.800}" },
      },
      bold: {
        DEFAULT: {
          value: { base: "{colors.yellow.400}", _dark: "{colors.yellow.400}" },
        },
        hovered: {
          value: { base: "{colors.yellow.500}", _dark: "{colors.yellow.300}" },
        },
        pressed: {
          value: { base: "{colors.yellow.600}", _dark: "{colors.yellow.200}" },
        },
      },
    },
    success: {
      DEFAULT: {
        value: { base: "{colors.green.100}", _dark: "{colors.green.1000}" },
      },
      hovered: {
        value: { base: "{colors.green.200}", _dark: "{colors.green.900}" },
      },
      pressed: {
        value: { base: "{colors.green.300}", _dark: "{colors.green.800}" },
      },
      bold: {
        DEFAULT: {
          value: { base: "{colors.green.700}", _dark: "{colors.green.400}" },
        },
        hovered: {
          value: { base: "{colors.green.800}", _dark: "{colors.green.300}" },
        },
        pressed: {
          value: { base: "{colors.green.900}", _dark: "{colors.green.200}" },
        },
      },
    },
    discovery: {
      DEFAULT: {
        value: { base: "{colors.purple.100}", _dark: "{colors.purple.1000}" },
      },
      hovered: {
        value: { base: "{colors.purple.200}", _dark: "{colors.purple.900}" },
      },
      pressed: {
        value: { base: "{colors.purple.300}", _dark: "{colors.purple.800}" },
      },
      bold: {
        DEFAULT: {
          value: { base: "{colors.purple.700}", _dark: "{colors.purple.400}" },
        },
        hovered: {
          value: { base: "{colors.purple.800}", _dark: "{colors.purple.300}" },
        },
        pressed: {
          value: { base: "{colors.purple.900}", _dark: "{colors.purple.200}" },
        },
      },
    },
    information: {
      DEFAULT: {
        value: { base: "{colors.blue.100}", _dark: "{colors.blue.1000}" },
      },
      hovered: {
        value: { base: "{colors.blue.200}", _dark: "{colors.blue.900}" },
      },
      pressed: {
        value: { base: "{colors.blue.300}", _dark: "{colors.blue.800}" },
      },
      bold: {
        DEFAULT: {
          value: { base: "{colors.blue.700}", _dark: "{colors.blue.400}" },
        },
        hovered: {
          value: { base: "{colors.blue.800}", _dark: "{colors.blue.300}" },
        },
        pressed: {
          value: { base: "{colors.blue.900}", _dark: "{colors.blue.200}" },
        },
      },
    },
    danger: {
      DEFAULT: {
        value: { base: "{colors.red.100}", _dark: "{colors.red.1000}" },
      },
      hovered: {
        value: { base: "{colors.red.200}", _dark: "{colors.red.900}" },
      },
      pressed: {
        value: { base: "{colors.red.300}", _dark: "{colors.red.800}" },
      },
      bold: {
        DEFAULT: {
          value: { base: "{colors.red.700}", _dark: "{colors.red.400}" },
        },
        hovered: {
          value: { base: "{colors.red.800}", _dark: "{colors.red.300}" },
        },
        pressed: {
          value: { base: "{colors.red.900}", _dark: "{colors.red.200}" },
        },
      },
    },
  },
  blanket: {
    DEFAULT: {
      value: { base: "{colors.slate.500}", _dark: "{colors.slate.100}" },
    },
    selected: {
      value: { base: "#388BFF14", _dark: "#1D7AFC14" },
    },
    danger: {
      value: { base: "#EF5C4814", _dark: "#E3493514" },
    },
  },
  interaction: {
    hovered: {
      value: { base: "#00000029", _dark: "#ffffff33" },
    },
    pressed: {
      value: { base: "#00000052", _dark: "#ffffff5c" },
    },
  },
  skeleton: {
    DEFAULT: {
      value: "{colors.slate.200}",
    },
    subtle: {
      value: "{colors.slate.100}",
    },
  },
  link: {
    DEFAULT: {
      value: { base: "{colors.blue.700}", _dark: "{colors.blue.400}" },
    },
    pressed: {
      value: { base: "{colors.blue.800}", _dark: "{colors.blue.300}" },
    },
  },
};
