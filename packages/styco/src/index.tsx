"use client";

import React, { ForwardedRef, createContext, useContext } from "react";
import {
  RecipeSelection,
  SlotRecipeConfig,
  SlotRecipeRuntimeFn,
} from "../styled-system/types/recipe";
import { SystemStyleObject } from "../styled-system/types";

type StyleContextValue = Record<string, string | undefined> | null;
type ComponentProps = Record<string, unknown> | undefined;

export const createStyleContext = <
  S extends string,
  T extends Record<any, Record<any, Partial<Record<S, SystemStyleObject>>>>,
  U extends {
    splitVariantProps: Function;
    variantKeys: any[];
    variantMap: any;
  }
>(
  recipe: SlotRecipeRuntimeFn<S, T> | SlotRecipeConfig<S, T> | U
) => {
  type Slots = S;

  const StyleContext = createContext<StyleContextValue>(null);

  const withProvider = <P extends ComponentProps>(
    Component: React.ComponentType<P> | string,
    part?: Slots,
    defaultProps?: Partial<P> & { className?: string }
  ) => {
    const Comp = React.forwardRef((props: P, ref: ForwardedRef<any>) => {
      let styles: Partial<Record<string, string>> = {};
      let rest: P = {} as P;

      if ("splitVariantProps" in recipe) {
        const [variantProps, restProps] = recipe.splitVariantProps(
          props as unknown as RecipeSelection<T>
        );

        if (typeof recipe === "function") {
          styles = recipe(variantProps);
        }

        rest = restProps as P;
      } else if ("base" in recipe) {
        styles = recipe.base as unknown as Partial<Record<string, string>>;
      }

      const filteredStyles = Object.fromEntries(
        Object.entries(styles).filter(([_, value]) => value !== undefined)
      ) as Record<string, string>;

      return (
        <StyleContext.Provider value={filteredStyles}>
          <Component
            ref={ref}
            {...defaultProps}
            className={styles[part ?? ""]}
            {...rest}
          />
        </StyleContext.Provider>
      );
    });

    return Comp;
  };

  const withContext = <P extends ComponentProps>(
    Component: React.ComponentType<P> | string,
    part?: Slots,
    defaultProps?: Partial<P> & { className?: string }
  ) => {
    const Comp = React.forwardRef((props: P, ref: ForwardedRef<any>) => {
      const styles = useContext(StyleContext);
      return (
        <Component
          ref={ref}
          {...defaultProps}
          className={styles?.[part ?? ""]}
          {...props}
        />
      );
    });
    return Comp;
  };

  return {
    withProvider,
    withContext,
  };
};
