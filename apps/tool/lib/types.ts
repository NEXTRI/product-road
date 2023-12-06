export type sideBarSection = {
  title: string;
  elements: Array<sideBarItem>;
};

export type sideBarItem = {
  id: string;
  name: string;
  color?: string;
  number?: number;
};
