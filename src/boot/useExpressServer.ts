import { useContainer, useExpressServer } from "routing-controllers";
import { Container } from "typedi";
import {
    AuthController,
    UserController,
    EventController,
    GroupController,
    EventTypeController,
    NatureController,
    PropertiesController,
    UtilsController,
    BannerEventController,
    OrganizerController,
    StatusController,
    FileController,
    ScheduleController,
    DivisionController,
    MeetingMemberController,
    MeetingController,
} from "../controllers";
import AuthorizationMiddleware from "../middleware/authorizationMiddleware";
import errorMiddleWare from "../middleware/errorMiddleWare";
import { Application } from "express";
import { Action } from "routing-controllers";

// Linking TypeDI and routing controllers
useContainer(Container);

export function useController(app: Application): void {
    // Initialize routing controllers
    useExpressServer(app, {
        // Prefix route
        routePrefix: "/v1",
        // MiddleWare authorization token
        authorizationChecker: (action: Action, roles: Array<string>) => {
            return AuthorizationMiddleware.Authorization(action, roles);
        },
        classToPlainTransformOptions: {
            enableCircularCheck: true,
        },
        // run when has keyword throw
        middlewares: [errorMiddleWare],
        // validate success will run controller
        controllers: [
            AuthController,
            UserController,
            GroupController,
            EventController,
            EventTypeController,
            NatureController,
            PropertiesController,
            UtilsController,
            BannerEventController,
            OrganizerController,
            StatusController,
            FileController,
            ScheduleController,
            DivisionController,
            MeetingMemberController,
            MeetingController,
        ],
        classTransformer: true,
        // Enable validate
        validation: true,
        // Disable Handle Error Default
        defaultErrorHandler: false,
    });
}
