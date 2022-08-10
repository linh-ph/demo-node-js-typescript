import { IsOptional, Min, Validate } from "class-validator";
import { IsMinMax, IsImageFile, IsEmptyString } from "../helper/validate";
export class PagingDto {
    @IsOptional()
    @Min(1)
    page_number: number;
    @IsOptional()
    @Min(1)
    item_per_page: number;
}

export class SearchAttributeDto extends PagingDto {
    @IsOptional()
    ten: string;
    @IsOptional()
    email: string;
    @IsOptional()
    sdt: string;
    @IsOptional()
    ten_nhom: string;
}

export class BaseType {
    @Validate(IsMinMax, [1, 50])
    @Validate(IsEmptyString)
    ten: string;
}

export class RecordOther extends BaseType {}

export class AddTypeDto extends RecordOther {}

export class UpdateTypeDto extends RecordOther {}

export class FileImageDto {
    @Validate(IsImageFile)
    files: string;
}
