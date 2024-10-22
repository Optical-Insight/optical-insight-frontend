export interface BranchRegistrationProps {
  activeStep: number;
  setActiveStep: (value: number) => void;
  setActiveHeading?: (value: number) => void;
  clickedRow?: any;
}

export interface BranchAllRowProps {
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

export interface ModalInfoBranchProps {
  updateLabel?: string;
  canselLabel?: string;
  deleteLabel?: string;
  clickedRow?: any;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export interface ListAllBranchProps {
  setActiveHeading: (value: number) => void;
  clickedRow: any;
  setClickedRow: (value: any) => void;
}
