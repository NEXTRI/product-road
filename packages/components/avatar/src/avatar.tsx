"use client";

import React, { ReactNode, FC, useEffect } from "react";
import { useAvatar } from "./use-avatar";
import { avatar, type AvatarVariantProps } from "styled-system/recipes";
import { AvatarContext, useAvatarContext } from "./avatar-context";

interface AvatarRootProps extends AvatarVariantProps {
  children?: ReactNode;
}

export const Avatar: FC<AvatarRootProps> = ({
  children,
  isBordered,
  radius,
  ...props
}) => {
  const avatarState = useAvatar(props);

  return (
    <AvatarContext.Provider value={avatarState}>
      <avatarState.Component
        className={avatar({ size: avatarState.size, isBordered, radius }).root}
        tabIndex={avatarState.tabIndex}
      >
        {children}
      </avatarState.Component>
    </AvatarContext.Provider>
  );
};

type AvatarImageProps = {
  /**
   * The image URL for the avatar.
   * Example: "https://example.com/avatar.jpg"
   */
  src?: string;
  /**
   * Alt text for the image.
   * Example: "User Avatar"
   */
  alt?: string;
};

export const AvatarImage: FC<AvatarImageProps> = ({ src, alt }) => {
  const { isImgLoaded, showFallback, setSrc } = useAvatarContext();

  useEffect(() => {
    setSrc(src);
  }, [src]);
  return isImgLoaded && !showFallback ? (
    <img className={avatar().image} src={src} alt={alt} />
  ) : null;
};

type AvatarFallbackProps = {
  children: ReactNode;
};

export const AvatarFallback: FC<AvatarFallbackProps> = ({ children }) => {
  const { showFallback, size } = useAvatarContext();
  return showFallback ? (
    <span className={avatar({ size }).fallback}>{children}</span>
  ) : null;
};
