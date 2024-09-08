export const API_BASE_URL = process.env.NEXT_PUBLIC_ADMIN_BASE_URL;

export const GET_ALL_INSTITUTES_URL = `${API_BASE_URL}/clinics/`;
export const GET_INSTITUTE_BY_ID_URL = `${API_BASE_URL}clinics/`;
export const CREATE_INSTITUTES_URL = `${API_BASE_URL}/clinics/`;

export const GET_ALL_USERS_URL = `${API_BASE_URL}/users/`;
export const GET_ALL_USERS_BY_TYPE_URL = `${API_BASE_URL}/users/by-type?type=patient`;
export const GET_USER_BY_ID_URL = `${API_BASE_URL}/users/`;

export const CREATE_PATIENT_URL = `${API_BASE_URL}/users/`;
