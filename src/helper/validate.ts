/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @typescript-eslint/no-explicit-any
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    registerDecorator,
    ValidationOptions,
} from "class-validator";
import moment from "moment";
import { isDateBigger, isDateGreaterThanCurrent } from "./utils";
import MESSAGE_RESPONSE from "../constraints";
import { IInputValidate } from "../interfaces/user";
import { ISchedule } from "interfaces/schedule";

const MIN_INDEX = 0;
const MAX_INDEX = 1;

const PATTERN_EMAIL_FIRST = new RegExp(/^[a-zA-Z0-9]\S+$/);

const PATTERN_EMAIL = new RegExp(
    /^[^\W][a-zA-Z0-9-_\\.]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const PATTERN_EMAIL_STRONG = new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const PATTERN_PHONE = new RegExp(/(0[2|3|5|7|8|9])+([0-9]{8})\b/);
const PATTERN_PHONE_NO_CHECK_REFIX = new RegExp(/(0[0-9])+([0-9]{8})\b/);

const PATTERN_PHONE_INTERNATIONAL_AREA_CODE = new RegExp(/^([0-9]{11})$/);

const PATTERN_PASSWORD = new RegExp(/([0-9]{1,8})\b/);

const PATTERN_PASSWORD_STRONG = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
);

const getMinMax = (args: ValidationArguments): { [key: string]: unknown } => {
    const minIndex = args.constraints[MIN_INDEX] ?? 0;
    const maxIndex = args.constraints[MAX_INDEX] ?? 255;
    return { minIndex, maxIndex };
};

@ValidatorConstraint({ name: "error_message", async: false })
export class IsEmail implements ValidatorConstraintInterface {
    validate(text: string): boolean {
        if (!PATTERN_EMAIL_FIRST.test(text)) {
            return false;
        }
        if (!PATTERN_EMAIL.test(text)) {
            return false;
        }

        return PATTERN_EMAIL_STRONG.test(text);
    }

    defaultMessage(): string {
        return MESSAGE_RESPONSE.validateEmail;
    }
}

@ValidatorConstraint({ name: "error_message", async: false })
export class IsNotEmpty implements ValidatorConstraintInterface {
    validate(text: string): boolean {
        if (text?.trim()?.length === 0) {
            return false;
        }

        return true;
    }

    defaultMessage(): string {
        return MESSAGE_RESPONSE.validateEmpty;
    }
}

@ValidatorConstraint({ name: "error_message", async: false })
export class IsPhoneNumber implements ValidatorConstraintInterface {
    validate(text: string): boolean {
        return PATTERN_PHONE.test(text);
    }

    defaultMessage(): string {
        return MESSAGE_RESPONSE.validatePhoneNumber;
    }
}

@ValidatorConstraint({ name: "error_message", async: false })
export class IsPhoneNumberUpdate implements ValidatorConstraintInterface {
    validate(text: string): boolean {
        if (text?.trim()?.length === 0) {
            return true;
        }
        if (text?.trim()?.toString()?.startsWith("84")) {
            return PATTERN_PHONE_INTERNATIONAL_AREA_CODE.test(text);
        }

        return PATTERN_PHONE_NO_CHECK_REFIX.test(text);
    }

    defaultMessage(): string {
        return MESSAGE_RESPONSE.validatePhoneNumber;
    }
}

@ValidatorConstraint({ name: "error_message", async: false })
export class IsPassword implements ValidatorConstraintInterface {
    validate(text: string): boolean {
        return PATTERN_PASSWORD.test(text);
    }

    defaultMessage(): string {
        return MESSAGE_RESPONSE.validateInvalidPassword;
    }
}
@ValidatorConstraint({ name: "error_message", async: false })
export class IsPasswordStrong implements ValidatorConstraintInterface {
    validate(text: string): boolean {
        return PATTERN_PASSWORD_STRONG.test(text);
    }

    defaultMessage(): string {
        return MESSAGE_RESPONSE.validatePassword;
    }
}
@ValidatorConstraint({ name: "error_message", async: false })
export class IsMinMax implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments): boolean {
        if (!args.constraints) {
            return false;
        }
        if (text?.trim()?.length === 0) {
            return false;
        }
        const { minIndex, maxIndex } = getMinMax(args);
        const patternMinMax = new RegExp(`^.{${minIndex},${maxIndex}}$`);
        return patternMinMax.test(text);
    }

    defaultMessage(args: ValidationArguments): string {
        if (args.constraints) {
            const { minIndex, maxIndex } = getMinMax(args);
            return `($property): ($value) không đúng! nhỏ nhất là ${minIndex} kí tự, lớn nhất là ${maxIndex} kí tự`;
        }
        return MESSAGE_RESPONSE.validateInvalid;
    }
}

@ValidatorConstraint({ name: "error_message", async: false })
export class IsDate implements ValidatorConstraintInterface {
    validate(text: string): boolean {
        const isValidDate = moment(text, "YYYY-MM-DD HH:mm:ss", true).isValid();

        if (!isValidDate) {
            return false;
        }

        return isDateGreaterThanCurrent(text);
    }

    defaultMessage(): string {
        return MESSAGE_RESPONSE.validateDate;
    }
}

const isHoursValid = (hours: number) => hours < 24 && hours >= 0;
const isMinutesValid = (minutes: number) => minutes < 60 && minutes >= 0;

interface ITime {
    hours?: number;
    minutes?: number;
}

const getHoursAndMinutes = (text: string): ITime => {
    const hours = Number(text.match(/^(\d+)/)[1]);
    const minutes = Number(text.match(/:(\d+)/)[1]);
    return { hours, minutes };
};

const isValidTime = (text: string): boolean => {
    const { hours, minutes } = getHoursAndMinutes(text);
    if (!isHoursValid(hours)) {
        return false;
    }
    if (!isMinutesValid(minutes)) {
        return false;
    }
    return true;
};

@ValidatorConstraint({ name: "error_message", async: false })
export class IsTime implements ValidatorConstraintInterface {
    validate(text: string): boolean {
        if (!text) {
            return false;
        }

        return isValidTime(text);
    }

    defaultMessage(): string {
        return MESSAGE_RESPONSE.validateDate;
    }
}

@ValidatorConstraint({ async: true })
export class isValidateTimeEnd implements ValidatorConstraintInterface {
    validate(text: any, args: ValidationArguments) {
        const schedule = args.object as ISchedule;
        if (!schedule?.gio_bat_dau) {
            return false;
        }

        if (!isValidTime(text)) {
            return false;
        }
        const timeStart = getHoursAndMinutes(schedule?.gio_bat_dau?.toString());
        const timeEnd = getHoursAndMinutes(schedule?.gio_ket_thuc?.toString());

        if (timeStart.hours > timeEnd.hours) {
            return false;
        }

        if (timeStart.hours === timeEnd.hours) {
            if (timeStart.minutes > timeEnd.minutes) {
                return false;
            }
        }

        return true;
    }

    defaultMessage(): string {
        return MESSAGE_RESPONSE.validateDateEnd;
    }
}
@ValidatorConstraint({ name: "error_message", async: false })
export class IsDateNormal implements ValidatorConstraintInterface {
    validate(text: string): boolean {
        const isValidDate = moment(text, "YYYY-MM-DD HH:mm:ss", true).isValid();

        if (!isValidDate) {
            return false;
        }

        return true;
    }

    defaultMessage(): string {
        return MESSAGE_RESPONSE.validateDateNormal;
    }
}

@ValidatorConstraint({ name: "error_message", async: false })
export class IsMinMaxNumber implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments): boolean {
        if (!args.constraints) {
            return false;
        }
        const { minIndex, maxIndex } = getMinMax(args);
        return maxIndex >= text && text >= minIndex;
    }

    defaultMessage(args: ValidationArguments): string {
        if (args.constraints) {
            const { minIndex, maxIndex } = getMinMax(args);
            return (
                "($property): nhỏ nhất là " +
                `${minIndex}, lớn nhất là ${maxIndex}`
            );
        }
        return MESSAGE_RESPONSE.validateInvalid;
    }
}

@ValidatorConstraint({ async: true })
export class isValidateDateEnd implements ValidatorConstraintInterface {
    validate(text: any, args: ValidationArguments) {
        const event = args.object as IInputValidate;
        if (event.ngay_bat_dau) {
            const dateStart = moment(
                event.ngay_bat_dau,
                "YYYY-MM-DD HH:mm:ss",
                true
            );
            const dateEnd = moment(text, "YYYY-MM-DD HH:mm:ss", true);
            if (isDateBigger(dateEnd.toDate(), dateStart.toDate())) {
                return true;
            }
            return false;
        }

        return false;
    }

    defaultMessage(): string {
        return MESSAGE_RESPONSE.validateDateEnd;
    }
}

export function IsDateEnd(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: isValidateDateEnd,
        });
    };
}

export function IsTimeEnd(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: isValidateTimeEnd,
        });
    };
}

@ValidatorConstraint({ name: "error_message", async: false })
export class IsImageFile implements ValidatorConstraintInterface {
    validate(text: string): boolean {
        console.log("%cvalidate.ts line:283 object", "color: #007acc;", text);
        return true;
    }

    defaultMessage(): string {
        return MESSAGE_RESPONSE.validatePassword;
    }
}

@ValidatorConstraint({ name: "error_message", async: false })
export class IsEmptyString implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments): boolean {
        if (text?.trim()?.length !== text?.length) {
            return false;
        }
        return true;
    }

    defaultMessage(): string {
        return "($property): không cho phép có khoảng trắng đầu và cuối";
    }
}

const isCompareText = (text: string): boolean =>
    text && text?.toString()?.trim()?.length !== text?.toString()?.length;

@ValidatorConstraint({ name: "error_message", async: false })
export class IsNumber implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments): boolean {
        try {
            if (isCompareText(text)) {
                return false;
            }

            const num = Number.parseInt(text);
            if (isNaN(num)) {
                return false;
            }
            if (num < 0) {
                return false;
            }

            return true;
        } catch (error) {
            return false;
        }
    }

    defaultMessage(): string {
        return MESSAGE_RESPONSE.isNumber;
    }
}
