export interface CommonBtnProps {
  label: string;
  onClick: () => void;
  type?: string;
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

export interface ModalInfoProps {
  title: string;
  id: string;
  location?: string;
  phone?: string;
  email?: string;
  website?: string;
  confirmLabel?: string;
  canselLabel?: string;
  deleteLabel?: string;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
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

export interface StepProps {
  number: number;
  title: string;
  active: boolean;
  lineActive?: boolean;
}

export interface FormFieldProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange: (value: string) => void;
}

export interface ListAllProps {
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
