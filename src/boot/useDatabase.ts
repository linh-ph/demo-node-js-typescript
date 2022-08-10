import { Sequelize } from "sequelize";

import * as Models from "../models";
import * as IStatics from "../interfaces";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("../config/databaseConfig");

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.log("Unable to connect to the database:", err);
    });

export interface DatabaseType {
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
    group?: IStatics.TGroupStatic;
    organizer?: IStatics.TOrganizerStatic;
    user?: IStatics.TUserStatic;
    token?: IStatics.TTokenStatic;
    event?: IStatics.TEventStatic;
    bannerEvent?: IStatics.TBannerEventStatic;
    eventType?: IStatics.TEventTypeStatic;
    stated?: IStatics.TStatedStatic;
    nature?: IStatics.TNatureStatic;
    properties?: IStatics.TPropertiesStatic;
    document?: IStatics.TDocumentStatic;
    documentApproval?: IStatics.TDocumentApprovalStatic;
    documentNotes?: IStatics.TDocumentNotesStatic;
    failedJob?: IStatics.TFailedJobStatic;
    file?: IStatics.TFileStatic;
    location?: IStatics.TLocationStatic;
    meeting?: IStatics.TMeetingStatic;
    meetingDocument?: IStatics.TMeetingDocumentStatic;
    meetingMember?: IStatics.TMeetingMemberStatic;
    presideMeeting?: IStatics.TPresideMeetingStatic;
    role?: IStatics.TRoleStatic;
    schedule?: IStatics.TScheduleStatic;
    status?: IStatics.TStatedStatic;
    division?: IStatics.TDivisionStatic;

    [key: string]: unknown;
}

export const database: DatabaseType = {
    sequelize,
    Sequelize,
};

database.user = Models.UserModel(sequelize);
database.group = Models.GroupModel(sequelize);
database.token = Models.TokenModel(sequelize);
database.organizer = Models.OrganizerModel(sequelize);
database.event = Models.EventModel(sequelize);
database.eventType = Models.EventTypeModel(sequelize);
database.nature = Models.NatureModel(sequelize);
database.stated = Models.StatedModel(sequelize);
database.properties = Models.PropertiesModel(sequelize);
database.bannerEvent = Models.BannerEventModel(sequelize);
database.status = Models.StatusModel(sequelize);
database.file = Models.FileModel(sequelize);
database.schedule = Models.ScheduleModel(sequelize);
database.division = Models.DivisionModel(sequelize);
database.meetingMember = Models.MeetingMemberModel(sequelize);
database.meeting = Models.MeetingModel(sequelize);
database.location = Models.LocationModel(sequelize);
database.presideMeeting = Models.PresideModel(sequelize);
database.document = Models.DocumentModel(sequelize);
database.documentApproval = Models.DocumentApprovalModel(sequelize);
database.documentNotes = Models.DocumentNotesModel(sequelize);
database.meetingDocument = Models.MeetingDocumentModel(sequelize);

export default database;
