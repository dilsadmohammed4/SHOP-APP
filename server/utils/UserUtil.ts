import {Request, Response} from "express";
import {IUser} from "../models/IUser";
import mongoose from "mongoose";
import {ThrowError} from "./ErrorUtil";
import UserCollection from "../schemas/UserSchema";

export const getUser = async (request: Request, response: Response) => {
    try {
        const payload: any = request.headers["user-data"];
        console.log(payload);
        let {id} = payload;
        if (!id) {
            return ThrowError(response, 401, "Invalid user request!");
        }
        const mongoUserId = new mongoose.Types.ObjectId(id);
        const userObj: IUser | undefined | null = await UserCollection.findById(
            mongoUserId
        );
        if (!userObj) {
            return ThrowError(response, 404, "User is not found");
        }
        return userObj;
    } catch (error) {
        return ThrowError(response);
    }
};
