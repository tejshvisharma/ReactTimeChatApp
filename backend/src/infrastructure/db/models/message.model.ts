import mongoose,{ Schema, type Document}  from 'mongoose';

export interface IMessage extends Document {
    text: string;
    sender: mongoose.Types.ObjectId;
    chat: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
    text: {
        type: String,
        required: true,
        trim: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    }
}, {
    timestamps: true
});

MessageSchema.index({ chat: 1, createdAt: 1  }); //older one first

export const Message = mongoose.model<IMessage>('Message', MessageSchema);