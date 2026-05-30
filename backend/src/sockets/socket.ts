import { Server as socketServer, type Socket  } from "socket.io";
import { Server as httpServer } from "http";
import { verifyToken } from "@clerk/express";
import { Message } from "../infrastructure/db/models/message.model";
import { User } from "../infrastructure/db/models/user.model";
import { Chat } from "../infrastructure/db/models/chat.model";
import { env } from "../config/env";
import { UnauthorizedError } from "../shared/errors/AppError";
// CustomSocket interface removed; use Socket type augmentation instead
const allowedOrigins: string[] = [
    env.CLIENT_URL,
    env.EXPO_MOBILE_APP_URL
];

export const onlineUsers: Map<string, string> = new Map();

export const initializeSocketServer = (server: httpServer) =>{
    const io = new socketServer(server, {
        cors: {
            origin: allowedOrigins,
        },
    });
    // verify socket connection - if the user is logged in, we will store the user id in the socket
    io.use(async (socket: Socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new UnauthorizedError("Token not found"));
        }

        try {
            const session = await verifyToken(
                token,
                { secretKey: env.CLERK_SECRET_KEY }
            );

            const clerkId = session.sub;

            const user = await User.findOne({ clerkId });

            if (!user) {
                return next(new UnauthorizedError("Unauthorized : User not found"));
            }

            (socket).userId = user._id.toString();

            next();

        } catch (error: any) {
            next(new UnauthorizedError(error.message || "Unauthorized : some internal error happens"));
        }
    });

    io.on('connection', (socket) => {
        const userId = socket.userId;
        if (userId) {
            onlineUsers.set(userId, socket.id);
        }
        // send the list of online user to newly connected client :
        socket.emit('onlineUsers', { userIds: Array.from(onlineUsers.keys()) });

        // send the newly connected user detail to all other connected users :
        socket.broadcast.emit('user-online', { userId });

        socket.join(`user-${userId}`);

        socket.on("join-chat", async (chatId: string) => {
            socket.join(`chat-${chatId}`);
        });

        socket.on("leave-chat", async (chatId: string) => {
            socket.leave(`chat-${chatId}`);
        });

        // handle sending messages :
        socket.on("send-message", async (data: { chatId: string, text: string,  }) => {
            try{
                const { chatId, text } = data;
                
                const chat = await Chat.findById({
                    _id: chatId,
                    participants: userId
                });

                if(!chat){
                    socket.emit('socket-error', { message: "Chat not found"});
                    return;
                }
                const message = await Message.create({  
                    chat: chatId, 
                    sender: userId, 
                    text
                });

                await message.save();

                chat.lastMessage = message._id;
                chat.lastMessageAt = message.createdAt;
                await chat.save();

                message.populate("sender", "name email avatar");
                // emit to chat room (for users inside the chat)
                io.to(`chat:${chatId}`).emit("new-message",  message);

                // emit to all participants personal rooms (for chat list view)
                for(const participantId of chat.participants){
                    io.to(`user:${participantId}`).emit('new-message', message);
                }
            }
            catch(err : any){
                socket.emit('socket-error', { message: err.message });
            }
        });

        // handle typing event :
        socket.on("typing", async (data: { chatId: string, isTyping: boolean }) => {
            const { chatId, isTyping } = data;
            io.to(`chat:${chatId}`).emit("typing", { isTyping });
        });

        socket.on("disconnect", () => {
            if (userId) {
                onlineUsers.delete(userId);
                socket.broadcast.emit('user-offline', { userId });
            }
        });
    });

    return io;
};