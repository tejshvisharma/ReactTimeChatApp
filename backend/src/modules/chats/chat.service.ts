
import { Chat, type IChat } from "../../infrastructure/db/models/chat.model";
import { paginate, type PaginatedResult } from "../../shared/utils/pagination";

export default class ChatService {
  static async getPaginatedChats({ userId, page, limit }: { userId: string; page: number; limit: number }) {
    // Use the paginate utility for paginated results
    const paginatedResult: PaginatedResult<any> = await paginate(
      Chat,
      { participants: userId },
      { page, limit },
      {},
      { lastMessageAt: -1 }
    );
    // Populate participants and lastMessage for each chat
    await Chat.populate(paginatedResult.data, [
      { path: "participants", select: "name email avatar" },
      { path: "lastMessage", select: "message" }
    ]);
    return paginatedResult;
  }

  static async getOrCreateChat(userId1: string, userId2: any) {
    let chat: IChat | null = await Chat.findOne({ participants: { $all: [userId1, userId2] } })
      .populate("participants", "name email avatar")
      .populate("lastMessage", "message");
    if (!chat) {
      const newChat: any = await Chat.create({ participants: [userId1, userId2] });
      await newChat.save();
      chat = newChat.populate("participants", "name email avatar");
    }
    
    const otherParticipants = chat?.participants.filter((p: any) => p._id.toString() !== userId1);

    return {  
      _id: chat?._id,
      participants: chat?.participants,
      lastMessage: chat?.lastMessage,
      lastMessageAt: chat?.lastMessageAt,
      otherParticipant: otherParticipants,
      createdAt: chat?.createdAt,
      updatedAt: chat?.updatedAt
    };
  }
}