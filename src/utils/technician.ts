export interface TechniciansAllProps {
  id: string;
  name: string;
  email: string;
  userId: string;
  type: string;
}

export interface ModalInfoLabTechnicianProps {
  updateLabel?: string;
  canselLabel?: string;
  deleteLabel?: string;
  clickedRow?: any;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export interface TechnicianRegistrationProps {
  activeStep: number;
  setActiveStep: (value: number) => void;
  setActiveHeading?: (value: number) => void;
  clickedRow?: any;
  setClickedRow?: (value: any) => void;
}
