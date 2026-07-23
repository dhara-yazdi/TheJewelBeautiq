export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  productId: number | null;
  productName: string | null;
  createdAt: string;
}

export interface CreateInquiry {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  productId: number | null;
  productName: string;
  productSku: string;
}
