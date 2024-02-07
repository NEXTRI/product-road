import { UniqueIdentifier } from "@dnd-kit/core";

export interface ColumnProps {
  id: UniqueIdentifier;
  title: string;
  color: string;
}
export interface FeedbackContentProps {
  content: string;
  tags: string[];
  timeStamp: string;
  upvotes: number;
}
export interface FeedbackProps {
  id: UniqueIdentifier;
  columnId: UniqueIdentifier;
  content: FeedbackContentProps;
}
export interface CategoryProps {
  id: string;
  label: string;
  color: string;
}
