import { Message } from "../models/message.model.ts";
import { User } from "../models/user.model.ts";
import { Chat } from "../models/chat.model.ts";
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { Types } from 'mongoose';
import { ApiError } from "../utils/ApiError.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { uploadOnCloudinary } from "../utils/cloudinary.ts";

interface AuthenticatedRequest extends Request {
    user?:{
        _id:string;
        refreshToken:string;
    }
}

interface IAttachement {
    url: string;
    type:'image' | 'video' | 'file';
}

const sentMessage = asyncHandler(async(req:AuthenticatedRequest, res:Response) =>{
    const { content, chatId } = req.body;

    const senderId = req.user?._id;

    if(!chatId || !senderId) {
        throw new ApiError(400, "Authorization and chatId required.");
    }

    if(!content && (!req.files || Object.keys(req.files).length === 0)) {
        throw new ApiError(400, "Content or attachements required");
    }

    const chatExists = await Chat.findById(chatId);
    if(!chatExists) {
        throw new ApiError(404, "Chat doesnot exists.");
    }

    const isParticipant = chatExists.participants.includes( new Types.ObjectId(senderId));

    if(!isParticipant) {
        throw new ApiError(403, "You are not authorize to particpate in chat.");
    }

    let attachement: IAttachement[] = [];

    // if(req.files && Object.keys(req.files).length >0) {
    //     const files = Array.isArray(req.files.attachments)
    // }

    if(req.file) {
        const filePath = req.file?.path;
        if(!filePath) {
            throw new ApiError(400, "Files required.");
        }
        const fileUrl = await uploadOnCloudinary(filePath as string);

        if(!fileUrl?.url) {
            throw new ApiError(500, "Failed uploade to cloudinary.");
        }

        attachement =[{
            url: fileUrl.url,
            type:  req.file.mimetype.startsWith('image/') ? 'image' 
            : req.file.mimetype.startsWith('video/') ? 'video' 
            : 'file'
        }]
    }

    const message = await Message.create({
        sender: senderId,
        content: content|| undefined,
        chat:chatId,
        readBy:[senderId],
        attachMents: attachement.length>0 ? attachement : undefined
    })

    const populateMessage = await Message.findById(message._id)
            .populate("sender", "fullName profile email")
            .lean();


    res.status(200)
    .json(
        new ApiResponse(200, populateMessage, "Message sent Successfully.")
    );

});


const getMessage = asyncHandler(async(req:AuthenticatedRequest, res:Response) => {
    const { chatId } = req.params;
    const userId = req.user?._id;

    if(!chatId) {
        throw new ApiError(400, "chat id required.");
    }

    const chat = await Chat.findById(chatId);

    if(!chat) {
        throw new ApiError(404, "chat not found.");
    }

    if(!chat.participants.includes(new Types.ObjectId(userId))){
        throw new ApiError(403, "Authorizaion required for chat.");
    }

    const message = await Message.find({chat:chatId}).sort({createAt: -1})
        .populate("sender", "fullName profile email").lean();

    res.status(200)
        .json(
            new ApiResponse(200, message, "Message retrived successfully")
        );
});

export { sentMessage, getMessage };

