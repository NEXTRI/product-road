"use client";

import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { chip, icon } from "styled-system/recipes";
import { cx, css } from "styled-system/css";
import type { PressEvent } from "@react-types/shared";
import React, { ReactElement, useRef } from "react";
import { useButton } from "@react-aria/button";
import { XCircle } from "lucide-react";

export const StyledChip = styled("div", chip);

export type ChipProps = HTMLStyledProps<typeof StyledChip> & {
  onClose?: (e: PressEvent) => void;
  closeIcon?: ReactElement;
};

export const Chip: React.FC<ChipProps> = ({
  onClose,
  closeIcon,
  children,
  ...rest
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const { buttonProps } = useButton(
    {
      onPress: onClose,
      elementType: "span",
    },
    ref
  );

  const CloseIcon = closeIcon || <XCircle className={cx(icon({}))} />;

  return (
    <StyledChip {...rest}>
      {children}
      {onClose && (
        <span
          className={css({ _hover: { cursor: "pointer" } })}
          {...buttonProps}
          ref={ref}
        >
          {CloseIcon}
        </span>
      )}
    </StyledChip>
  );
};
