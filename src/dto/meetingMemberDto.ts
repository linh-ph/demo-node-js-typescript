import { Validate, IsOptional, IsIn } from "class-validator";
import { IsMinMax, IsEmptyString, IsNumber } from "../helper/validate";

export class BaseMeetingMember {}

export class RecordOther extends BaseMeetingMember {
    @IsOptional()
    phan_ban: number;

    @IsOptional()
    @Validate(IsNumber)
    cuoc_hop_id: number;

    @IsOptional()
    // @Validate(IsNumber)
    nguoi_dung_id: number;

    @IsOptional()
    @IsIn([0, 1])
    chu_tri: number;

    @IsOptional()
    @Validate(IsMinMax, [1, 255])
    @Validate(IsEmptyString)
    vi_tri: string;

    @IsOptional()
    @Validate(IsMinMax, [1, 255])
    @Validate(IsEmptyString)
    trang_thai: string;

    @IsOptional()
    @Validate(IsMinMax, [1, 255])
    @Validate(IsEmptyString)
    ghi_chu: string;
}

export class AddMeetingMemberDto extends RecordOther {}

export class UpdateMeetingMemberDto extends RecordOther {}
