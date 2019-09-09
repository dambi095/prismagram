import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        toggleLike: async (_, args, { request }) => {
            isAuthenticated(request);
            const { postId } = args;
            const { user } = request;
            const filterOptions = {
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        post: {
                            id: postId
                        }
                    }
                ]
            }

            try {
                // exists 속성을 사용하여 데이터베이스에 특정레코드가 있는지 확인할 수 있다.
                const existingLike = await prisma.$exists.like(filterOptions)
                if (existingLike) {
                    // 사용자가 준 like를 찾아 그걸 삭제할 것!
                    // user id와 poster id를 가지고 있는 ManyLikes를 지울 거야
                    await prisma.deleteManyLikes(filterOptions)
                } else {
                    await prisma.createLike({
                        user: {
                            connect: {
                                id: user.id
                            }
                        },
                        post: {
                            connect: {
                                id: postId
                            }
                        }
                    })
                }
                return true
            } catch (Error) {
                console.log("Error ", Error);
                return false
            }

        }
    }
}