import {
    Controller,
    Body,
    Post,
    HttpCode,
    Authorized,
    Param,
    Get,
    Delete,
    Put,
    QueryParams,
} from "routing-controllers";
import { Service } from "typedi";
import EventService from "../services/eventService";
import { RecordOther, UpdateEventDto } from "../dto/eventDto";
import { ResponseError } from "../helper/error";
import { onSuccess, createResponsePaging } from "../helper";
import MESSAGE_RESPONSE from "../constraints";
import { SearchAttributeDto } from "../dto/generalDto";
import { PrefixRoute, PathRole } from "../helper/role";
import { IEvent } from "../interfaces/event";
import {
    checkDeletedEvent,
    checkValidEventUpdate,
    generateQRCode,
} from "./general";
import {
    OrganizerService,
    NatureService,
    PropertiesService,
    EventTypeService,
    StatusService,
    FileService,
} from "../services";
import { BaseValidateType } from "../helper/beforeQuery";
import { FOREIGN_KEY_NAME } from "../constraints/foreign";
import { IFile } from "interfaces";
import { getInfoFile, getLastStr } from "../helper/utils";
const DEFAULT_PREFIX = PrefixRoute.EVENT;
const NAME_PREFIX = "Tên sự kiện ";

@Controller(DEFAULT_PREFIX)
@Service()
export class EventController {
    constructor(
        private readonly eventService: EventService,
        private readonly eventTypeService: EventTypeService,
        private readonly organizerService: OrganizerService,
        private readonly natureService: NatureService,
        private readonly propertiesService: PropertiesService,
        private readonly statusService: StatusService,
        private readonly fileService: FileService
    ) {}

    @Post(PathRole.ADD)
    @HttpCode(201)
    @Authorized(DEFAULT_PREFIX + PathRole.ADD)
    async add(@Body() dto: RecordOther): Promise<{ [key: string]: unknown }> {
        try {
            console.log(
                "%ceventController.ts line:56 object",
                "color: #007acc;",
                dto
            );
            const nameExist = await this.eventService.findByName(dto.ten);
            if (nameExist) {
                throw new ResponseError(
                    400,
                    NAME_PREFIX + MESSAGE_RESPONSE.exists
                ).toJSON();
            }

            await this.checkValidateType(dto);

            // const fullFileName = getLastStr(dto.file, "/");
            // const infoFile = getInfoFile(fullFileName);
            // if (!infoFile.success) {
            //     throw new ResponseError(400, infoFile.message).toJSON();
            // }
            // const file: IFile = infoFile.data;
            // console.log(
            //     "%ceventController.ts line:81 object",
            //     "color: #007acc;",
            //     file
            // );

            // const saveFileName = await this.fileService.create(file);
            // if (!saveFileName) {
            //     throw new ResponseError(
            //         400,
            //         MESSAGE_RESPONSE.addFailed
            //     ).toJSON();
            // }

            const payload: IEvent = await generateQRCode(dto);
            // dto.loai_su_kien_id = saveFileName.id;
            console.log(
                "%ceventController.ts line:98 dto",
                "color: #007acc;",
                dto
            );
            const saved = await this.eventService.create(payload);
            if (!saved) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.addFailed
                ).toJSON();
            }

            return onSuccess(saved, MESSAGE_RESPONSE.addSuccess, 200);
        } catch (error) {
            return error;
        }
    }

    @Put(PathRole.UPDATE)
    @HttpCode(201)
    @Authorized(DEFAULT_PREFIX + PathRole.UPDATE)
    async update(
        @Param("id") id: number,
        @Body() dto: UpdateEventDto
    ): Promise<{ [key: string]: unknown }> {
        try {
            await checkValidEventUpdate(this.eventService, dto, id);

            await this.checkValidateType(dto);

            const isUpdate = await this.eventService.updateById(id, dto);
            if (!isUpdate) {
                throw new ResponseError(400, MESSAGE_RESPONSE.deleted).toJSON();
            }

            return onSuccess(null, MESSAGE_RESPONSE.updateSuccess, 200);
        } catch (error) {
            return error;
        }
    }

    @Delete(PathRole.DELETE)
    @HttpCode(201)
    @Authorized(DEFAULT_PREFIX + PathRole.DELETE)
    async delete(@Param("id") id: number): Promise<{ [key: string]: unknown }> {
        try {
            await checkDeletedEvent(this.eventService, id);

            const isUpdate = await this.eventService.deleteById(id);

            if (!isUpdate) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.deleteFailed
                ).toJSON();
            }

            return onSuccess(null, MESSAGE_RESPONSE.deleteSuccess, 200);
        } catch (error) {
            return error;
        }
    }

    @Get(PathRole.ID)
    @HttpCode(201)
    @Authorized(DEFAULT_PREFIX + PathRole.ID)
    async getId(@Param("id") id: number): Promise<{ [key: string]: unknown }> {
        try {
            const event = await this.eventService.findById(id);
            console.log(
                "%ceventController.ts line:138 object",
                "color: #007acc;",
                event
            );
            if (!event) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.idNotFound
                ).toJSON();
            }
            return onSuccess(event, MESSAGE_RESPONSE.getInfoSuccess, 200);
        } catch (error) {
            return error;
        }
    }

    @Get(PathRole.ALL)
    @HttpCode(200)
    @Authorized(DEFAULT_PREFIX + PathRole.ALL)
    async getAll(
        @QueryParams() dto: SearchAttributeDto
    ): Promise<{ [key: string]: unknown }> {
        try {
            const user = await this.eventService.findAll(dto);

            if (!user) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.dataNotFound
                ).toJSON();
            }
            return onSuccess(
                createResponsePaging(
                    dto.page_number,
                    dto.item_per_page,
                    user.rows,
                    user.count
                ),
                MESSAGE_RESPONSE.getInfoSuccess,
                200
            );
        } catch (error) {
            return error;
        }
    }

    async checkValidateType(dto: RecordOther): Promise<any> {
        await BaseValidateType.checkTypesDeletedAt(
            this.eventTypeService,
            dto.loai_su_kien_id,
            FOREIGN_KEY_NAME.EVENT_TYPE
        );

        await BaseValidateType.checkTypesDeletedAt(
            this.organizerService,
            dto.nha_to_chuc_id,
            FOREIGN_KEY_NAME.ORGANIZER
        );

        await BaseValidateType.checkTypesDeletedAt(
            this.natureService,
            dto.tinh_chat_id,
            FOREIGN_KEY_NAME.NATURE
        );

        await BaseValidateType.checkTypesDeletedAt(
            this.propertiesService,
            dto.thuoc_tinh_id,
            FOREIGN_KEY_NAME.PROPERTIES
        );
        await BaseValidateType.checkTypesDeletedAt(
            this.statusService,
            dto.tinh_trang_id,
            FOREIGN_KEY_NAME.STATUS
        );
    }
}
