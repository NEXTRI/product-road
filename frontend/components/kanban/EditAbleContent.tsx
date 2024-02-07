import { cn } from "@/lib/utils";
import React from "react";

type EditAbleContent = {
  editMode: boolean;
  setEditMode: (val: boolean) => void;
  title: string;
  defaultTitle: string;
  style?: string;
  setTitle: (val: string) => void;
  elementType?: string;
};

const EditAbleContent = ({
  editMode,
  setEditMode,
  title,
  setTitle,
  defaultTitle,
  style,
  elementType = "p",
}: EditAbleContent) => {
  const renderElement = () => {
    return React.createElement(
      elementType,
      {
        className: cn(style, "w-full"),
        title,
        onClick: () => {
          setEditMode(true);
        },
      },
      title
    );
  };
  return (
    <>
      {editMode ? (
        <input
          type="text"
          autoFocus
          className={cn(style, "bg-transparent outline-none w-full")}
          value={title}
          onBlur={() => {
            if (title === "") setTitle(defaultTitle);
            setEditMode(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (title === "") setTitle(defaultTitle);
              setEditMode(false);
            }
          }}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      ) : (
        renderElement()
      )}
    </>
  );
};

export default EditAbleContent;
