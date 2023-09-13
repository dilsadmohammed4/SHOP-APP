import {Request, Response} from "express";
import {ThrowError} from "../utils/ErrorUtil";
import {APP_STATUS} from "../constants";
import {IUser} from "../models/IUser";
import {validationResult} from "express-validator";
import UserCollection from "../schemas/UserSchema";
import bcryptjs from "bcryptjs";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import * as UserUtil from "../utils/UserUtil";


/**
 * @usage : register user
 * @url : http://localhost:9000/api/users/register
 * @param : username, email, password
 * @method : POST
 * @access : PUBLIC
 */
export const registerUser = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()});
    }
    try {
        //read data form data
        let {username, email, password} = request.body;

        //check if user is exists
        const userObj: IUser | undefined | null = await UserCollection.findOne({
            email: email,
        });
        if (userObj) {
            return ThrowError(response, 400, "User is already exists!");
        }

        //password encryption
        const salt: string = await bcryptjs.genSalt(10);
        const hashPassword: string = await bcryptjs.hash(password, salt);

        //graveTar url
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

/**
 * @usage : login user
 * @url : http://localhost:9000/api/users/login
 * @param : email, password
 * @method : POST
 * @access : PUBLIC
 */
export const loginUser = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()});
    }

    try {
        //read form data
        let {email, password} = request.body;

        //check email exits
        const userObj: IUser | undefined | null = await UserCollection.findOne({
            email: email,
        });
        if (!userObj) {
            return ThrowError(response, 500, "Invalid email address!");
        }
        //check for password
        const isMatch: boolean = await bcryptjs.compare(password, userObj.password);
        if (!isMatch) {
            return ThrowError(response, 500, "Invalid password!");
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
                            msg: "Login successful!",
                        });
                    }
                }
            );
        }
    } catch (error: any) {
        return ThrowError(response, error);
    }
};
/**
 * @usage : get all users
 * @url : http://localhost:9000/api/users/me
 * @param : no-params
 * @method : GET
 * @access : PRIVATE
 */
export const getUsersData = async (request: Request, response: Response) => {
    try {
        const userData = await UserUtil.getUser(request, response);
        if (userData) {
            return response.status(200).json({
                status: APP_STATUS.SUCCESS,
                data: userData,
                msg: "User fetched!",
            });
        }
    } catch (error: any) {
        return ThrowError(response, error);
    }
};

/**
 * @usage : update profile picture
 * @url : http://localhost:9000/api/users/profile
 * @param : imageUrl
 * @method : POST
 * @access : PRIVATE
 */
export const updateProfilePicture = async (
    request: Request,
    response: Response
) => {
    try {
        const {imageUrl} = request.body;
        const userData: any = await UserUtil.getUser(request, response);
        if (userData) {
            userData.imageUrl = imageUrl;
            const userObj = await userData.save();
            if (userObj) {
                return response.status(200).json({
                    status: APP_STATUS.SUCCESS,
                    data: userObj,
                    msg: "Profile picture updated!",
                });
            }
        }
    } catch (error: any) {
        return ThrowError(response, error);
    }
};

/**
 * @usage : change the password
 * @url : http://localhost:9000/api/users/change-password
 * @param : password
 * @method : POST
 * @access : PRIVATE
 */

export const changePassword = async (request: Request, response: Response) => {
    try {
        const {password} = request.body;

        //password encryption
        const salt: string = await bcryptjs.genSalt(10);
        const hashPassword: string = await bcryptjs.hash(password, salt);
        const userData: any = await UserUtil.getUser(request, response);
        if (userData) {
            userData.password = hashPassword;
            const userObj = await userData.save();
            if (userObj) {
                return response.status(200).json({
                    status: APP_STATUS.SUCCESS,
                    data: userObj,
                    msg: "Password changed!",
                });
            }
        }
    } catch (error: any) {
        return ThrowError(response, error);
    }
};
