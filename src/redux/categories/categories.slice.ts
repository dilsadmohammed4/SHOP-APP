import {
    createSlice,
    isRejectedWithValue,
    SerializedError,
} from "@reduxjs/toolkit";
import {ToastUtils} from "../../utils/ToastUtils";
import * as categoryAction from "../categories/categories.action";
import {ICategoryResponseView} from "../../modules/categories/models/ICategoryResponseView";

export const categoryFeatureKey = "categoryFeature";

export interface InitialState {
    loading: boolean;
    errorMessage: SerializedError;
    categories: ICategoryResponseView[];
    category: ICategoryResponseView
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    categories: [] as ICategoryResponseView[],
    category: {} as ICategoryResponseView
};

export const categorySlice = createSlice({
    name: "categorySlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /**
         *Create Category
         */
        builder
            .addCase(
                categoryAction.createCategoryAction.pending,
                (state, action) => {
                    state.loading = true;
                }
            )
            .addCase(
                categoryAction.createCategoryAction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.category = action.payload.data;
                    ToastUtils.displaySuccessToast(action.payload.msg);
                }
            )
            .addCase(
                categoryAction.createCategoryAction.rejected,
                (state, action) => {
                    state.loading = false;
                    ToastUtils.displayErrorToast("Category creation failed!");
                    if (isRejectedWithValue(action)) {
                        state.errorMessage = action.error;
                    }
                }
            );
        /**
         *Create Sub Category
         */
        builder
            .addCase(
                categoryAction.createSubCategoryAction.pending,
                (state, action) => {
                    state.loading = true;
                }
            )
            .addCase(
                categoryAction.createSubCategoryAction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.category = action.payload.data;
                    ToastUtils.displaySuccessToast(action.payload.msg);
                }
            )
            .addCase(
                categoryAction.createSubCategoryAction.rejected,
                (state, action) => {
                    state.loading = false;
                    ToastUtils.displayErrorToast("SuCategory creation failed!");
                    if (isRejectedWithValue(action)) {
                        state.errorMessage = action.error;
                    }
                }
            );
        /**
         *Get all Category
         */
        builder
            .addCase(
                categoryAction.getAllCategoryAction.pending,
                (state, action) => {
                    state.loading = true;
                }
            )
            .addCase(
                categoryAction.getAllCategoryAction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.categories = action.payload.data;
                }
            )
            .addCase(
                categoryAction.getAllCategoryAction.rejected,
                (state, action) => {
                    state.loading = false;
                    ToastUtils.displayErrorToast("Get all categories failed!");
                    if (isRejectedWithValue(action)) {
                        state.errorMessage = action.error;
                    }
                }
            );
    }
});

