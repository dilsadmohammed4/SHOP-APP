import {createAsyncThunk} from "@reduxjs/toolkit";
import {IProductRequestView} from "../../modules/products/models/IProductRequestView";
import {ProductService} from "../../modules/products/services/ProductService";
import {IProductView} from "../../modules/products/models/IProductView";
import {IProductResponseView} from "../../modules/products/models/IProductResponseView";
import {AuthUtils} from "../../utils/AuthUtils";

export const createProductAction: any = createAsyncThunk(
    "products/createProductAction",
    async (
        payload: {
            product: IProductRequestView;
        },
        {rejectWithValue}
    ): Promise<{ data: IProductView; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const {product} = payload;
                const response = await ProductService.createProduct(product);
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

export const updateProductAction: any = createAsyncThunk(
    "products/updateProductAction",
    async (
        payload: {
            product: IProductRequestView;
            productId: string;
        },
        {rejectWithValue}
    ): Promise<{ data: IProductView; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const {product, productId} = payload;
                const response = await ProductService.updateProduct(product, productId);
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

export const getAllProductsAction: any = createAsyncThunk(
    "products/getAllProductsAction",
    async (
        payload: {},
        {rejectWithValue}
    ): Promise<{ data: IProductResponseView[]; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const response = await ProductService.getAllProducts();
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

export const getAProductAction: any = createAsyncThunk(
    "products/getAProductAction",
    async (
        payload: {
            productId: string;
        },
        {rejectWithValue}
    ): Promise<{ data: IProductResponseView; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const {productId} = payload;
                const response = await ProductService.getAProduct(productId);
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

export const deleteProductAction: any = createAsyncThunk(
    "products/deleteProductAction",
    async (
        payload: {
            productId: string;
        },
        {rejectWithValue}
    ): Promise<{ data: IProductView; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const {productId} = payload;
                const response = await ProductService.deleteProduct(productId);
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

export const getAllProductsWithCategoryIdAction: any = createAsyncThunk(
    "products/getAllProductsWithCategoryIdAction",
    async (
        payload: {
            categoryId: string;
        },
        {rejectWithValue}
    ): Promise<{ data: IProductResponseView[]; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const {categoryId} = payload;
                const response = await ProductService.getAllProductsWithCategoryId(
                    categoryId
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
