export interface BranchRegistrationProps {
  activeStep: number;
  setActiveStep: (value: number) => void;
  setActiveHeading?: (value: number) => void;
  clickedRow?: any;
}

export interface BranchAllRowProps {
  id: string;
  clinicId: string;
  branchId: string;
  numberOfLabTechnicians: number;
  numberOfPatients: number;
  specialServices: string;
  comments: string;
  name: string;
  location: string;
  phone: string;
}

export interface BranchProps {
  branchID: string;
  location: string;
  phone: string;
  numberOfPatients: number;
  numberOfLabTechnicians: number;
  specialServices: string;
  comments: string;
}

export interface BranchInstitute {
  clinicID: string;
  name: string;
  branches: BranchProps[];
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
