export interface CommonBtnProps {
  label: string;
  onClick: () => void;
  // isFullWidth?: boolean;
  // width?: number;
  // height: number;
}

export interface SidebarItemProps {
  iconSrc: string;
  iconSrcActive: string;
  label: string;
  isActive?: boolean;
  handleTabChange: (tab: string) => void;
}

export interface ModalConfirmProps {
  title: string;
  message: string;
  confirmLabel: string;
  canselLabel?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface ModalConfirmTextInputProps {
  title: string;
  message: string;
  confirmLabel: string;
  canselLabel?: string;
  inputPlaceholder?: string;
  isCompleted?: boolean;
  titleCompleted?: string;
  messageCompleted?: string;
  confirmLabelCompleted?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (inputText: string) => void;
}

export interface SearchFilterProps {
  labelSearch: string;
  labelSelectOne: string;
  labelSelectTwo: string;
  placeholderSearch: string;
  optionsSelectOne: { value: string; label: string }[];
  optionsSelectTwo: { value: string; label: string }[];
  onSearch: (value: string) => void;
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

// Patients Page
export interface PatientListAllProps {
  setActiveHeading: (value: number) => void;
  handleBreadcrumbClick: (value: number) => void;
}

export interface PatientNewTestDataProps {
  activeStep: number;
  setActiveStep: (value: number) => void;
  handleBreadcrumbClick: (value: number) => void;
}

export interface PatientProfileIconTextProps {
  src: string;
  alt: string;
  text: string;
}
export interface PatientProfileCardTextProps {
  src: string;
  alt: string;
  text: string;
  value: string;
}
