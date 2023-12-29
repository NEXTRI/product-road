import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src";
import { css } from "styled-system/css";
import { Plus, XCircle } from "lucide-react";

const meta = {
  component: Button,
} as Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  name: "Button Variants",
  render: () => (
    <div className={css({ display: "flex", gap: "6" })}>
      <Button>primary</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="outline">outline</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  name: "Button With Icons",
  render: () => (
    <div className={css({ display: "flex", gap: "6" })}>
      <Button onClick={(e) => console.log("hello world")}>
        <Plus /> Add Feedback
      </Button>
      <Button variant="secondary">
        <XCircle /> Close
      </Button>
    </div>
  ),
};
export const OnlyIcons: Story = {
  name: "Only Icons",
  render: () => (
    <div className={css({ display: "flex", gap: "6" })}>
      <Button>
        <Plus />
      </Button>
      <Button variant="secondary">
        <XCircle />
      </Button>
    </div>
  ),
};
