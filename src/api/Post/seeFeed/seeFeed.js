import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeFeed: async (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const following = await prisma.user({ id: user.id }).following();

            // following 한 유저들의 이름을 가져올 수 있당
            // console.log(following.map(user => user.id));

            return prisma.posts({
                where: {
                    user: {
                        id_in: [...following.map(user => user.id), user.id]
                    }
                },
                orderBy: "createdAt_DESC"
            });
        }
    }
};