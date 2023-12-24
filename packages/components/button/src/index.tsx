"use client";

import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { button } from "styled-system/recipes";
import React from "react";

export const StyledButton = styled("button", button);

export type ButtonProps = HTMLStyledProps<typeof StyledButton>;

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};
