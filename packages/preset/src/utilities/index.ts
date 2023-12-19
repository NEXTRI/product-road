import type { Config } from "@pandacss/types";
import { backdropFilter } from "./backdrop-filter";
import { transform } from "./transform";
import { animate } from "./animate";
import { transition } from "./transition";

export const utilities: Config["utilities"] = {
  extend: {
    ...backdropFilter,
    ...transform,
    ...animate,
    ...transition,
  },
};
