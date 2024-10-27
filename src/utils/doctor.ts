export interface DoctorsAllProps {
  id: string;
  name: string;
  email: string;
  userId: string;
  type: string;
}

export interface DoctorRegistrationProps {
  activeStep: number;
  clickedRow?: any;
  setActiveStep: (value: number) => void;
  setActiveHeading?: (value: number) => void;
}

export interface ModalInfoDoctorProps {
  updateLabel?: string;
  canselLabel?: string;
  deleteLabel?: string;
  clickedRow: any;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}
