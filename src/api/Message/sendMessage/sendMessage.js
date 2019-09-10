import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
    Mutation: {
        sendMessage: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { roomId, message, toId } = args;
            let room;

            // room이 정의 되지 않았다면 새 room 만들어서 그 안에 메세지 넣기 
            if (roomId === undefined) {
                // 사용자가 스스로에게 보낼 수 없도록
                if (user.id !== toId) {
                    room = await prisma.createRoom({
                        participants: {
                            connect: [
                                {
                                    id: toId
                                },
                                {
                                    id: user.id
                                }
                            ]
                        }
                    }).$fragment(ROOM_FRAGMENT);
                }
            } else {
                room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
            }
            if (!room) {
                throw Error("Room not found");
            }

            const getTo = room.participants.filter(
                participant => participant.id !== user.id
            )[0]; // element 하나만 return 하지 않게 하기 위해 

            return prisma.createMessage({
                text: message,
                from: {
                    connect: {
                        id: user.id
                    }
                },
                to: {
                    connect: {
                        id: roomId ? getTo.id : toId
                    }
                },
                room: {
                    connect: {
                        id: room.id
                    }
                }
            });
        }
    }
}