import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "../src";
import { css, cx } from "styled-system/css";
import { DollarSign, BellRing, XSquare } from "lucide-react";
import { icon } from "styled-system/recipes";

const meta = {
  component: Spinner,
} as Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  name: "Spinner Variants",
  render: () => (
    <div className={css({ display: "flex", gap: "6" })}>
      <Spinner variant="default"></Spinner>
      <Spinner variant="primary"></Spinner>
      <Spinner variant="warning"></Spinner>
      <Spinner variant="secondary"></Spinner>
    </div>
  ),
};

export const Sizes: Story = {
  name: "Spinner Sizes",
  render: () => (
    <div className={css({ display: "flex", gap: "6" })}>
      <Spinner size="sm"></Spinner>
      <Spinner size="md"></Spinner>
      <Spinner size="lg"></Spinner>
      <Spinner size="xl"></Spinner>
    </div>
  ),
};
