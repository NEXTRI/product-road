"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { ColumnProps, FeedbackContentProps } from "@/types/kanban";
import { CATEGORIES } from "@/data/kanban";
import { cn } from "@/lib/utils";
import { UniqueIdentifier } from "@dnd-kit/core";
import { feedbackContentReg } from "@/lib/regEx";

type NewFeedbackCardProps = {
  column: ColumnProps;
  createFeedback: (
    columnId: UniqueIdentifier,
    feedbackValues: FeedbackContentProps
  ) => void;
};

const contentErrorMsg = "Content must be between 5-200 characters";
const tagsErrorMsg = "Selected Tags must be between 1-3";

const defaultFeedbackValues = {
  content: "",
  tags: [],
  timeStamp: new Date().toISOString().slice(0, 10),
  upvotes: 1,
};
const defaultErrors = {
  content: "",
  tags: "",
};

const NewFeedbackCard = ({ column, createFeedback }: NewFeedbackCardProps) => {
  const [newFeedbackValues, setNewFeedbackValues] =
    useState<FeedbackContentProps>(defaultFeedbackValues);
  const [errors, setErrors] = useState<{ content: string; tags: string }>(
    defaultErrors
  );
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) {
          setNewFeedbackValues(defaultFeedbackValues);
          setErrors({ content: "", tags: "" });
        }
        setIsOpen(open);
      }}
      open={isOpen}
    >
      <DialogTrigger asChild>
        <Button
          className="rounded-full w-7 h-7 p-0"
          style={{ backgroundColor: column.color }}
        >
          <Plus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-6">
        <DialogHeader>
          <DialogTitle>Add new Feedback</DialogTitle>
          <DialogDescription>
            Ensure that content is within the range of 5 to 200 characters and
            that at least one tag is selected.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="items-center space-y-2">
            <Label htmlFor="content" className="text-right">
              Content
            </Label>
            <Textarea
              id="content"
              className="resize-none"
              value={newFeedbackValues.content}
              onChange={(e) => {
                setNewFeedbackValues((prev) => ({
                  ...prev,
                  content: e.target.value,
                }));
                setErrors((prev) => ({
                  ...prev,
                  content: !feedbackContentReg.test(e.target.value)
                    ? contentErrorMsg
                    : "",
                }));
              }}
            />
            {errors.content && (
              <p
                className="text-destructive font-semibold text-sm"
                style={{ marginTop: 12 }}
              >
                {errors.content}
              </p>
            )}
          </div>
          <ul className="text-sm flex gap-2 flex-wrap">
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <label
                  className={cn(
                    "text-sm font-medium leading-none p-2 rounded-lg flex gap-2 items-center justify-between text-white opacity-60",
                    newFeedbackValues.tags.includes(category.id) &&
                      "opacity-100"
                  )}
                  style={{ backgroundColor: category.color }}
                  onClick={() => {
                    if (
                      newFeedbackValues.tags.length >= 3 &&
                      !newFeedbackValues.tags.includes(category.id)
                    )
                      setErrors((prev) => ({ ...prev, tags: tagsErrorMsg }));
                  }}
                >
                  {`# ${category.label}`}
                  <Checkbox
                    className="hidden"
                    value={newFeedbackValues.tags}
                    disabled={
                      newFeedbackValues.tags.length >= 3 &&
                      !newFeedbackValues.tags.includes(category.id)
                    }
                    onCheckedChange={(checked) => {
                      const newValues = checked
                        ? [...newFeedbackValues.tags, category.id]
                        : newFeedbackValues.tags.filter(
                            (selectedTag) => selectedTag !== category.id
                          );
                      setNewFeedbackValues((prev) => ({
                        ...prev,
                        tags: newValues,
                      }));
                      setErrors((prev) => ({ ...prev, tags: "" }));
                    }}
                  />
                </label>
              </li>
            ))}
          </ul>
          {errors.tags && (
            <p
              className="text-destructive font-semibold text-sm"
              style={{ marginTop: 12 }}
            >
              {errors.tags}
            </p>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              if (
                !feedbackContentReg.test(newFeedbackValues.content) ||
                newFeedbackValues.tags.length < 1 ||
                newFeedbackValues.tags.length > 3
              ) {
                if (!feedbackContentReg.test(newFeedbackValues.content))
                  setErrors((prev) => ({ ...prev, content: contentErrorMsg }));
                if (
                  newFeedbackValues.tags.length < 1 ||
                  newFeedbackValues.tags.length > 3
                )
                  setErrors((prev) => ({ ...prev, tags: tagsErrorMsg }));
                return;
              }
              createFeedback(column.id, newFeedbackValues);
              setIsOpen(false);
            }}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewFeedbackCard;
