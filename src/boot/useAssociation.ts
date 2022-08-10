/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatabaseType } from "./useDatabase";
import { createForeignByTableName } from "../config/modelConfig";

export const setAssociation = (database: DatabaseType): void => {
    database.user.belongsTo(
        database.group,
        createForeignByTableName("group", "nhom_id")
    );

    database.token.belongsTo(
        database.user,
        createForeignByTableName("user", "nguoi_tao_id")
    );

    database.group.belongsTo(
        database.user,
        createForeignByTableName("user", "nguoi_tao_id")
    );

    //Event
    database.event.belongsTo(
        database.eventType,
        createForeignByTableName("event_type", "loai_su_kien_id")
    );

    database.event.belongsTo(
        database.nature,
        createForeignByTableName("nature", "tinh_chat_id")
    );

    database.event.belongsTo(
        database.stated,
        createForeignByTableName("stated", "tinh_trang_id")
    );

    database.event.belongsTo(
        database.properties,
        createForeignByTableName("properties", "thuoc_tinh_id")
    );

    database.event.hasMany(
        database.bannerEvent,
        createForeignByTableName("event_banner_event", "su_kien_id")
    );

    database.event.belongsTo(
        database.organizer,
        createForeignByTableName("organizer", "nha_to_chuc_id")
    );
    database.event.belongsTo(
        database.status,
        createForeignByTableName("status", "tinh_trang_id")
    );

    // database.event.hasOne(
    //     database.file,
    //     createForeignByTableName("file", "thu_moi_id")
    // );

    database.file.hasOne(
        database.event,
        createForeignByTableName("event", "thu_moi_id")
    );

    database.schedule.belongsTo(
        database.division,
        createForeignByTableName("division", "phan_ban_id")
    );

    database.schedule.belongsTo(
        database.meetingMember,
        createForeignByTableName("meeting_member", "dien_gia_id")
    );

    database.schedule.belongsTo(
        database.meeting,
        createForeignByTableName("meeting", "cuoc_hop_id")
    );

    database.meeting.belongsTo(
        database.location,
        createForeignByTableName("location", "dia_diem_id")
    );

    database.meeting.belongsTo(
        database.properties,
        createForeignByTableName("properties", "thuoc_tinh_id")
    );

    database.meeting.hasOne(
        database.presideMeeting,
        createForeignByTableName("preside_meeting", "chu_tri_id")
    );

    database.presideMeeting.hasOne(
        database.meeting,
        createForeignByTableName("meeting", "cuoc_hop_id")
    );

    database.presideMeeting.belongsTo(
        database.user,
        createForeignByTableName("user", "nguoi_dung_id")
    );

    database.location.belongsTo(
        database.user,
        createForeignByTableName("user", "quan_li_id")
    );

    database.document.belongsTo(
        database.meetingMember,
        createForeignByTableName("meeting_member", "dien_gia_id")
    );

    database.document.belongsTo(
        database.schedule,
        createForeignByTableName("schedule", "lich_trinh_id")
    );

    database.document.belongsTo(
        database.meeting,
        createForeignByTableName("meeting", "cuoc_hop_id")
    );

    database.document.belongsTo(
        database.stated,
        createForeignByTableName("stated", "tinh_trang_id")
    );

    database.meetingDocument.belongsTo(
        database.meeting,
        createForeignByTableName("meeting", "cuoc_hop_id")
    );

    //  database.meetingDocument.belongsTo(
    //      database.meeting,
    //      createForeignByTableName("meeting", "cuoc_hop_id")
    //  );
};
