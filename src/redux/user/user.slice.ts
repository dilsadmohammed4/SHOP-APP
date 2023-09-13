import {
    createSlice,
    isRejectedWithValue,
    SerializedError,
} from "@reduxjs/toolkit";
import {IUserView} from "../../modules/users/models/IUserView";
import {TokenUtil} from "../../utils/TokenUtil";
import {ToastUtils} from "../../utils/ToastUtils";
import * as userAction from "../user/user.action";

export const userFeatureKey = "userFeature";

export interface InitialState {
    loading: boolean;
    errorMessage: SerializedError;
    user: IUserView;
    token: string;
    isAuthenticated: boolean;
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    user: {} as IUserView,
    token: "",
    isAuthenticated: false,
};

export const userSlice = createSlice({
    name: "userSlice",
    initialState: initialState,
    reducers: {
        logoutAction: (state, action) => {
            state.user = {} as IUserView;
            state.token = "";
            TokenUtil.deleteToken();
            state.isAuthenticated = false;
            ToastUtils.displayInfoToast("Logged out!");
        },
    },
    extraReducers: (builder) => {
        /**
         *Register a user
         */
        builder
            .addCase(userAction.registerUserAction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(userAction.registerUserAction.fulfilled, (state, action) => {
                state.loading = false;
                ToastUtils.displaySuccessToast("Registration is success!");
            })
            .addCase(userAction.registerUserAction.rejected, (state, action) => {
                state.loading = false;
                ToastUtils.displayErrorToast("Registration is failed!");
                if (isRejectedWithValue(action)) {
                    state.errorMessage = action.error;
                }
            });

        /**
         *Login user
         */
        builder
            .addCase(userAction.loginUserAction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(userAction.loginUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.isAuthenticated = true;
                TokenUtil.saveToken(action.payload.token);
                ToastUtils.displaySuccessToast(action.payload.msg);
            })
            .addCase(userAction.loginUserAction.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = {} as IUserView;
                TokenUtil.deleteToken();
                ToastUtils.displayErrorToast("Login is failed!");
                if (isRejectedWithValue(action)) {
                    state.errorMessage = action.error;
                }
            });

        /**
         *Get all users
         */
        builder
            .addCase(userAction.getUserDataAction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(userAction.getUserDataAction.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.data;
                ToastUtils.displaySuccessToast("User fetched!");
            })
            .addCase(userAction.getUserDataAction.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = {} as IUserView;
                ToastUtils.displayErrorToast("User fetched failed!");
                if (isRejectedWithValue(action)) {
                    state.errorMessage = action.error;
                }
            });

        /**
         *Update profile picture
         */
        builder
            .addCase(
                userAction.updateProfilePictureAction.pending,
                (state, action) => {
                    state.loading = true;
                }
            )
            .addCase(
                userAction.updateProfilePictureAction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.isAuthenticated = true;
                    state.user = action.payload.data;
                    ToastUtils.displaySuccessToast("Profile picture updated!");
                }
            )
            .addCase(
                userAction.updateProfilePictureAction.rejected,
                (state, action) => {
                    state.loading = false;
                    state.isAuthenticated = false;
                    state.user = {} as IUserView;
                    ToastUtils.displayErrorToast("Failed to update profile picture!");
                    if (isRejectedWithValue(action)) {
                        state.errorMessage = action.error;
                    }
                }
            );

        /**
         *Change the password
         */
        builder
            .addCase(userAction.changePasswordAction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(userAction.changePasswordAction.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                ToastUtils.displaySuccessToast("Password changed!");
            })
            .addCase(userAction.changePasswordAction.rejected, (state, action) => {
                state.loading = false;
                state.user = {} as IUserView;
                ToastUtils.displayErrorToast("Password changed failed!");
                if (isRejectedWithValue(action)) {
                    state.errorMessage = action.error;
                }
            });
    },
});

export const {logoutAction} = userSlice.actions;
