import { Container } from "typedi";
import { DatabaseType } from "./useDatabase";

export const setContainerDependencyInject = (database: DatabaseType): void => {
    Container.set("user_model", database.user);
    Container.set("token_model", database.token);
    Container.set("group_model", database.group);
    Container.set("token_model", database.token);
    Container.set("organizer_model", database.organizer);
    Container.set("event_model", database.event);
    Container.set("event_type_model", database.eventType);
    Container.set("nature_model", database.nature);
    Container.set("stated_model", database.stated);
    Container.set("organizer_model", database.organizer);
    Container.set("properties_model", database.properties);
    Container.set("document_model", database.document);
    Container.set("banner_event_model", database.bannerEvent);
    Container.set("status_model", database.status);
    Container.set("file_model", database.file);
    Container.set("schedule_model", database.schedule);
    Container.set("division_model", database.division);
    Container.set("meeting_member_model", database.meetingMember);
    Container.set("meeting_model", database.meeting);
};
