import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        fullName: parent => {
            retrun`${parent.firstName} ${parent.lastName}`;
        },
        // 누군가 이 amIfollowing의 userProfile을 요구한사람이 이 UserProfile을 팔로잉했는가 확인을 위해
        isFollowing: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent; // parentId라고 불리는 변수에 id값 주입  

            try {
                // 우리가 요청한 유저(parentId)가 데이터베이스에 있고, 
                // 팔로워 리스트에 있는 id 중 요청한 유저(user)의 id(user.id)가 있어야 한다.
                const exists = await prisma.$exists.user({
                    AND: [
                        {
                            id: parentId
                        },
                        {
                            following_some: {
                                id: user.id
                            }
                        }]
                });
                return exists;
            } catch (e) {
                return false;
            }

        },
        // 요청하는 사람(parent)과 요청하는사람{request}이 같으면 내 프로필을 요청한다.
        isSelf: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        }
    }
}