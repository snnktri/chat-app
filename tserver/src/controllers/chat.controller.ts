import { Chat } from "../models/chat.model.ts";
import { ApiError } from "../utils/ApiError.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { Message } from "../models/message.model.ts";
import { User } from "../models/user.model.ts";
import { Types } from "mongoose";
import { Response, Request} from 'express';
import { asyncHandler } from "../utils/asyncHandler.ts";

interface AuthenticatedRequest extends Request {
    user?:{
        _id:string;
        refreshToken:string| undefined;
    }
}

const createChat = asyncHandler(async(req: AuthenticatedRequest, res: Response) => {
    const { participantsId, isGroup, groupName } = req.body;

    const userId = req.user?._id;

    if(!participantsId || !Array.isArray(participantsId)) {
        throw new ApiError(400, "Participants are required.");
    }

    if(!isGroup) {
        const existingChat = await Chat.findOne({
            isGroupChat:false,
            participants: { $all: [new Types.ObjectId(userId),
                new Types.ObjectId(participantsId[0])
            ], $size: 2}
        });

        if(existingChat) {
            res.status(200).
            json(new ApiResponse(
                200, existingChat, "Existing individual chat retrived"
            ))
        }
    }

    const chat = await Chat.create({
        participants: [new Types.ObjectId(userId), ...participantsId.map(
            (id) => new Types.ObjectId(id))],
        isGroupChat: isGroup,
        groupName: isGroup ? groupName : undefined,
        groupAdmin: isGroup ? new Types.ObjectId(userId) : undefined,
    })

    res.status(201)
        .json(
            new ApiResponse(201, chat, "chat created successfully")
        );
});

const getUserChat = asyncHandler(async(req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?._id;

    const chats = await Chat.find({
        participants: new Types.ObjectId(userId)
    })
    .populate("participants", 'fullName profile')
    .populate("groupAdmin", 'fullName')
    .populate({
        path: "lastMessage",
        populate: {
            path: "sender",
            select: "fullName"
        }
    })
    .sort({ updatedAt: -1 })
    .lean();

    res.status(200).
    json(
        new ApiResponse(200, chats, "User chats retrieved successfully.")
    );
});


export { createChat, getUserChat }