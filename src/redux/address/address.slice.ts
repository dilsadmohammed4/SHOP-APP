import {
    createSlice,
    isRejectedWithValue,
    SerializedError,
} from "@reduxjs/toolkit";
import {ToastUtils} from "../../utils/ToastUtils";
import * as addressAction from "../address/address.action";
import {IAddressView} from "../../modules/users/models/IAddressView";

export const addressFeatureKey = "addressFeature";

export interface InitialState {
    loading: boolean;
    errorMessage: SerializedError;
    address: IAddressView;
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    address: {} as IAddressView
};

export const addressSlice = createSlice({
    name: "addressSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /**
         *Create new address
         */
        builder
            .addCase(
                addressAction.createNewAddressAction.pending,
                (state, action) => {
                    state.loading = true;
                }
            )
            .addCase(
                addressAction.createNewAddressAction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.address = action.payload.data;
                    ToastUtils.displaySuccessToast(action.payload.msg);
                }
            )
            .addCase(
                addressAction.createNewAddressAction.rejected,
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
            .addCase(addressAction.updateAddressAction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addressAction.updateAddressAction.fulfilled, (state, action) => {
                state.loading = false;
                state.address = action.payload.data;
                ToastUtils.displaySuccessToast(action.payload.msg);
            })
            .addCase(addressAction.updateAddressAction.rejected, (state, action) => {
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
            .addCase(addressAction.getAddressInfoAction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(
                addressAction.getAddressInfoAction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.address = action.payload.data;
                    ToastUtils.displaySuccessToast(action.payload.msg);
                }
            )
            .addCase(addressAction.getAddressInfoAction.rejected, (state, action) => {
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
            .addCase(addressAction.deleteAddressAction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addressAction.deleteAddressAction.fulfilled, (state, action) => {
                state.loading = false;
                state.address = {} as IAddressView;
                ToastUtils.displayInfoToast(action.payload.msg);
            })
            .addCase(addressAction.deleteAddressAction.rejected, (state, action) => {
                state.loading = false;
                ToastUtils.displayErrorToast("Unable to delete the address!");
                if (isRejectedWithValue(action)) {
                    state.errorMessage = action.error;
                }
            });
    },
});
