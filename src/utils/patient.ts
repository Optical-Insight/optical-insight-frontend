export interface PatientsAllProps {
  id: string;
  name: string;
  address: string;
  sex: string;
  age?: Number;
  dateOfBirth: string;
  phone: string;
  email: string;
  userId: string;
  type: string;
  height?: string;
  weight?: string;
  occupation?: string;
  emergencyPhone?: string;
  generalMedicalHistory?: string;
  familyHistoryOfEyeConditions?: string;
  pastEyeProblemsOrSurgeries?: string;
  currentMedications?: string;
  historyOfSmokingAndAlcoholConsumption?: string;
  visionProblems?: string;
  eyeDiscomfort?: string;
  glassesOrContactLenseUsage?: string;
}

export interface ListAllPatientProps {
  setActiveHeading: (value: number) => void;
  isInfoModalOpen?: boolean;
  setIsInfoModalOpen?: (value: boolean) => void;
  clickedRow?: PatientsAllProps;
  setClickedRow?: (value: PatientsAllProps) => void;
}

export interface PatientRecordProps {
  activeStep: number;
  setActiveStep: (value: number) => void;
  setActiveHeading?: (value: number) => void;
  patientData?: PatientsAllProps;
}

export interface ModalInfoPatientProps {
  clickedRow?: any;
  title?: string;
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

export interface PatientRecordAllRowProps {
  reportId: string;
  createdBy: string;
  status: string;
  createdAt: string;
  updatedAt: string;
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
