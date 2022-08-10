import { getTokenFromHeader, getDecodeToken } from "../helper/token";
import { Action } from "routing-controllers";
import { isBlacklistPathByRole, isRolePermission } from "../helper/role";
import { Container, Service } from "typedi";
import { TTokenStatic } from "../interfaces/token";

@Service()
class AuthorizationMiddleware {
    static async Authorization(
        action: Action,
        path: string[]
    ): Promise<boolean> {
        try {
            const token = getTokenFromHeader(action);

            if (!token) {
                console.log(
                    "%cauthorizationMiddleware.ts line:34 get Token Fail"
                );
                return false;
            }
            const tokenModel: TTokenStatic = Container.get("token_model");
            const result = await tokenModel.findOne({
                where: { token: token, deleted_at: null },
                raw: true,
            });

            if (result === null) {
                return false;
            }

            const decode = getDecodeToken(
                token,
                process.env.SECRET_JWT_TOKEN as string
            );

            if (!decode.success) {
                console.log("%cauthorizationMiddleware.ts line:43 Decode Fail");
                return false;
            }

            if (!isRolePermission([decode.decoded.phan_quyen])) {
                return false;
            }
            Container.set("user_request", decode.decoded);

            if (path.length === 0) {
                return true;
            }

            if (isBlacklistPathByRole([decode.decoded.phan_quyen], path)) {
                return false;
            }

            return true;
        } catch (error) {
            console.log("%cAuthorizationMiddleware.ts line:35 object", error);
            return false;
        }
    }
}

export default AuthorizationMiddleware;
