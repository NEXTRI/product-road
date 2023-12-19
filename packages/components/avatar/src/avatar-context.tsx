import { createContext, useContext } from "react";
import { UseAvatarReturn } from "./use-avatar";

export const AvatarContext = createContext<UseAvatarReturn | undefined>(
  undefined
);

export const useAvatarContext = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error(
      "useAvatarContext must be used within an AvatarContext.Provider"
    );
  }
  return context;
};
