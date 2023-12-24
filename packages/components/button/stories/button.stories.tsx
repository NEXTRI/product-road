import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src";
import { css, cx } from "styled-system/css";
// import { DollarSign, BellRing, XSquare } from "lucide-react";
// import { icon } from "styled-system/recipes";

const meta = {
  component: Button,
} as Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  name: "Button Variants",
  render: () => (
    <div className={css({ display: "flex", gap: "6" })}>
      <Button variant="default">Click ee!</Button>
    </div>
  ),
};

export const Radius: Story = {
  name: "Button Radius",
  render: () => (
    <div className={css({ display: "flex", gap: "6" })}>
      <Button>primary</Button>
      <Button radius="none">none</Button>
      <Button radius="sm">small</Button>
      <Button radius="md">medium</Button>
      <Button radius="lg">large</Button>
      <Button radius="full">full</Button>
    </div>
  ),
};
