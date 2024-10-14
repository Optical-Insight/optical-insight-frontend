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
