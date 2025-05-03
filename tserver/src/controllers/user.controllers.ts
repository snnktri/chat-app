import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Request, Response, NextFunction } from "express";


const registerUser = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const { fullName, email, password} = req.body;

    if([fullName, email, password].some(field => field?.trim() === "")) {
        throw new ApiError(400, "Please provide all required fields.");
    }

    const profileLocalPath = req.file?.path;

    if(!profileLocalPath) {
        new ApiError(404, "Image not fould");
    }

    const profileUrl = await uploadOnCloudinary(profileLocalPath as string);

    
    
})