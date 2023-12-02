export type sideBarSection = {
  title: string;
  elements: Array<sideBarItem>;
};

export type sideBarItem = {
  name: string;
  color?: string;
  number?: number;
};
