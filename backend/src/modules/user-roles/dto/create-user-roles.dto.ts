import { IsNotEmpty } from 'class-validator';

export class CreateUserRoleDto {
  @IsNotEmpty()
  user_id?: string | number;

  @IsNotEmpty()
  role_id?: string | number;
}
