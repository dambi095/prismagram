import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
    Mutation: {
        editPost: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { id, captions, location, action } = args;
            const { user } = request; // 토큰에서 온 값 
            const post = await prisma.$exists.post({
                id,
                user: { id: user.id }
            });

            if (post) {
                if (action === EDIT) {
                    return prisma.updatePost({
                        data: {
                            captions,
                            location
                        },
                        where: {
                            id
                        }
                    })
                } else if (action === DELETE) {
                    return prisma.deletePost({id});
                }
            } else {
                throw Error("You can't do that !");
            }
        }
    }
}