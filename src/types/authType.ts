// types.ts
export interface LoginData {
  email: string;
  id_number: string;
  otp: string;
}


export interface AiData{
  user_id?:string
  query:string
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

export interface UserResponse{
  status:string
  message:string
  data:user
}

export interface UsersResponse{
  status:string
  message:string
  data:user[]
}

interface user{
  id:string;
  email:string;
  contact:string;
  id_type:string;
  id_number:string;
  fistname:string;
}