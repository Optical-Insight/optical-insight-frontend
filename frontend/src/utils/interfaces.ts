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

// Institute Page
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

export interface InstituteRegistrationProps {
  activeStep: number;
  setActiveStep: (value: number) => void;
}
export interface InstituteListAllProps {
  setActiveHeading: (value: number) => void;
}

export interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

// Dashboard Page

export interface HomeCardProps {
  iconSrc: string;
  title: string;
  count: number;
  percentage: number;
}
