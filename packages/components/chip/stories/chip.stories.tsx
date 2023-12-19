import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "../src";
import { css, cx } from "styled-system/css";
import { DollarSign, BellRing, XSquare } from "lucide-react";
import { icon } from "styled-system/recipes";

const meta = {
  component: Chip,
} as Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  name: "Chip Variants",
  render: () => (
    <div className={css({ display: "flex", gap: "6" })}>
      <Chip>default</Chip>
      <Chip variant="outline">outline</Chip>
      <Chip variant="secondary">secondary</Chip>
    </div>
  ),
};

export const Sizes: Story = {
  name: "Chip Sizes",
  render: () => (
    <div className={css({ display: "flex", gap: "6" })}>
      <Chip radius="none">none</Chip>
      <Chip radius="sm">small</Chip>
      <Chip radius="md">medium</Chip>
      <Chip radius="lg">large</Chip>
      <Chip>full</Chip>
    </div>
  ),
};

export const Radius: Story = {
  name: "Chip Radius",
  render: () => (
    <div className={css({ display: "flex", gap: "6" })}>
      <Chip radius="none">none</Chip>
      <Chip radius="sm">small</Chip>
      <Chip radius="md">medium</Chip>
      <Chip radius="lg">large</Chip>
      <Chip>full</Chip>
    </div>
  ),
};

export const WithIcons: Story = {
  name: "Chip With Icons",
  render: () => (
    <div className={css({ display: "flex", gap: "6" })}>
      <Chip>
        <DollarSign className={cx(icon())} />
        Chip
      </Chip>
      <Chip>
        Chip
        <BellRing className={cx(icon({ fillCurrent: true, size: "sm" }))} />
      </Chip>
    </div>
  ),
};

export const WithCloseButton: Story = {
  name: "With Close Button",
  render: () => (
    <div className={css({ display: "flex", gap: "6" })}>
      <Chip onClose={() => console.log("trigger")}>Chip</Chip>
      <Chip
        closeIcon={<XSquare size={18} />}
        onClose={() => console.log("trigger")}
      >
        override icon
      </Chip>
    </div>
  ),
};
