import {createAsyncThunk} from "@reduxjs/toolkit";
import {ICartRequestView} from "../../modules/cart/models/ICartRequestView";
import {ICartResponseView} from "../../modules/cart/models/ICartResponseView";
import {CartService} from "../../modules/cart/services/CartService";
import {AuthUtils} from "../../utils/AuthUtils";

export const createCartAction: any = createAsyncThunk(
    "carts/createCartAction",
    async (
        payload: {
            cart: ICartRequestView;
        },
        {rejectWithValue}
    ): Promise<{ data: ICartResponseView; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const {cart} = payload;
                const response = await CartService.createCart(cart);
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

export const getCartInfoAction: any = createAsyncThunk(
    "carts/getCartInfoAction",
    async (
        payload: {},
        {rejectWithValue}
    ): Promise<{ data: ICartResponseView[]; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const response = await CartService.getCartInfo();
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
