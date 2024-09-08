export interface InstituteRegistrationProps {
  activeStep: number;
  setActiveStep: (value: number) => void;
  setActiveHeading?: (value: number) => void;
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
