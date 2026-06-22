export interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  productCount: number;
  createdAt: string;
}

export interface CreateCategory {
  name: string;
  description: string;
  imageUrl: string;
}

export interface UpdateCategory {
  name: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
}
