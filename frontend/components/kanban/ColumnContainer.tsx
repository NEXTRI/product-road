"use client";

import {
  ColumnProps,
  FeedbackContentProps,
  FeedbackProps,
} from "@/types/kanban";
import { UniqueIdentifier } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FeedbackCard, NewFeedbackCard } from ".";
import { cn } from "@/lib/utils";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";

interface ColumnContainerProps {
  column: ColumnProps;
  feedbacks: FeedbackProps[];
  feedbacksId: UniqueIdentifier[];
  createFeedback: (
    columnId: UniqueIdentifier,
    feedbackValues: FeedbackContentProps
  ) => void;
  deleteFeedback: (id: UniqueIdentifier) => void;
  updateFeedback: (id: UniqueIdentifier, content: string) => void;
  isOverlay?: boolean;
}

const ColumnContainer = ({
  column,
  feedbacks,
  feedbacksId,
  createFeedback,
  deleteFeedback,
  updateFeedback,
  isOverlay = false,
}: ColumnContainerProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: { type: "column", column },
  });
  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };
  const searchParams = useSearchParams();
  const search = searchParams.getAll("search");
  const filtiredFeedbacks = useMemo(() => {
    if (search.length === 0) return feedbacks;
    return feedbacks.filter((feedback) =>
      search.every((tag) => feedback.content.tags.includes(tag))
    );
  }, [search]);
  if (isDragging)
    return (
      <div
        className="bg-background border-2 border-dashed border-foreground/40 rounded-lg min-w-[300px] max-w-[300px] h-[calc(100vh-400px)] min-h-[400px] opacity-40"
        ref={setNodeRef}
        style={style}
      />
    );

  return (
    <div
      className={cn(
        "min-w-[300px] max-w-[300px] min-h-[600px] flex flex-col gap-6",
        isOverlay && "bg-white px-4"
      )}
      ref={setNodeRef}
      style={style}
    >
      <div
        className="h-16 flex items-center justify-between gap-2 font-semibold border-b-2 flex-shrink-0"
        style={{ borderColor: column.color }}
        {...attributes}
        {...listeners}
      >
        <div className="flex gap-2 items-center">
          <div
            className={`h-2 w-2 rounded-full`}
            style={{ backgroundColor: column.color }}
          />
          <h3 className="flex-grow">
            {column.title + ` (${feedbacks.length})`}
          </h3>
        </div>
        <NewFeedbackCard column={column} createFeedback={createFeedback} />
      </div>

      <div className="flex flex-col gap-6">
        <SortableContext
          items={feedbacksId}
          strategy={verticalListSortingStrategy}
        >
          {filtiredFeedbacks.map((feedback) => (
            <FeedbackCard
              key={feedback.id}
              feedback={feedback}
              deleteFeedback={deleteFeedback}
              updateFeedback={updateFeedback}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default ColumnContainer;
