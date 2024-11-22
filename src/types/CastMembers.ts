export interface CastMember {
  id: string;
  name: string;
  type: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Links {
  first: string;
  last: string;
  prev: null;
  next: string;
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

export interface CastMemberParams {
  page?: number;
  perPage?: number;
  search?: string;
  type?: number;
}

export interface Results {
  data: CastMember[];
  links: Links;
  meta: Meta;
}

export interface Result {
  data: CastMember;
  links: Links;
  meta: Meta;
}