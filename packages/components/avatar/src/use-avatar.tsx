"use client";

import React, {
  type ElementType,
  type ImgHTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Slot, type SlotProps } from "@radix-ui/react-slot";
import type { AvatarVariantProps } from "styled-system/recipes";

interface Props {
  /**
   * Determines whether the component should be rendered as a child element.
   */
  asChild?: boolean;
  /**
   * Ref to the DOM node for the avatar's root element.
   */
  ref?: React.Ref<HTMLSpanElement | null>;
  /**
   * Ref to the DOM node for the image element.
   */
  imgRef?: React.Ref<HTMLImageElement>;
  /**
   * The name to display as initials when the image is not available.
   * Example: "John Doe"
   */
  name?: string;
  /**
   * An optional icon to display in the avatar.
   * Example: <Icon name="user" />
   */
  icon?: React.ReactNode;
  /**
   * Whether the avatar can be focused via keyboard navigation.
   * Default is false.
   */
  isFocusable?: boolean;
  /**
   * If true, the fallback logic will be skipped.
   * Default is false.
   */
  ignoreFallback?: boolean;
  /**
   * If false, the avatar will show the background color while loading.
   * Default is true.
   */
  showFallback?: boolean;
  /**
   * Function to get the initials to display in the avatar.
   * Example: (name) => name.split(' ').map(n => n[0]).join('')
   */
  getInitials?: (name: string) => string;
  /**
   * Custom fallback component to display when the image is not available.
   * Example: <span>Fallback</span>
   */
  fallback?: React.ReactNode;
  /**
   * Function called when the image fails to load.
   */
  onError?: () => void;
  /**
   * The component used to render the image.
   * Default is "img".
   */
  ImgComponent?: ElementType;
  /**
   * Props to pass to the image component.
   */
  imgProps?: ImgHTMLAttributes<HTMLImageElement>;
  size?: AvatarVariantProps["size"];
}

type ComponentType =
  | ElementType
  | React.ForwardRefExoticComponent<SlotProps & React.RefAttributes<unknown>>;

export const useAvatar = (props: Props) => {
  const {
    asChild,
    ref,
    imgRef,
    name,
    icon,
    isFocusable = false,
    ignoreFallback = false,
    showFallback: showFallbackProp = true,
    getInitials,
    fallback,
    onError,
    ImgComponent,
    imgProps,
    size,
    ...rest
  } = props;

  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (src) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsImgLoaded(true);
      img.onerror = () => {
        setIsImgLoaded(false);
        if (onError) {
          onError();
        }
      };
    }
  }, [src, onError]);

  const showFallback = useMemo(() => {
    return (!src || !isImgLoaded) && showFallbackProp;
  }, [src, isImgLoaded, showFallbackProp, ignoreFallback]);

  const initials = useMemo(() => {
    if (getInitials) {
      return getInitials(name || "");
    }

    if (name) {
      return name
        .split(" ")
        .map((w) => w[0])
        .join("");
    }

    return null;
  }, [name, getInitials]);

  const tabIndex = useMemo(() => (isFocusable ? 0 : -1), [isFocusable]);

  const Component: ComponentType = useMemo(() => {
    return asChild ? Slot : "div";
  }, [asChild]);

  return {
    Component,
    isImgLoaded,
    showFallback,
    initials,
    tabIndex,
    fallback,
    setSrc,
    size,
  };
};

export type UseAvatarReturn = ReturnType<typeof useAvatar>;
