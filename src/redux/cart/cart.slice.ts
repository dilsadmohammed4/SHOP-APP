import {
    createSlice,
    isRejectedWithValue,
    SerializedError,
} from "@reduxjs/toolkit";
import {ToastUtils} from "../../utils/ToastUtils";
import * as cartAction from "../cart/cart.action";
import {CartNewResponseView, CartProductsEntity, ICartResponseView} from "../../modules/cart/models/ICartResponseView";
import {CartReduxService} from "../../modules/cart/models/ICartReduxService";

export const cartFeatureKey = "cartFeature";

export interface InitialState {
    loading: boolean;
    errorMessage: SerializedError;
    cartProducts: ICartResponseView;
    cartProduct: ICartResponseView;
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    cartProduct: {
        products: [] as CartProductsEntity[]
    } as ICartResponseView,
    cartProducts: {} as ICartResponseView
};

export const cartSlice = createSlice({
    name: "cartSlice",
    initialState: initialState,
    reducers: {
        addToCartAction: (state, action) => {
            const {product, count} = action.payload;
            state.cartProduct = CartReduxService.addToCartUtil(state.cartProduct, product, count);
        },
        deleteCartItemAction: (state, action) => {
            const {productId} = action.payload;
            state.cartProduct = CartReduxService.deleteProductItemUtill(state.cartProduct, productId);
        },
        incrProductQtyAction: (state, action) => {
            const {productId} = action.payload;
            state.cartProduct = CartReduxService.incrementProductQuantity(state.cartProduct, productId);
        },
        decrProductQtyAction: (state, action) => {
            const {productId} = action.payload;
            state.cartProduct = CartReduxService.decrementProductQuantity(state.cartProduct, productId);
        },
        clearCartAction: (state, action) => {

        }
    },
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

export const {
    addToCartAction,
    deleteCartItemAction,
    incrProductQtyAction,
    decrProductQtyAction,
    clearCartAction

} = cartSlice.actions;

