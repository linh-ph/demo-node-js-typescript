import { Validate } from "class-validator";
import { IsMinMax, IsEmptyString, IsNumber } from "../helper/validate";

export class BaseBannerEvent {
    @Validate(IsMinMax, [1, 50])
    @Validate(IsEmptyString)
    ten: string;
}

export class RecordOther extends BaseBannerEvent {
    su_kien_id: number;
}

export class AddBannerEventDto extends RecordOther {
    @Validate(IsNumber)
    su_kien_id: number;
}

export class UpdateBannerEventDto {
    @Validate(IsNumber)
    su_kien_id: number;
}
