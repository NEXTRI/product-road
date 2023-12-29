"use client";
import React, { useRef } from "react";
import { useButton } from "@react-aria/button";
import { styled, type HTMLStyledProps } from "styled-system/jsx";
import type { PressEvent } from "@react-types/shared";
import { button } from "styled-system/recipes";

export const StyledButton = styled("button", button);

export type ButtonProps = HTMLStyledProps<typeof StyledButton> & {
  onClick?: (e: PressEvent) => void;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  ...rest
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(
    {
      onPress: onClick,
      elementType: "button",
    },
    ref
  );
  const btnProps = { ...buttonProps, ...rest };
  return (
    <StyledButton ref={ref} {...btnProps}>
      {children}
    </StyledButton>
  );
};
