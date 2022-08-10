import { IsOptional, Validate, IsIn } from "class-validator";
import {
    IsMinMax,
    IsPasswordStrong,
    IsDateNormal,
    IsPhoneNumberUpdate,
    IsEmail,
    IsNumber,
} from "../helper/validate";

export class BaseUser {
    @Validate(IsMinMax, [1, 255])
    @Validate(IsEmail)
    email: string;
}

export class RecordOther extends BaseUser {
    @IsOptional()
    @IsIn(["user", "secretary", "admin"])
    phan_quyen: string;

    @IsOptional()
    @IsIn(["1", "2"])
    gioi_tinh: string;

    @IsOptional()
    @IsIn([0, 1])
    kich_hoat: number;

    @IsOptional()
    @Validate(IsPasswordStrong)
    mat_khau: string;

    @IsOptional()
    @Validate(IsPhoneNumberUpdate)
    sdt: string;

    @IsOptional()
    @Validate(IsDateNormal)
    ngay_tham_gia: Date;

    @IsOptional()
    @Validate(IsNumber)
    nhom_id: number;
}

export class UserExistDto extends BaseUser {}
export class AddUserDto extends RecordOther {
    @Validate(IsMinMax, [1, 50])
    ten: string;
}

export class UpdateUserDto extends RecordOther {
    @IsOptional()
    @Validate(IsMinMax, [1, 50])
    ten: string;

    @IsOptional()
    @Validate(IsMinMax, [1, 255])
    @Validate(IsEmail)
    email: string;
}
