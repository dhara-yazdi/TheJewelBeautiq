export interface ProductImage {
  id: number;
  imageUrl: string;
  altText: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  material: string;
  weight: number;
  isFeatured: boolean;
  isActive: boolean;
  categoryId: number;
  categoryName: string;
  images: ProductImage[];
  createdAt: string;
}

export interface ProductListItem {
  id: number;
  name: string;
  price: number;
  material: string;
  isFeatured: boolean;
  categoryName: string;
  primaryImageUrl: string | null;
}

export interface CreateProduct {
  name: string;
  description: string;
  price: number;
  sku: string;
  material: string;
  weight: number;
  isFeatured: boolean;
  categoryId: number;
}

export interface UpdateProduct {
  name: string;
  description: string;
  price: number;
  sku: string;
  material: string;
  weight: number;
  isFeatured: boolean;
  isActive: boolean;
  categoryId: number;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
