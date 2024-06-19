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
export interface CourtGroup {
  id: number;
  name: string;
  address: string;
  rate: number;
  fromDay: Date;
  toDay: Date;
  startTime: Date;
  endTime: Date;
  profileImage: string;
  coverImage: string;
  createdDate: Date;
  createdBy: number;
  modifiedDate: Date;
  modifiedBy: number;
  CompanyId: number;
}
