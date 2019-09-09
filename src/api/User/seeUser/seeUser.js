import { prisma } from "../../../../generated/prisma-client";

export default {
    // 리소스를 가져오는 명령어(Query), 어떤 리소스를 변경을 위한 명령어(Mutation)
    Query: {
        seeUser: async (_, args) => {
            // 아이디 값으로 유저와 유저 포스트를 찾아봅시당 
            const { id } = args;
            const user = await prisma.user({ id })
            const posts = await prisma.user({ id }).posts();
            return {
                user,
                posts
            }
        }
    }
}