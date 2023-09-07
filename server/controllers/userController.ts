import { Request, Response } from "express";
import { ThrowError, ThrowCustomMsgError } from "../utils/ErrorUtil";
import { APP_STATUS } from "../constants";
import { IUser } from "../models/IUser";
import { validationResult } from "express-validator";
import UserCollection from "../schemas/UserSchema";
import bcryptjs from "bcryptjs";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const registerUser = async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  try {
    //read data form data
    let { username, email, password } = request.body;

    //check if user is exists
    const userObj: IUser | undefined | null = await UserCollection.findOne({
      email: email,
    });
    if (userObj) {
      return response.status(400).json({
        status: APP_STATUS.FAILED,
        data: null,
        error: "User is already exists!",
      });
      
    }

    //password encryption
    const salt: string = await bcryptjs.genSalt(10);
    const hashPassword: string = await bcryptjs.hash(password, salt);

    //gravetar url
    const imageUrl: string = gravatar.url(email, {
      size: "200",
      rating: "pg",
      default: "mm",
    });

    //save to db

    const newUser: IUser = {
      email: email,
      imageUrl: imageUrl,
      isAdmin: false,
      password: hashPassword,
      username: username,
    };
    const theNewObj: IUser | undefined | null = await new UserCollection(
      newUser
    ).save();
    if (theNewObj) {
      return response.status(200).json({
        status: APP_STATUS.SUCCESS,
        data: theNewObj,
        msg: "Registration successful!",
      });
    }
  } catch (error: any) {
    return ThrowError(response, error);
  }
};

export const loginUser = async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  try {
    //read form data
    let { email, password } = request.body;

    //check email exits
    const userObj: IUser | undefined | null = await UserCollection.findOne({
      email: email,
    });
    if (!userObj) {
      return ThrowCustomMsgError(response, "Invalid email address!");
    }
    //check for password
    const isMatch: boolean = await bcryptjs.compare(password, userObj.password);
    if (!isMatch) {
      return ThrowCustomMsgError(response, "Invalid password!");
    }

    //create a token
    const secretKey: string | undefined = process.env.JWT_SECRET_KET;
    const payload: any = {
      user: {
        id: userObj._id,
        email: userObj.email,
      },
    };
    if (secretKey && payload) {
      jwt.sign(
        payload,
        secretKey,
        {
          expiresIn: 1000 * 60 * 60,
        },
        (error, encoded) => {
          if (error) throw error;
          if (encoded) {
            return response.status(200).json({
              status: APP_STATUS.SUCCESS,
              data: userObj,
              token: encoded,
              msg: "Login success",
            });
          }
        }
      );
    }
  } catch (error: any) {
    return ThrowError(response, error);
  }
};

export const getUsersData = async (request: Request, response: Response) => {
  try {
    const userObj: any = request.headers["user-data"];
    console.log(userObj);
    const userId = userObj.id;
    const mongoUserId = new mongoose.Types.ObjectId(userId);
    const userData: IUser | undefined | null = await UserCollection.findById(
      mongoUserId
    );
    if (userData) {
      return response.status(200).json({
        status: APP_STATUS.SUCCESS,
        data: userData,
        msg: "User fetched..",
      });
    }
  } catch (error: any) {
    return ThrowError(response, error);
  }
};

export const updateProfilePicture = async (
  request: Request,
  response: Response
) => {
  try {
  } catch (error: any) {
    return ThrowError(response, error);
  }
};

export const changePassword = async (request: Request, response: Response) => {
  try {
  } catch (error: any) {
    return ThrowError(response, error);
  }
};
