import {
    createSlice,
    isRejectedWithValue,
    SerializedError,
} from "@reduxjs/toolkit";
import {ToastUtils} from "../../utils/ToastUtils";
import * as cartAction from "../cart/cart.action";
import {ICartResponseView} from "../../modules/cart/models/ICartResponseView";

export const cartFeatureKey = "cartFeature";

export interface InitialState {
    loading: boolean;
    errorMessage: SerializedError;
    cartProducts: ICartResponseView[];
    cartProduct: ICartResponseView;
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    cartProducts: [] as ICartResponseView[],
    cartProduct: {} as ICartResponseView
};

export const cartSlice = createSlice({
    name: "cartSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /**
         *Create cart
         */
        builder
            .addCase(
                cartAction.createCartAction.pending,
                (state, action) => {
                    state.loading = true;
                }
            )
            .addCase(
                cartAction.createCartAction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.cartProduct = action.payload.data;
                    ToastUtils.displaySuccessToast(action.payload.msg);
                }
            )
            .addCase(
                cartAction.createCartAction.rejected,
                (state, action) => {
                    state.loading = false;
                    ToastUtils.displayErrorToast("Cart creation failed!");
                    if (isRejectedWithValue(action)) {
                        state.errorMessage = action.error;
                    }
                }
            );
        /**
         *Get cart info
         */
        builder
            .addCase(
                cartAction.getCartInfoAction.pending,
                (state, action) => {
                    state.loading = true;
                }
            )
            .addCase(
                cartAction.getCartInfoAction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.cartProducts = action.payload.data;
                    ToastUtils.displaySuccessToast(action.payload.msg);
                }
            )
            .addCase(
                cartAction.getCartInfoAction.rejected,
                (state, action) => {
                    state.loading = false;
                    ToastUtils.displayErrorToast("Unable to get the cart!");
                    if (isRejectedWithValue(action)) {
                        state.errorMessage = action.error;
                    }
                }
            );
    }
});

