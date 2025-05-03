import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Request, Response, NextFunction } from "express";

const generateAccessRefreshToken = async(userId:string):Promise<{
    accessToken:string;
    refreshToken:string;
}>=> {
    try {
        const user = await User.findById(userId);
        if(!user) {
            throw new ApiError(400, "user does not exist by id.");
        }
        const accessToken:string = user.generateAccessToken();
        const refreshToken:string = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({
            validateBeforeSave: false
        });

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "could not generate token");
    }
}


const registerUser = asyncHandler(async(req: Request, res: Response) => {
    const { fullName, email, password} = req.body;

    if([fullName, email, password].some(field => field?.trim() === "")) {
        throw new ApiError(400, "Please provide all required fields.");
    }

    const profileLocalPath = req.file?.path;

    if(!profileLocalPath) {
       throw new ApiError(404, "Image not fould");
    }

    const profileUrl = await uploadOnCloudinary(profileLocalPath as string);

    const user = await User.findOne({
        email:email
    });

    if(user) {
        throw new ApiError(400, "user already exist.");
    }

    const createUser = await User.create({
        email:email,
        fullName,
        password,
        profile:profileUrl?.url
    })

    if(!createUser) {
        throw new ApiError(401, "user not created.");
    }

    res.status(201)
    .json(
        new ApiResponse(200, createUser, "User created sussessfully.")
    );
});
 
const loginUser = asyncHandler(async(req: Request, res: Response) => {
    const { email, password } = req.body;

    if(!email || !password) {
        throw new ApiError(401, "email and password required");
    }

    const user = await User.findOne({email});

    if(!user) {
        throw new ApiError(404, "User not found");
    }

    const isMatch:boolean = await user.isPasswordCorrect(password as string);


    const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id as string);

    const loggedUser = await User.findById(user._id as string).select("-password -refreshToken");

    if(!loggedUser) {
        throw new ApiError(500, "User is not logged due to internal error.");
    }

    const options = {
        // httpOnly: true,
        secure: true
    }

    res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, loggedUser, "user loggin successfully")
        );
});
export { registerUser, loginUser };