"use client";

import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { spinner } from "styled-system/recipes";
import React from "react";

export const StyledSpinner = styled("div", spinner);
export type SpinnerProps = HTMLStyledProps<typeof StyledSpinner>;

export const Spinner: React.FC<SpinnerProps> = ({ children, ...rest }) => {
  return <StyledSpinner {...rest}>{children}</StyledSpinner>;
};
