import { prisma } from "../../../../generated/prisma-client";
// import { USER_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        me: async (_, __, { request, isAuthenticated }) => {
            console.log("user parent :" , _)
            isAuthenticated(request);
            const { user } = request;
            // return prisma.user({ id: user.id }).$fragment(USER_FRAGMENT); : Prisma가 얼마나 깊게 들어가야 하는지 인식 가능하게 도와준다
            const userProfile = await prisma.user({ id: user.id });
            const posts = await prisma.user({ id: user.id }).posts();
            return {
                user: userProfile,
                posts
            }
        }
    },
    // prisma에서 확인 후 일치하는 데이터가 없다 싶으면 서버에 있는 데이터를 가져옴
    User: {
        fullName: (parent) => {
            // parent 는 나를 call한 resolver의 parent를 갖게 되는것
            return `${parent.firstName} ${parent.lastName}`
        }
    }
}