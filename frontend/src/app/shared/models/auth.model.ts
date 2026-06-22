export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  fullName: string;
  expiresAt: string;
}

export interface Dashboard {
  totalProducts: number;
  totalCategories: number;
  totalInquiries: number;
  unreadInquiries: number;
  recentProducts: { id: number; name: string; price: number; material: string; isFeatured: boolean; categoryName: string; primaryImageUrl: string | null }[];
  recentInquiries: { id: number; name: string; email: string; subject: string; isRead: boolean; createdAt: string }[];
}
