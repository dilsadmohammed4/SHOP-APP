import {createAsyncThunk} from "@reduxjs/toolkit";
import {CategoryService} from "../../modules/categories/services/CategoryService";
import {ICategoryRequestView} from "../../modules/categories/models/ICategoryRequestView";
import {ICategoryResponseView} from "../../modules/categories/models/ICategoryResponseView";
import {AuthUtils} from "../../utils/AuthUtils";

export const createCategoryAction: any = createAsyncThunk(
    "categories/createCategoryAction",
    async (
        payload: {
            category: ICategoryRequestView;
        },
        {rejectWithValue}
    ): Promise<{ data: ICategoryResponseView; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const {category} = payload;
                const response = await CategoryService.createCategory(category);
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

export const createSubCategoryAction: any = createAsyncThunk(
    "categories/createSubCategoryAction",
    async (
        payload: {
            category: ICategoryRequestView;
            categoryId: string;
        },
        {rejectWithValue}
    ): Promise<{ data: ICategoryResponseView; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const {category, categoryId} = payload;
                const response = await CategoryService.createSubCategory(
                    category,
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

export const getAllCategoryAction: any = createAsyncThunk(
    "categories/getAllCategoryAction",
    async (
        payload: {},
        {rejectWithValue}
    ): Promise<{ data: ICategoryResponseView[]; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const response = await CategoryService.getAllCategory();
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
