interface IMessageResponse {
    exists?: string;
    addFailed?: string;
    addSuccess?: string;
    updateFailed?: string;
    updateSuccess?: string;
    getInfoSuccess?: string;
    emailAlready?: string;
    phoneAlready?: string;
    registerSuccess?: string;
    registerFailed?: string;
    deleteFailed?: string;
    deleteSuccess?: string;
    validatePhoneNumber?: string;
    passwordNotFound?: string;
    validatePassword?: string;
    validateDate?: string;
    resetPasswordSuccess?: string;
    resetPasswordFailed?: string;
    userNotFound?: string;
    passwordWrong?: string;
    tokenSaveFailed?: string;
    refreshTokenWrong?: string;
    tokenNotFound?: string;
    tokenRemoved?: string;
    validateInvalidPassword?: string;
    validateInvalid?: string;
    validatePropsAndValue?: string;
    validateDateEnd?: string;
    idNotFound?: string;
    validateEmail?: string;
    dataNotFound?: string;
    idGroupNotFound?: string;
    validateDateNormal?: string;
    deleted?: string;
    validateEmpty?: string;
    inValidExtension?: string;
    isRequire?: string;
    idDeleted?: string;
    isNumber?: string;
    emailChanged?: string;
}

interface IMessageMulter {
    LIMIT_PART_COUNT: string;
    LIMIT_FILE_SIZE: string;
    LIMIT_FILE_COUNT: string;
    LIMIT_FIELD_KEY: string;
    LIMIT_FIELD_VALUE: string;
    LIMIT_FIELD_COUNT: string;
    LIMIT_UNEXPECTED_FILE: string;
}

export const MESSAGE_MULTER: IMessageMulter = {
    LIMIT_PART_COUNT: "Too many parts",
    LIMIT_FILE_SIZE: "File too large",
    LIMIT_FILE_COUNT: "Có quá nhiều file",
    LIMIT_FIELD_KEY: "Field name too long",
    LIMIT_FIELD_VALUE: "Field value too long",
    LIMIT_FIELD_COUNT: "Too many fields",
    LIMIT_UNEXPECTED_FILE: "Unexpected field",
};

const MESSAGE_RESPONSE: IMessageResponse = {
    exists: "đã tồn tại",
    addFailed: "thêm thất bại",
    addSuccess: "thêm thành công",
    updateFailed: "cập nhật thất bại",
    updateSuccess: "cập nhật thành công",
    getInfoSuccess: "lấy data thành công",
    emailAlready: "Email đã tồn tại",
    phoneAlready: "SĐT đã tồn tại",
    registerSuccess: "Đăng ký thành công",
    registerFailed: "Đăng ký thất bại",
    deleteFailed: "id không tồn tại",
    deleteSuccess: "Xóa thành công",
    validatePhoneNumber:
        "($property): ($value) không đúng! bắt đầu phải là (0) gồm 10 ký tự hoặc với (84) gồm 11 ký tự",
    passwordNotFound: "Mật khẩu không tìm thấy",
    validatePassword:
        "Tối thiểu sáu ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt",
    validateDate: "($property): ($value) phải lớn hơn thời gian hiện tại",
    resetPasswordSuccess: "Cài lại mật khẩu thành công",
    resetPasswordFailed: "Cài lại mật khẩu thất bại",
    userNotFound: "tài khoản không tồn tại",
    passwordWrong: "mật khẩu sai",
    tokenSaveFailed: "Lưu token thất bại",
    refreshTokenWrong: "Refresh token sai",
    tokenNotFound: "token không được tìm thấy",
    tokenRemoved: "Xóa token thành công",
    validateInvalidPassword: "Không đúng",
    validateInvalid: "Server lỗi hãy kiểm tra dữ liệu không hợp lệ",
    validatePropsAndValue: "$property: ($value) không đúng",
    validateDateEnd: "$property: ($value) phải lớn hơn ngày bắt đầu",
    idNotFound: "ID không tồn tại",
    dataNotFound: "Dữ liệu trống",
    validateEmail: "Email không hợp lệ",
    idGroupNotFound: "Id nhóm không tồn tại",
    validateDateNormal: "Thời gian không hợp lệ",
    deleted: "Đã xóa",
    validateEmpty: "Vui lòng nhập ($property)",
    inValidExtension: "Không đúng extension, chỉ cho phép extension ",
    isRequire: "Cần ít nhất 1 file",
    idDeleted: "ID đã xóa",
    isNumber: "($property): ($value) không đúng! phải là số",
    emailChanged: "Không được phép thay đổi email",
};

export default MESSAGE_RESPONSE;
