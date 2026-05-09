export enum UserRole {
  ADMIN = "ADMIN", // مدیریت کل
  CENTER_OWNER = "CENTER_OWNER", // مدیر مرکز
  CENTER_OPERATOR = "CENTER_OPERATOR", // اپراتور مرکز
  VERIFIED_USER = "VERIFIED_USER", // کاربر تایید شده
  USER = "USER", // کاربر عادی
  GUEST = "GUEST", // مهمان
}

export interface UserProfile {
  id: string;
  phoneNumber: string;
  fullName?: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  isVerified: boolean;
}

export interface Center {
  id: string;
  name: string;
  ownerId: string;
  specialty: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
  };
  rating: number;
  reviewsCount: number;
  imageUrl?: string;
  isVerified: boolean;
  services: string[];
}

export interface Appointment {
  id: string;
  centerId: string;
  userId: string;
  date: string;
  time: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  price: number;
  trackingCode: string;
}
