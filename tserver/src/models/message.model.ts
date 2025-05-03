import mongoose, { Schema, Document, Types} from "mongoose";

export interface IMessage extends Document {
    sender: Types.ObjectId;
    content: string;
    chat: Types.ObjectId;
    readBy: Types.ObjectId[];
    attachMents?: {
        url: string;
        type: "image"|"video"|"file";
    }[];
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema: Schema<IMessage> = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        trim: true,
    },
    chat: {
        tyep: Schema.Types.ObjectId,
        reg: "Chat",
        required: true
    },
    readBy: [
        {
            type: Schema.Types.ObjectId,
            reg: "User"
        }
    ],
    attachMents: [
        {
            url: {
                type: String,
                required: true
            },
            type: {
                type: String,
                enum: ['image', 'video', 'file'
                ],
                required: true
            }
        }
    ]
},
{
    timestamps: true
})

//index for faster quering

messageSchema.index({
    chat: 1,
    createdAt: -1
})

export const Message = mongoose.model<IMessage>("Message", messageSchema);