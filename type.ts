export interface User {
  id: number;
  "full-name": string;
  username: string;
  "phone-number": string;
  password: string;
  role: string;
  imageUrl: string;
  email: string
}

export interface CourtGroup {
  id: number;
  name: string;
  address: string;
}

export type Court = {
  id: number;
  status: string;
  "courtGroupId": string;
};

export type BookingList = {
  id: number;
  date: string;
  "court-id": string;
  "from-time": string;
  "to-time": string;
  "customer-id": number;
  "created-date": string;
};

export interface Customer {
  id: number;
  "full-name": string;
  "phone-number": string;
}


/******** COLUMN TABLE ********/
export type UserColumn = {
  id: string;
  username: string;
  "full-name": string;
  role: string;
  image_url: string;
  email: string;
  password: string;
  status: string;
};

export type CourtGroupColumns = {
  id: number;
  name: string;
  address: string;
  // company: string;
};

export type CourtColumns = {
  id: number;
  status: string;
  "court-group-id": number;
  "court-group": CourtGroupColumns;
};

export type BookingListColumns = {
  id: number;
  date: string;
  "court-id": string;
  "from-time": string;
  "to-time": string;
  customer: Customer;
  "created-date": string;
};