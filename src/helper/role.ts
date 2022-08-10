const INDEX_PATH = 0;
export interface IRole {
    Admin?: string;
    Secretary?: string;
    User?: string;
}

export interface IPrefixRoute {
    USER?: string;
    GROUP?: string;
    AUTH?: string;
    EVENT?: string;
    EVENT_TYPE?: string;
    NATURE?: string;
    PROPERTIES?: string;
    UTILS?: string;
    BANNER_EVENT?: string;
    ORGANIZER?: string;
    STATUS?: string;
    STATED?: string;
    FILE?: string;
    SCHEDULE?: string;
    DIVISION?: string;
    MEETING_MEMBER?: string;
    MEETING?: string;
}

export interface IPathRole {
    ADD?: string;
    UPDATE?: string;
    DELETE?: string;
    ID?: string;
    ALL?: string;
}

export interface IPathUtils {
    UPLOAD_IMAGE?: string;
}

export const Roles: IRole = {
    Admin: "admin",
    Secretary: "secretary",
    User: "user",
};

export const PrefixRoute: IPrefixRoute = {
    USER: "/user",
    GROUP: "/group",
    AUTH: "/auth",
    EVENT: "/event",
    EVENT_TYPE: "/eventType",
    NATURE: "/nature",
    PROPERTIES: "/properties",
    UTILS: "/utils",
    BANNER_EVENT: "/bannerEvent",
    ORGANIZER: "/organizer",
    STATUS: "/status",
    STATED: "/stated",
    FILE: "/file",
    SCHEDULE: "/schedule",
    DIVISION: "/division",
    MEETING_MEMBER: "/meetingMember",
    MEETING: "/meeting",
};

export const PathUtils: IPathUtils = {
    UPLOAD_IMAGE: "/upload-image",
};

export const PathRole: IPathRole = {
    ADD: "/add",
    UPDATE: "/update/:id",
    DELETE: "/delete/:id",
    ID: "/:id",
    ALL: "/",
};

const MAP_PATH = [
    PrefixRoute.USER + PathRole.ALL,
    PrefixRoute.USER + PathRole.ADD,
    PrefixRoute.USER + PathRole.DELETE,
];

export const mapPathUser = [...MAP_PATH];

export const mapPathSecretary = [...MAP_PATH];

export const isBlacklistPathByRole = (
    role: string[],
    path: string[]
): boolean => {
    if (role.includes(Roles.User)) {
        return mapPathUser.includes(path[INDEX_PATH]);
    }
    if (role.includes(Roles.Secretary)) {
        return mapPathSecretary.includes(path[INDEX_PATH]);
    }
    return false;
};

export const isRolePermission = (role: Array<string>): boolean => {
    return (
        role.includes(Roles.Admin) ||
        role.includes(Roles.Secretary) ||
        role.includes(Roles.User)
    );
};
