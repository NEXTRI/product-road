import { expect } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { afterEach } from "vitest";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
