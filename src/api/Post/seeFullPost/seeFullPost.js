import { prisma } from "../../../../generated/prisma-client";
import { FULL_POST_FRAGEMNT } from "../../../fragments";

export default {
    Query: {
        seeFullPost: async (_, args) => {
            const { id } = args;
            return prisma.post({ id }).$fragment(FULL_POST_FRAGEMNT);
        }
    }
}