import { AddUserDto } from "../dto/userDto";
import { AddEventDto, EventRecordOther } from "../dto/eventDto";
import { IUser } from "../interfaces";
import { ResponseError } from "../helper/error";
import { addPasswordHashToUser } from "../helper";
import MESSAGE_RESPONSE from "../constraints";
import { UserService, GroupService, EventService } from "../services";
import { IEvent } from "../interfaces/event";
import { textToQRCodeUrl, getTimeStamp } from "../helper/utils";

const isExistEmail = (email: string) => email && email?.trim()?.length > 0;
const isExistGroup = (group_id: number) => group_id && group_id > 0;

export const checkValidUser = async (
    userService: UserService,
    dto: AddUserDto
): Promise<void | null> => {
    if (isExistEmail(dto?.email)) {
        const userFoundEmail = await userService.findUserByEmailUnsafe(
            dto.email
        );
        if (userFoundEmail) {
            throw new ResponseError(
                400,
                MESSAGE_RESPONSE.emailAlready
            ).toJSON();
        }
    }
    if (dto?.sdt) {
        if (dto?.sdt?.trim()?.length === 0) {
            return;
        }
        const userFoundPhone = await userService.findUserByPhone(dto.sdt);

        if (userFoundPhone) {
            throw new ResponseError(
                400,
                MESSAGE_RESPONSE.phoneAlready
            ).toJSON();
        }
    }
};

export const isCompareExistByUser = (
    user: IUser[],
    fieldKey: string,
    fieldCompare: string
): IUser | null => {
    return user.find(
        (item) => item?.deleted_at !== null && item[fieldKey] === fieldCompare
    );
};

export const isDeletedUser = async (
    userService: UserService,
    id: number
): Promise<void | null> => {
    const userDeletedAt = await userService.findIdDeletedAt(id);
    if (userDeletedAt) {
        throw new ResponseError(400, MESSAGE_RESPONSE.idDeleted).toJSON();
    }
};

export const checkValidUserUpdate = async (
    userService: UserService,
    dto: AddUserDto,
    id: number
): Promise<void | null> => {
    if (isExistEmail(dto?.email)) {
        await isDeletedUser(userService, id);
        const userHasEmailExist = await userService.findAllEmailNotId(
            dto?.email,
            id
        );
        if (userHasEmailExist?.length > 0) {
            if (!isCompareExistByUser(userHasEmailExist, "email", dto?.email)) {
                throw new ResponseError(
                    400,
                    "Email " + MESSAGE_RESPONSE.exists
                ).toJSON();
            }
        }
    }

    if (dto?.sdt) {
        const userHasPhoneExist = await userService.findAllPhoneNotId(
            dto.sdt,
            id
        );

        if (userHasPhoneExist?.length > 0) {
            if (!isCompareExistByUser(userHasPhoneExist, "sdt", dto?.sdt)) {
                throw new ResponseError(
                    400,
                    "Số điện thoại " + MESSAGE_RESPONSE.exists
                ).toJSON();
            }
        }
    }
};

export const checkDeletedEvent = async (
    eventService: EventService,
    id: number
): Promise<void | null> => {
    const eventDeletedAt = await eventService.findIdDeletedAt(id);
    if (eventDeletedAt) {
        throw new ResponseError(400, MESSAGE_RESPONSE.idDeleted).toJSON();
    }
};

export const checkValidEventUpdate = async (
    eventService: EventService,
    dto: AddEventDto,
    id: number
): Promise<void | null> => {
    if (isExistEmail(dto?.ten)) {
        await checkDeletedEvent(eventService, id);
        const eventHasNameExist = await eventService.findAllTenNotId(
            dto.ten,
            id
        );
        if (eventHasNameExist?.length > 0) {
            throw new ResponseError(
                400,
                "Tên sự kiện " + MESSAGE_RESPONSE.exists
            ).toJSON();
        }
    }
};

export const checkValidGroup = async (
    groupService: GroupService,
    dto: AddUserDto
): Promise<void | null> => {
    if (isExistGroup(dto?.nhom_id)) {
        const groupExist = await groupService.findById(dto.nhom_id);

        if (!groupExist) {
            throw new ResponseError(
                400,
                MESSAGE_RESPONSE.idGroupNotFound
            ).toJSON();
        }
    }
};

export const isAlreadyEmailValid = async (
    userService: UserService,
    dto: AddUserDto
): Promise<boolean | null> => {
    if (dto.email) {
        const userFoundEmail = await userService.findUserByEmailUnsafe(
            dto.email
        );
        if (userFoundEmail) {
            return true;
        }
    }
    return false;
};

export const getHashUserByPassword = async (
    dto: AddUserDto
): Promise<IUser | null> => {
    let user: IUser = { ...dto };
    if (dto.mat_khau) {
        user = await addPasswordHashToUser(dto);
        if (!user) {
            throw new ResponseError(
                400,
                MESSAGE_RESPONSE.passwordNotFound
            ).toJSON();
        }
    }
    return user;
};

export const getCreateHashUserByPassword = async (
    dto: AddUserDto
): Promise<IUser | null> => {
    let user: IUser = { ...dto };
    user = await addPasswordHashToUser(dto);
    if (!user) {
        throw new ResponseError(
            400,
            MESSAGE_RESPONSE.passwordNotFound
        ).toJSON();
    }
    return user;
};

export const generateQRCode = async (
    dto: EventRecordOther
): Promise<IEvent | null> => {
    const payload: IEvent = {
        ...dto,
        ma_qr: getTimeStamp().toString(),
    };
    payload.link_qr = await textToQRCodeUrl(payload.ma_qr);
    return payload;
};

export const checkValidDeleteEventService = async (
    id: number,
    eventService: EventService,
    nameTypeId: string
): Promise<void | null> => {
    const findOne = await eventService.findByTypeId(nameTypeId, id);

    if (findOne) {
        const isUpdateAll = await eventService.deleteAllByTypeId(
            nameTypeId,
            id
        );

        if (!isUpdateAll) {
            throw new ResponseError(
                400,
                "Sự kiện liên quan xóa thất bại"
            ).toJSON();
        }
    }
};

export const checkValidDeleteUserService = async (
    id: number,
    userService: UserService,
    nameTypeId: string
): Promise<void | null> => {
    const findOne = await userService.findUserByTypeId(nameTypeId, id);

    if (findOne) {
        const isUpdateAll = await userService.deleteAllEventByTypeId(id);

        if (!isUpdateAll) {
            throw new ResponseError(
                400,
                "tài khoản liên quan không tồn tại"
            ).toJSON();
        }
    }
};
