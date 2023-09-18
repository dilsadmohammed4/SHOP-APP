import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserService} from "../../modules/users/services/UserService";
import {IUserView} from "../../modules/users/models/IUserView";
import {AuthUtils} from "../../utils/AuthUtils";

export const registerUserAction: any = createAsyncThunk(
    "users/registerUserAction",
    async (
        payload: {
            user: IUserView;
        },
        {rejectWithValue}
    ): Promise<{ data: null; msg: string; status: string } | any> => {
        try {
            const {user} = payload;
            const response = await UserService.registerUser(user);
            return response.data;
        } catch (error: any) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

export const loginUserAction: any = createAsyncThunk(
    "users/loginUserAction",
    async (
        payload: {
            user: IUserView;
        },
        {rejectWithValue}
    ): Promise<{ data: IUserView; msg: string; status: string; token: string } | any> => {
        try {
            const {user} = payload;
            const response = await UserService.loginUser(user);
            return response.data;
        } catch (error: any) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

export const getUserDataAction: any = createAsyncThunk(
    "users/getUserDataAction",
    async (
        payload: {},
        {rejectWithValue}
    ): Promise<{ data: IUserView; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const response = await UserService.getUserData();
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateProfilePictureAction: any = createAsyncThunk(
    "users/updateProfilePictureAction",
    async (
        payload: {
            imageUrl: string;
        },
        {rejectWithValue}
    ): Promise<{ data: IUserView; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const {imageUrl} = payload;
                const response = await UserService.updateProfilePicture(imageUrl);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

export const changePasswordAction: any = createAsyncThunk(
    "users/changePasswordAction",
    async (
        payload: {
            password: string;
        },
        {rejectWithValue}
    ): Promise<{ data: IUserView; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const {password} = payload;
                const response = await UserService.changePassword(password);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);
