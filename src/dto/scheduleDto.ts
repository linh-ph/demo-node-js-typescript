import { Validate, IsOptional } from "class-validator";
import {
    IsMinMax,
    IsEmptyString,
    IsDate,
    IsTime,
    IsTimeEnd,
} from "../helper/validate";

export class BaseSchedule {}

export class RecordOther extends BaseSchedule {
    @IsOptional()
    phan_ban: number;
    @IsOptional()
    @Validate(IsMinMax, [1, 50])
    @Validate(IsEmptyString)
    tieu_de: string;
    @IsOptional()
    dien_gia_id: number;
    @IsOptional()
    cuoc_hop_id: number;

    @IsOptional()
    @Validate(IsDate)
    ngay_dien_ra: Date;
    @IsOptional()
    @Validate(IsTime)
    gio_bat_dau: Date;
    @IsOptional()
    @IsTimeEnd()
    gio_ket_thuc: Date;
    @IsOptional()
    @Validate(IsMinMax, [1, 255])
    @Validate(IsEmptyString)
    mo_ta?: string;
}

export class AddScheduleDto extends RecordOther {
    @Validate(IsMinMax, [1, 50])
    @Validate(IsEmptyString)
    tieu_de: string;
}

export class UpdateScheduleDto extends RecordOther {}
