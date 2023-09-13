import {
    createSlice,
    isRejectedWithValue,
    SerializedError,
} from "@reduxjs/toolkit";
import {ToastUtils} from "../../utils/ToastUtils";
import * as orderAction from "../order/order.action";
import {IOrderResponseView} from "../../modules/orders/models/IOrderResponseView";

export const orderFeatureKey = "orderFeature";

export interface InitialState {
    loading: boolean;
    errorMessage: SerializedError;
    orderProducts: IOrderResponseView[];
    orderProduct: IOrderResponseView
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    orderProducts: [] as IOrderResponseView[],
    orderProduct: {} as IOrderResponseView
};

export const orderSlice = createSlice({
    name: "orderSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /**
         *Place order
         */
        builder
            .addCase(
                orderAction.placeAnOrderAction.pending,
                (state, action) => {
                    state.loading = true;
                }
            )
            .addCase(
                orderAction.placeAnOrderAction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.orderProduct = action.payload.data;
                    ToastUtils.displaySuccessToast(action.payload.msg);
                }
            )
            .addCase(
                orderAction.placeAnOrderAction.rejected,
                (state, action) => {
                    state.loading = false;
                    ToastUtils.displayErrorToast("Order creation failed!");
                    if (isRejectedWithValue(action)) {
                        state.errorMessage = action.error;
                    }
                }
            );
        /**
         *Get all order
         */
        builder
            .addCase(
                orderAction.getAllOrdersAction.pending,
                (state, action) => {
                    state.loading = true;
                }
            )
            .addCase(
                orderAction.getAllOrdersAction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.orderProducts = action.payload.data;
                    ToastUtils.displaySuccessToast(action.payload.msg);
                }
            )
            .addCase(
                orderAction.getAllOrdersAction.rejected,
                (state, action) => {
                    state.loading = false;
                    ToastUtils.displayErrorToast("Unable to get all order!");
                    if (isRejectedWithValue(action)) {
                        state.errorMessage = action.error;
                    }
                }
            );
        /**
         *Get my order
         */
        builder
            .addCase(
                orderAction.getMyOrdersAction.pending,
                (state, action) => {
                    state.loading = true;
                }
            )
            .addCase(
                orderAction.getMyOrdersAction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.orderProducts = action.payload.data;
                    ToastUtils.displaySuccessToast(action.payload.msg);
                }
            )
            .addCase(
                orderAction.getMyOrdersAction.rejected,
                (state, action) => {
                    state.loading = false;
                    ToastUtils.displayErrorToast("Unable to get my order!");
                    if (isRejectedWithValue(action)) {
                        state.errorMessage = action.error;
                    }
                }
            );
        /**
         *Update order status
         */
        builder
            .addCase(
                orderAction.updateOrderStatusAction.pending,
                (state, action) => {
                    state.loading = true;
                }
            )
            .addCase(
                orderAction.updateOrderStatusAction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.orderProducts = action.payload.data;
                    ToastUtils.displaySuccessToast(action.payload.msg);
                }
            )
            .addCase(
                orderAction.updateOrderStatusAction.rejected,
                (state, action) => {
                    state.loading = false;
                    ToastUtils.displayErrorToast("Unable to update status!");
                    if (isRejectedWithValue(action)) {
                        state.errorMessage = action.error;
                    }
                }
            );

    }
});

