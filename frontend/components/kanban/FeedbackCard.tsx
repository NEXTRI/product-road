"use client";

import { CATEGORIES } from "@/data/kanban";
import { cn } from "@/lib/utils";
import { FeedbackProps } from "@/types/kanban";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CalendarDays, Heart, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface FeedbackCardProps {
  feedback: FeedbackProps;
  deleteFeedback: (id: UniqueIdentifier) => void;
  updateFeedback: (id: UniqueIdentifier, content: string) => void;
}

const renderParagraph = (text: string) => {
  const formattedText = text.replace(/\n/g, "<br>");
  return (
    <p
      className="line-clamp-3"
      title={text}
      dangerouslySetInnerHTML={{ __html: formattedText }}
    />
  );
};

const FeedbackCard = ({
  feedback,
  deleteFeedback,
  updateFeedback,
}: FeedbackCardProps) => {
  const [isHover, setIsHover] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: feedback.id,
    data: { type: "feedback", feedback },
  });
  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      className={cn(
        "bg-white rounded-lg p-4",
        isDragging && "opacity-40 border-2 border-dashed border-foreground/40"
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => {
        setIsHover(false);
      }}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className={cn("space-y-4", isDragging && "invisible")}>
        <div className="space-y-3">
          {renderParagraph(feedback.content.content)}
          <ul className="text-sm flex gap-1.5 flex-wrap">
            {CATEGORIES.filter((category) =>
              feedback.content.tags.includes(category.id)
            ).map((tag, index) => (
              <li key={index}>
                <p
                  className={
                    "text-xs font-medium text-white leading-none p-2 h-full rounded-lg flex items-center justify-between"
                  }
                  style={{ backgroundColor: tag.color }}
                >
                  {`# ${tag.label}`}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t pt-4 flex justify-between items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <CalendarDays size={18} style={{ paddingBottom: 2 }} />
            <span>{feedback.content.timeStamp}</span>
          </div>

          <div className="flex items-center gap-1">
            <Heart size={18} />
            <span>{feedback.content.upvotes}</span>
          </div>
        </div>
        {/* <div className="w-5 flex-shrink-0">
        <button
          className={cn(
            "hover:text-destructive transition-colors hidden",
            isHover && "block"
          )}
          onClick={() => deleteFeedback(feedback.id)}
        >
          <Trash size={20} />
        </button>
      </div> */}
      </div>
    </div>
  );
};

export default FeedbackCard;
