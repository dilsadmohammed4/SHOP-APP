import {
    createSlice,
    isRejectedWithValue,
    SerializedError,
} from "@reduxjs/toolkit";
import {IUserView} from "../../modules/users/models/IUserView";
import {TokenUtil} from "../../utils/TokenUtil";
import {ToastUtils} from "../../utils/ToastUtils";
import * as userAction from "../user/user.action";
import {IAddressView} from "../../modules/users/models/IAddressView";

export const userFeatureKey = "userFeature";

export interface InitialState {
    loading: boolean;
    errorMessage: SerializedError;
    user: IUserView;
    token: string;
    isAuthenticated: boolean;
    address: IAddressView;
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    user: {} as IUserView,
    token: "",
    isAuthenticated: false,
    address: {} as IAddressView
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
            ToastUtils.displaySuccessToast("Logged out!");
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
                ToastUtils.displayErrorToast(action.payload.error);
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
                ToastUtils.displayErrorToast(action.payload.error);
                if (isRejectedWithValue(action)) {
                    state.errorMessage = action.payload.msg;
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
        /**
         *Create new address
         */
        builder
            .addCase(
                userAction.createNewAddressAction.pending,
                (state, action) => {
                    state.loading = true;
                }
            )
            .addCase(
                userAction.createNewAddressAction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.address = action.payload.data;
                    ToastUtils.displaySuccessToast(action.payload.msg);
                }
            )
            .addCase(
                userAction.createNewAddressAction.rejected,
                (state, action) => {
                    state.loading = false;
                    ToastUtils.displayErrorToast("Address creation is failed!");
                    if (isRejectedWithValue(action)) {
                        state.errorMessage = action.error;
                    }
                }
            );

        /**
         *Update address
         */
        builder
            .addCase(userAction.updateAddressAction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(userAction.updateAddressAction.fulfilled, (state, action) => {
                state.loading = false;
                state.address = action.payload.data;
                ToastUtils.displaySuccessToast(action.payload.msg);
            })
            .addCase(userAction.updateAddressAction.rejected, (state, action) => {
                state.loading = false;
                ToastUtils.displayErrorToast("Unable to update address!");
                if (isRejectedWithValue(action)) {
                    state.errorMessage = action.error;
                }
            });

        /**
         *Get address
         */
        builder
            .addCase(userAction.getAddressInfoAction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(
                userAction.getAddressInfoAction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.address = action.payload.data;
                }
            )
            .addCase(userAction.getAddressInfoAction.rejected, (state, action) => {
                state.loading = false;
                ToastUtils.displayErrorToast("Unable to get the address!");
                if (isRejectedWithValue(action)) {
                    state.errorMessage = action.error;
                }
            });
        /**
         *Delete address
         */
        builder
            .addCase(userAction.deleteAddressAction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(userAction.deleteAddressAction.fulfilled, (state, action) => {
                state.loading = false;
                state.address = {} as IAddressView;
                ToastUtils.displayInfoToast(action.payload.msg);
            })
            .addCase(userAction.deleteAddressAction.rejected, (state, action) => {
                state.loading = false;
                ToastUtils.displayErrorToast("Unable to delete the address!");
                if (isRejectedWithValue(action)) {
                    state.errorMessage = action.error;
                }
            });
    },
});

export const {logoutAction} = userSlice.actions;
