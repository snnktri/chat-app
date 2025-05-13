export interface RegisterData {
  fullName: string;
  profile: File | null;
  email: string;
  password: string;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  profile: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ResponseData {
  statusCode: number;
  data: User;
  message: string;
  success: boolean;
}
