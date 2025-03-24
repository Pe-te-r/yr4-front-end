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

interface LoginDataRes{
  token:string,
  id:string,
  role:string
}

export interface ApiResponse {
  status: string;
  message: string;
  data?: LoginDataRes;
}

export interface ErrorType{
  status:string
  data:{
    message:string
    error?:string

  }
}