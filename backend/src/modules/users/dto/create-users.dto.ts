export class CreateUserDto {
  organization_id?: string | number;
  first_name?: string;
  last_name?: string;
  email: string;
  password_hash: string;
  avatar_url?: string;
  status?: string;
}
