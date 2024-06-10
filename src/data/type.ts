export interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  createdDate: Date;
  createdBy: number;
  modifiedDate: Date;
  modifiedBy: number;
}
