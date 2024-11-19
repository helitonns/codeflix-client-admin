
export interface Results {
  meta: Meta;
  links: Links;
  data: Category[];
}

export interface Result {
  meta: Meta;
  links: Links;
  data: Category;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface Links {
  prev: null;
  last: string;
  next: string;
  first: string;
}

export interface Meta {
  to: number;
  from: number;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
  path: string;
}

export interface CategoryParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}