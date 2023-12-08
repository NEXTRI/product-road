import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "..";

const meta = {
  component: Button,
} as Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  name: "Button Variants",
  render: () => <Button />,
};
