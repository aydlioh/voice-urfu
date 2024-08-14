import { IconType } from "react-icons";

export type SidebarLink = {
  label: string;
  path: string;
  otherPath?: string;
  icon: IconType;
};
