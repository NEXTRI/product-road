import { expect, it, describe } from "vitest";
import React, { useContext } from "react";
import { createStyleContext } from "../src";
import { CheckboxVariants, checkbox } from "../src/checkbox.recipe";
import { render, screen } from "@testing-library/react";

describe("createStyleContext", () => {
  it("should create a StyleContext", () => {
    const { withProvider, withContext } = createStyleContext(checkbox);
    expect(withProvider).toBeTruthy();
    expect(withContext).toBeTruthy();
  });

  it("should provide styles with withProvider", () => {
    const { withProvider } = createStyleContext(checkbox);
    const Root = withProvider("label", "root");

    render(<Root data-testid="test-root" />);
    const label = screen.getByTestId("test-root");
    expect(label).toBeDefined();
    expect(label.className.split(" ").length).toEqual(3);
  });

  it("should consume styles with withContext", () => {
    const { withProvider, withContext } = createStyleContext(checkbox);
    const Root = withProvider("label", "root");
    const Control = withProvider("div", "control");
    const Label = withContext("span", "label");

    const Checkbox = { Root, Control, Label };

    render(
      <Checkbox.Root>
        <Checkbox.Control />
        <Checkbox.Label data-testid="test-label">Checkbox Label</Checkbox.Label>
      </Checkbox.Root>
    );

    const label = screen.getByTestId("test-label");
    expect(label).toBeDefined();
    expect(label.className.split(" ").length).toEqual(2);
  });
});
