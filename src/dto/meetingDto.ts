import { IsOptional, Validate, IsNumber } from "class-validator";
import {
    IsMinMax,
    IsDate,
    IsMinMaxNumber,
    IsDateEnd,
    IsNotEmpty,
} from "../helper/validate";

export class BaseMeeting {
    @Validate(IsMinMax, [1, 50])
    ten: string;
}

export class RecordOther extends BaseMeeting {
    @IsOptional()
    @Validate(IsMinMaxNumber, [0, 50])
    so_luong: number;

    @IsOptional()
    @IsNumber()
    nha_to_chuc_id: number;

    @IsOptional()
    @Validate(IsNotEmpty)
    @Validate(IsDate)
    ngay_bat_dau: Date;

    @IsOptional()
    @Validate(IsNotEmpty)
    @IsDateEnd()
    ngay_ket_thuc: Date;

    @IsOptional()
    @IsNumber()
    loai_su_kien_id: number;

    @IsOptional()
    @IsNumber()
    tinh_chat_id: number;

    @IsOptional()
    @IsNumber()
    tinh_trang_id: number;

    @IsOptional()
    @IsNumber()
    thuoc_tinh_id: number;

    @IsOptional()
    @Validate(IsMinMax, [1, 250])
    chu_de: string;

    @IsOptional()
    @IsNumber()
    thu_moi_id: number;

    @IsOptional()
    @Validate(IsMinMax, [1, 250])
    ma_QR: string;

    @IsOptional()
    link_QR: string;

    @IsOptional()
    @IsNumber()
    da_du_noi_dung: number;
}

export class EventRecordOther extends RecordOther {}
export class AddMeetingDto extends RecordOther {
    @Validate(IsMinMax, [1, 50])
    ten: string;
}

export class UpdateMeetingDto extends RecordOther {
    @Validate(IsMinMax, [1, 50])
    ten: string;
}
