import { User } from "../../infrastructure/db/models/user.model";

export class AuthService {
  static async getCurrentUser(userId: string) {
    const user = await User.findOne({ clerkId: userId }).select(
      "clerkId name email avatar createdAt updatedAt"
    );

    if (!user) {
      return null;
    }

    return user;
  }
  static async getUserByClerkId(clerkId: string) {
    const user = await User.findOne({ clerkId }).select(
      "clerkId name email avatar createdAt updatedAt"
    );

    if (!user) {
      return null;
    }

    return user;
  }

  static async saveUserFromClerk(user: any) {
    const { clerkId, name, email, avatar } = user;

    return await User.create(
      {
        clerkId,
        name: user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : user.emailAddress.split('@')[0] || "User",
        email: user.emailAddresses[0].emailAddress,
        avatar: user.imageUrl,
      },
    );
  }
}