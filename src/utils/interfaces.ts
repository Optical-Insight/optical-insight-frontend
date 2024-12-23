// Define the shape of your authentication context
export interface AuthContextProps {
  isAuthenticated: boolean;
  storedAuthData: AuthData;
  login: (response: AuthData) => void;
  logout: () => void;
  userData?: UserDataProps;
}

export interface UserDataProps {
  email: string;
  name: string;
  password: string;
  type: string;
  userId: string;
  branchId: string;
  clinicId: string;
}

export interface AuthData {
  accessToken: string;
  refreshToken: string;
  userType: string;
  userId: string;
  branchId?: string;
}

export interface CommonBtnProps {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: string;
  isLoading?: boolean;
  isBtnDisabled?: boolean;
  // isFullWidth?: boolean;
  // width?: number;
  // height: number;
}

export interface SidebarItemProps {
  iconSrc: string;
  iconSrcActive: string;
  label: string;
  isActive?: boolean;
  isShrunk?: boolean;
  handleTabChange: (tab: string) => void;
}

export interface ModalConfirmProps {
  title: string;
  message: string;
  confirmLabel: string;
  canselLabel?: string;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface ModalErrorProps {
  title: string;
  message: string;
  buttonLabel?: string;

  isOpen: boolean;
  onClose: () => void;
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

export interface ModalInfoInstituteHeadProps {
  id: string;
  location?: string;
  phone?: string;
  email?: string;
  website?: string;
  updateLabel?: string;
  canselLabel?: string;
  deleteLabel?: string;
  clickedRow?: any;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export interface SearchFilterProps {
  labelSearch: string;
  labelSelectOne?: string;
  labelSelectTwo?: string;
  placeholderSearch: string;
  optionsSelectOne?: { value: string; label: string }[];
  optionsSelectTwo?: { value: string; label: string }[];
  onSearch?: any;
  // onSearch?: (value: string) => void;
}

export interface SearchFilterReportProps {
  labelSearch?: string;
  labelSelectOne: string;
  labelSelectTwo?: string;
  placeholderSearch?: string;
  optionsSelectOne: { value: string; label: string }[];
  optionsSelectTwo?: { value: string; label: string }[];
  onSearch?: (value: string) => void;
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
  placeholder?: string;
  required?: boolean;
  value?: any;
  readOnly?: boolean;
  onChange: (value: string) => void;
  type?: string;
  hasError?: boolean;
}

export interface InstituteRegistrationProps {
  activeStep: number;
  setActiveStep: (value: number) => void;
  setActiveHeading?: (value: number) => void;
  clickedRow?: InstituteAllRowProps;
}

export interface ListAllProps {
  setActiveHeading: (value: number) => void;
}

export interface InstituteAllRowProps {
  id: string;
  clinicId: string;
  name: string;
  location: string;
  status?: string;
  phone?: string;
  email?: string;
  website?: string;
  action?: string;
}

// export interface PatientsAllProps {
//   id: string;
//   name: string;
//   address: string;
//   sex: string;
//   age?: Number;
//   dateOfBirth: string;
//   phone: string;
//   email: string;
//   userId: string;
//   type: string;
// }

// export interface ListAllPatientProps {
//   setActiveHeading: (value: number) => void;
//   isInfoModalOpen?: boolean;
//   setIsInfoModalOpen?: (value: boolean) => void;
//   clickedRow?: PatientsAllProps;
//   setClickedRow?: (value: PatientsAllProps) => void;
// }

// export interface PatientRecordProps {
//   activeStep: number;
//   setActiveStep: (value: number) => void;
//   setActiveHeading?: (value: number) => void;
//   patientData?: PatientsAllProps;
// }

export interface DoctorsAllProps {
  id: string;
  name: string;
  email: string;
  userId: string;
  type: string;
  rating: string;
  specialization: string;
}

export interface TechniciansAllProps {
  id: string;
  name: string;
  email: string;
  userId: string;
  type: string;
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

//reports
export interface ReportListAllProps {
  reportId: string;
  name: string;
  createdBy: string;
  patientId: string;
  status: string;
  leftEyeImageUrl: string;
  rightEyeImageUrl: string;
}
