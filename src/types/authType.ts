// types.ts
export interface LoginData {
  email: string;
  id_number: string;
  otp: string;
}


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

export interface ErrorType{
  status:string
  data:{
    message:string
    error?:string

  }
}