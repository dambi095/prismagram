import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
    Mutation: {
        confirmSecret: async (_, args) => {
            const { email, secret } = args;
            const user = await prisma.user({ email });
            
            if (user.loginSecret === secret) {
                // 일치 한다면 loginSecret 초기화 
                await prisma.updateUser({
                    where: { id: user.id },
                    data: {
                        loginSecret: ""
                    }
                });
                // 사용자 토큰 생성 
                return generateToken(user.id);
            } else {
                throw Error("Wrong email/secret combination")
            }
        }
    }
}