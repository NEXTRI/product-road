export {};

declare global {
  interface NavMenuItem {
    id: number;
    label: string;
    url: string;
    iconName?: React.ComponentType;
  }
}

// later on add type for Project, Feedback...
