import { Validate } from "class-validator";
import { IsMinMax, IsEmptyString, IsNumber } from "../helper/validate";

export class BaseStated {
    @Validate(IsNumber)
    cuoc_hop_id?: number;
    @Validate(IsNumber)
    nguoi_dung_id?: number;
    @Validate(IsMinMax, [1, 50])
    @Validate(IsEmptyString)
    trang_thai?: string;
}

export class RecordOther extends BaseStated {}

export class AddStatedDto extends RecordOther {}

export class UpdateStatedDto extends RecordOther {}
