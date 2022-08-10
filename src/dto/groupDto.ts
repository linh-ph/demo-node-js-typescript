import { Validate } from "class-validator";
import { IsMinMax, IsEmptyString } from "../helper/validate";

export class BaseGroup {
    @Validate(IsMinMax, [1, 50])
    @Validate(IsEmptyString)
    ten: string;
}

export class RecordOther extends BaseGroup {}

export class AddGroupDto extends RecordOther {}

export class UpdateGroupDto extends RecordOther {}
