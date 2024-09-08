export interface PatientsAllProps {
  id: string;
  name: string;
  address: string;
  sex: string;
  age: Number;
  phone: string;
  email: string;
  userId: string;
  type: string;
}

export interface ModalInfoPatientProps {
  clickedRow?: PatientsAllProps;
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
  onAddRecord: () => void;
  setActiveHeading: (value: number) => void;
}

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
