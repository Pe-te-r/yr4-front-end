// types.ts
export interface UserRegistrationData {
  firstname: string;
  id_number: string;
  contact: string;
  email: string;
  idType: "Kenyan Citizen" | "Refugee" | "Foreign Citizen" | "Mandate" | "";
}

export interface ApiResponse {
  status: string;
  message: string;
  data?: UserRegistrationData;
}