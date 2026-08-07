export interface Organization {
  id: number;
  name: string;
  slug: string;
  logo_url: string;
  created_at: string;
  updated_at: string;
  // UI extended properties
  members?: number;
  status?: string;
}

export interface User {
  id: number;
  organization_id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string;
  status: 'active' | 'inactive' | 'invited';
  last_login_at: string;
  created_at: string;
  updated_at: string;
  // Query relations
  user_roles?: any[];
  // UI extended properties
  role?: string;
}

export interface Project {
  id: number;
  organization_id: number;
  name: string;
  code: string;
  description: string;
  start_date: string;
  end_date: string;
  status: 'planned' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  created_by: number;
  created_at: string;
  updated_at: string;
}
