export {};

declare global {
  interface NavMenuItem {
    id: number;
    label: string;
    url: string;
    iconName?: React.ComponentType;
  }
  enum FeedbackStatus {
    Open = "open",
    UnderConsideration = "under_consideration",
    Planned = "planned",
    InProgress = "in_progress",
    Shipped = "shipped",
    Rejected = "rejected",
  }

  enum FeedbackCategory {
    Bug = "bug",
    Question = "question",
    Idea = "idea",
    Enhancement = "enhancement",
    Other = "other",
  }

  interface Feedback {
    id: string;
    project_id: number;
    user_id?: number | null;
    external_user_id?: number | null;
    title: string;
    description: string;
    category: FeedbackCategory;
    status: FeedbackStatus;
    votes: number;
    created_at: string;
    updated_at: string;
  }
}

// later on add type for Project...
