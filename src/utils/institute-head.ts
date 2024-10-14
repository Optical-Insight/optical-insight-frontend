export interface ModalInfoInstituteHeadProps {
  updateLabel?: string;
  canselLabel?: string;
  deleteLabel?: string;
  clickedRow?: any;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export interface InstituteHeadRegistrationProps {
  activeStep: number;
  setActiveStep: (value: number) => void;
  setActiveHeading?: (value: number) => void;
}
