import { IsEmail, IsOptional, Validate } from "class-validator";
import { IsPhoneNumber, IsMinMax, IsPasswordStrong } from "../helper/validate";

export class BaseAuth {
  @IsEmail()
  email: string;
}

export class LoginDto extends BaseAuth {
  @Validate(IsPasswordStrong)
  mat_khau: string;
}

export class RegisterDto extends LoginDto {
  @Validate(IsMinMax, [1, 50])
  ten: string;

  @Validate(IsPhoneNumber)
  @IsOptional()
  sdt: string;
}

export class RefreshTokenDto {
  @Validate(IsMinMax, [1, 255])
  refresh_token: string;
}
