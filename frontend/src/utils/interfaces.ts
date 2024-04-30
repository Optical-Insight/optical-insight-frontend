export interface CommomBtnProps {
  label: string;
  onClick: () => void;
  isFullWidth?: boolean;
  width?: number;
  height: number;
}

export interface SidebarItemProps {
  iconSrc: string;
  label: string;
}
