export interface CommomBtnProps {
  label: string;
  onClick: () => void;
  isFullWidth?: boolean;
  width?: number;
  height: number;
}

export interface SidebarItemProps {
  iconSrc: string;
  iconSrcActive: string;
  label: string;
  isActive?: boolean;
  handleTabChange: (tab: string) => void;
}

export interface StepProps {
  number: number;
  title: string;
  active: boolean;
  lineActive?: boolean;
}

export interface FormFieldProps {
  label: string;
  placeholder: string;
}
