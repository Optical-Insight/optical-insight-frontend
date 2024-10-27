export const API_BASE_URL = process.env.NEXT_PUBLIC_ADMIN_BASE_URL;
export const API_REPORT_URL = process.env.NEXT_PUBLIC_REPORT_URL;

export const GET_ALL_INSTITUTES_URL = `${API_BASE_URL}/clinics/`;
export const GET_INSTITUTE_BY_ID_URL = `${API_BASE_URL}clinics/`;
export const CREATE_INSTITUTES_URL = `${API_BASE_URL}/clinics/`;

export const GET_ALL_USERS_URL = `${API_BASE_URL}/users/`;
export const GET_ALL_USERS_BY_TYPE_URL = `${API_BASE_URL}/users/by-type?type=patient`;
export const GET_USER_BY_ID_URL = `${API_BASE_URL}/users/`;
export const UPDATE_USER_BY_ID_URL = `${API_BASE_URL}/users/`;
export const DELETE_USER_BY_ID_URL = `${API_BASE_URL}/users/`;

export const CREATE_PATIENT_URL = `${API_BASE_URL}/users/`;
export const CREATE_DOCTOR_URL = `${API_BASE_URL}/users/`;

export const GET_ALL_REPORTS = `${API_BASE_URL}/reports/`;
export const CREATE_TEST_REPORT = `${API_REPORT_URL}/reports/`;
export const GENERATE_REPORT_PDF = `${API_REPORT_URL}/reports/generatePdf/`;

//export const GET_ALL_REPORTS = `${API_BASE_URL}/appointments/`;
