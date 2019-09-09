import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        searchPost: async (_, args) => prisma.posts({
            where: {
                OR: [
                    { location_starts_with: args.term },
                    { captions_starts_with: args.term }
                ]
            }
        })
    }
}