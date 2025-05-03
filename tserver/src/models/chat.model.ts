import mongoose, { Schema, Types, Document} from "mongoose";

export interface IChat extends Document {
    participants: Types.ObjectId[];
    isGroupChat: boolean;
    groupName?: string;
    groupAdmin?:Types.ObjectId;
    lastMessage?:Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const chatSchema: Schema<IChat> = new Schema (
{
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    isGroupChat: {
        type: Boolean,
        default: false
    },
    groupName: {
        type: String,
        trim: true,
        required: function() {
            return this.isGroupChat;
        }
    },
    groupAdmin: {
        type:Schema.Types.ObjectId,
        ref: "User",
        required: function() {
            return this.isGroupChat;
        }
    },
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref:"Message"
    }
},
{
    timestamps: true
}
);


export const Chat = mongoose.model<IChat>("Chat", chatSchema);