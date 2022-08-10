import { Service, Inject } from "typedi";
import { IToken, TTokenStatic } from "../interfaces/token";
import { getDateTime } from "../helper/utils";
import { modelToRaw, isValidUpdate } from "../helper";

@Service()
class TokenService {
    constructor(@Inject("token_model") private tokenModel: TTokenStatic) {}

    async softDeleteByToken(token: string): Promise<boolean | null> {
        const result = await this.tokenModel.update(
            {
                deleted_at: getDateTime(),
            },
            {
                where: {
                    token: token,
                    deleted_at: null,
                },
            }
        );

        return isValidUpdate(result);
    }

    async createToken(token: IToken): Promise<IToken | null> {
        try {
            const userTokenCreated = await this.tokenModel.create(token);

            return modelToRaw(userTokenCreated);
        } catch (e) {
            return null;
        }
    }

    async findTokenAndDeletedAt(token: string): Promise<IToken | null> {
        try {
            const result = await this.tokenModel.findOne({
                where: { token: token, deleted_at: null },
            });
            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }
}

export default TokenService;
