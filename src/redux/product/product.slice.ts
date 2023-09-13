import {
    createSlice,
    isRejectedWithValue,
    SerializedError,
} from "@reduxjs/toolkit";
import {ToastUtils} from "../../utils/ToastUtils";
import * as productAction from "../product/product.action";
import {IProductResponseView} from "../../modules/products/models/IProductResponseView";

export const productFeatureKey = "productFeature";

export interface InitialState {
    loading: boolean;
    errorMessage: SerializedError;
    products: IProductResponseView[];
    product: IProductResponseView;
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    products: [] as IProductResponseView[],
    product: {} as IProductResponseView
};

export const productSlice = createSlice({
    name: "productSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /**
         *Create product
         */
        builder
            .addCase(
                productAction.createProductAction.pending,
                (state, action) => {
                    state.loading = true;
                }
            )
            .addCase(
                productAction.createProductAction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.product = action.payload.data;
                    ToastUtils.displaySuccessToast(action.payload.msg);
                }
            )
            .addCase(
                productAction.createProductAction.rejected,
                (state, action) => {
                    state.loading = false;
                    ToastUtils.displayErrorToast("Unable to add product!");
                    if (isRejectedWithValue(action)) {
                        state.errorMessage = action.error;
                    }
                }
            );
        /**
         *Update product
         */
        builder
            .addCase(
                productAction.updateProductAction.pending,
                (state, action) => {
                    state.loading = true;
                }
            )
            .addCase(
                productAction.updateProductAction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.product = action.payload.data;
                    ToastUtils.displaySuccessToast(action.payload.msg);
                }
            )
            .addCase(
                productAction.updateProductAction.rejected,
                (state, action) => {
                    state.loading = false;
                    ToastUtils.displayErrorToast("Unable to update product!");
                    if (isRejectedWithValue(action)) {
                        state.errorMessage = action.error;
                    }
                }
            );
        /**
         *Get all product
         */
        builder
            .addCase(
                productAction.getAllProductsAction.pending,
                (state, action) => {
                    state.loading = true;
                }
            )
            .addCase(
                productAction.getAllProductsAction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.products = action.payload.data;
                    ToastUtils.displaySuccessToast(action.payload.msg);
                }
            )
            .addCase(
                productAction.getAllProductsAction.rejected,
                (state, action) => {
                    state.loading = false;
                    ToastUtils.displayErrorToast("Unable to get all product!");
                    if (isRejectedWithValue(action)) {
                        state.errorMessage = action.error;
                    }
                }
            );
        /**
         *Get a product
         */
        builder
            .addCase(
                productAction.getAProductAction.pending,
                (state, action) => {
                    state.loading = true;
                }
            )
            .addCase(
                productAction.getAProductAction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.product = action.payload.data;
                    ToastUtils.displaySuccessToast(action.payload.msg);
                }
            )
            .addCase(
                productAction.getAProductAction.rejected,
                (state, action) => {
                    state.loading = false;
                    ToastUtils.displayErrorToast("Unable to get product!");
                    if (isRejectedWithValue(action)) {
                        state.errorMessage = action.error;
                    }
                }
            );
        /**
         *Delete product
         */
        builder
            .addCase(
                productAction.deleteProductAction.pending,
                (state, action) => {
                    state.loading = true;
                }
            )
            .addCase(
                productAction.deleteProductAction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.product = action.payload.data;
                    ToastUtils.displayWarningToast(action.payload.msg);
                }
            )
            .addCase(
                productAction.deleteProductAction.rejected,
                (state, action) => {
                    state.loading = false;
                    ToastUtils.displayErrorToast("Unable to delete product!");
                    if (isRejectedWithValue(action)) {
                        state.errorMessage = action.error;
                    }
                }
            );
        /**
         *Get all product with categoryId
         */
        builder
            .addCase(
                productAction.getAllProductsWithCategoryIdAction.pending,
                (state, action) => {
                    state.loading = true;
                }
            )
            .addCase(
                productAction.getAllProductsWithCategoryIdAction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.product = action.payload.data;
                    ToastUtils.displaySuccessToast(action.payload.msg);
                }
            )
            .addCase(
                productAction.getAllProductsWithCategoryIdAction.rejected,
                (state, action) => {
                    state.loading = false;
                    ToastUtils.displayErrorToast("Unable to get product by ID!");
                    if (isRejectedWithValue(action)) {
                        state.errorMessage = action.error;
                    }
                }
            );
    }
});

