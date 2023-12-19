import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarFallback, AvatarImage } from "../src";
import { css } from "styled-system/css";

const meta = {
  component: Avatar,
} as Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Usage: Story = {
  name: "Avatar Usage",
  render: () => (
    <div className={css({ display: "flex", gap: "6" })}>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="User Avatar" />
        <AvatarFallback>UA</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>OD</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const Sizes: Story = {
  name: "Avatar Sizes",
  render: () => (
    <div className={css({ display: "flex", gap: "6" })}>
      <Avatar size="xs">
        <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="User Avatar" />
        <AvatarFallback>XS</AvatarFallback>
      </Avatar>
      <Avatar size="xs">
        <AvatarFallback>XS</AvatarFallback>
      </Avatar>
      <Avatar size="sm">
        <AvatarImage src="https://i.pravatar.cc/150?img=10" alt="User Avatar" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarImage src="https://i.pravatar.cc/150?img=11" alt="User Avatar" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User Avatar" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar size="xl">
        <AvatarImage src="https://i.pravatar.cc/150?img=21" alt="User Avatar" />
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
      <Avatar size="xl">
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
      <Avatar size="2xl">
        <AvatarImage src="https://i.pravatar.cc/150?img=37" alt="User Avatar" />
        <AvatarFallback>2X</AvatarFallback>
      </Avatar>
      <Avatar size="2xl">
        <AvatarFallback>2X</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const Bordered: Story = {
  name: "Avatar Bordered",
  render: () => (
    <div className={css({ display: "flex", gap: "6" })}>
      <Avatar isBordered>
        <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="User Avatar" />
        <AvatarFallback>UA</AvatarFallback>
      </Avatar>
      <Avatar isBordered>
        <AvatarFallback>OD</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const Radius: Story = {
  name: "Avatar Radius",
  render: () => (
    <div className={css({ display: "flex", gap: "6" })}>
      <Avatar isBordered radius="none">
        <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="User Avatar" />
        <AvatarFallback>UA</AvatarFallback>
      </Avatar>
      <Avatar isBordered radius="sm">
        <AvatarImage src="https://i.pravatar.cc/150?img=10" alt="User Avatar" />
        <AvatarFallback>UA</AvatarFallback>
      </Avatar>
      <Avatar isBordered radius="md">
        <AvatarImage src="https://i.pravatar.cc/150?img=11" alt="User Avatar" />
        <AvatarFallback>UA</AvatarFallback>
      </Avatar>
      <Avatar isBordered radius="lg">
        <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User Avatar" />
        <AvatarFallback>UA</AvatarFallback>
      </Avatar>
      <Avatar isBordered>
        <AvatarFallback>OD</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const CustomFallback: Story = {
  name: "Avatar CustomFallback",
  render: () => (
    <div className={css({ display: "flex", gap: "6" })}>
      <Avatar isBordered>
        <AvatarFallback>
          <span className={css({ color: "neutral.600", fontSize: "sm" })}>
            ouss
          </span>
        </AvatarFallback>
      </Avatar>
      <Avatar isBordered>
        <AvatarFallback>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={css({ stroke: "neutral.400" })}
          >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
        </AvatarFallback>
      </Avatar>
    </div>
  ),
};
