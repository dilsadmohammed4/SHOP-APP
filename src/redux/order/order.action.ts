import {createAsyncThunk} from "@reduxjs/toolkit";
import {OrderService} from "../../modules/orders/services/OrderService";
import {IOrderRequestView} from "../../modules/orders/models/IOrderRequestView";
import {IOrderResponseView} from "../../modules/orders/models/IOrderResponseView";
import {AuthUtils} from "../../utils/AuthUtils";

export const placeAnOrderAction: any = createAsyncThunk(
    "orders/placeAnOrderAction",
    async (
        payload: {
            order: IOrderRequestView;
        },
        {rejectWithValue}
    ): Promise<{ data: IOrderRequestView; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const {order} = payload;
                const response = await OrderService.placeAnOrder(order);
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

export const getAllOrdersAction: any = createAsyncThunk(
    "orders/getAllOrdersAction",
    async (
        payload: {},
        {rejectWithValue}
    ): Promise<{ data: IOrderResponseView[]; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const response = await OrderService.getAllOrders();
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

export const getMyOrdersAction: any = createAsyncThunk(
    "orders/getMyOrdersAction",
    async (
        payload: {},
        {rejectWithValue}
    ): Promise<{ data: IOrderResponseView[]; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const response = await OrderService.getMyOrders();
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

export const updateOrderStatusAction: any = createAsyncThunk(
    "orders/updateOrderStatusAction",
    async (
        payload: {
            orderStatus: string;
            orderId: string;
        },
        {rejectWithValue}
    ): Promise<{ data: IOrderResponseView[]; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const {orderStatus, orderId} = payload;
                const response = await OrderService.updateOrderStatus(
                    orderStatus,
                    orderId
                );
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
