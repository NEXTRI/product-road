"use client";

import {
  ColumnProps,
  FeedbackContentProps,
  FeedbackProps,
} from "@/types/kanban";
import React, { useMemo, useState } from "react";
import { ColumnContainer } from ".";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import FeedbackCard from "./FeedbackCard";
import { COLUMNS } from "@/data/kanban";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<ColumnProps[]>(COLUMNS);
  const [feedbacks, setFeedbacks] = useState<FeedbackProps[]>([]);
  const columnsId: UniqueIdentifier[] = useMemo(
    () => columns.map((col) => col.id),
    [columns]
  );
  const feedbacksId: UniqueIdentifier[] = useMemo(
    () => feedbacks.map((feedback) => feedback.id),
    [feedbacks]
  );
  const [activeColumn, setActiveColumn] = useState<ColumnProps | null>(null);
  const [activeFeedback, setActiveFeedback] = useState<FeedbackProps | null>(
    null
  );
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    })
  );
  const createFeedback = (
    columnId: UniqueIdentifier,
    feedbackValues: FeedbackContentProps
  ) => {
    const id: UniqueIdentifier =
      feedbacks.length < 1
        ? 1
        : +(
            feedbacks.reduce((acc, curr) =>
              +(acc.id as string).slice(1) < +(curr.id as string).slice(1)
                ? curr
                : acc
            ).id as string
          ).slice(1) + 1;
    setFeedbacks((prev) => [
      ...prev,
      { id: `t${id}`, columnId: columnId, content: feedbackValues },
    ]);
  };
  const deleteFeedback = (id: UniqueIdentifier) => {
    setFeedbacks((prev) => prev.filter((feedback) => feedback.id !== id));
  };
  const updateFeedback = (id: UniqueIdentifier, content: string) => {
    // setFeedbacks((prev) =>
    //   prev.map((feedback) => (feedback.id !== id ? feedback : { ...feedback, content }))
    // );
  };
  const onDrageStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "feedback") {
      setActiveFeedback(event.active.data.current.feedback);
      return;
    }
  };
  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveFeedback(null);
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    const isActiveFeedback = active.data.current?.type === "feedback";
    if (activeId === overId || isActiveFeedback) return;
    setColumns((prev) => {
      const activeColIndex = prev.findIndex((col) => col.id === activeId);
      const overColIndex = prev.findIndex((col) => col.id === overId);
      return arrayMove(prev, activeColIndex, overColIndex);
    });
  };
  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isActiveFeedback = active.data.current?.type === "feedback";
    const isOverFeedback = over.data.current?.type === "feedback";

    if (!isActiveFeedback) return;
    if (isActiveFeedback && isOverFeedback) {
      setFeedbacks((prev) => {
        const activeFeedbackIndex = prev.findIndex(
          (feedback) => feedback.id === activeId
        );
        const overFeedbackIndex = prev.findIndex(
          (feedback) => feedback.id === overId
        );
        feedbacks[activeFeedbackIndex].columnId =
          feedbacks[overFeedbackIndex].columnId;
        return arrayMove(feedbacks, activeFeedbackIndex, overFeedbackIndex);
      });
    }
    const isOverColumn = over.data.current?.type === "column";
    if (isActiveFeedback && isOverColumn) {
      setFeedbacks((prev) => {
        const activeFeedbackIndex = prev.findIndex(
          (feedback) => feedback.id === activeId
        );
        feedbacks[activeFeedbackIndex].columnId = overId;
        return arrayMove(feedbacks, activeFeedbackIndex, activeFeedbackIndex);
      });
    }
  };
  return (
    <div className="flex gap-6">
      <DndContext
        sensors={sensors}
        onDragStart={onDrageStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <SortableContext
          items={columnsId}
          strategy={horizontalListSortingStrategy}
        >
          {columns.map((column) => (
            <ColumnContainer
              feedbacks={feedbacks.filter(
                (feedbacks) => feedbacks.columnId === column.id
              )}
              key={column.id}
              column={column}
              feedbacksId={feedbacksId}
              createFeedback={createFeedback}
              deleteFeedback={deleteFeedback}
              updateFeedback={updateFeedback}
            />
          ))}
        </SortableContext>

        <DragOverlay>
          {activeColumn && (
            <ColumnContainer
              column={activeColumn}
              feedbacks={feedbacks.filter(
                (feedbacks) => feedbacks.columnId === activeColumn.id
              )}
              feedbacksId={feedbacksId}
              createFeedback={createFeedback}
              deleteFeedback={deleteFeedback}
              updateFeedback={updateFeedback}
              isOverlay={true}
            />
          )}
          {activeFeedback && (
            <FeedbackCard
              feedback={activeFeedback}
              deleteFeedback={deleteFeedback}
              updateFeedback={updateFeedback}
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
