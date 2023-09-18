import {createAsyncThunk} from "@reduxjs/toolkit";
import {IAddressView} from "../../modules/users/models/IAddressView";
import {AddressService} from "../../modules/users/services/AddressService";
import {AuthUtils} from "../../utils/AuthUtils";

export const createNewAddressAction: any = createAsyncThunk(
    "addresses/createNewAddressAction",
    async (
        payload: {
            address: IAddressView;
        },
        {rejectWithValue}
    ): Promise<{ data: IAddressView; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const {address} = payload;
                const response = await AddressService.createNewAddress(address);
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

export const updateAddressAction: any = createAsyncThunk(
    "addresses/updateAddressAction",
    async (
        payload: {
            address: IAddressView;
            addressId: string;
        },
        {rejectWithValue}
    ): Promise<{ data: IAddressView; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const {address, addressId} = payload;
                const response = await AddressService.updateAddress(address, addressId);
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

export const getAddressInfoAction: any = createAsyncThunk(
    "addresses/getAddressInfoAction",
    async (
        payload: {},
        {rejectWithValue}
    ): Promise<{ data: IAddressView; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const response = await AddressService.getAddressInfo();
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

export const deleteAddressAction: any = createAsyncThunk(
    "addresses/deleteAddressAction",
    async (
        payload: {
            addressId: string;
        },
        {rejectWithValue}
    ): Promise<{ data: IAddressView; msg: string; status: string } | any> => {
        try {
            if (AuthUtils.isSetTokenToRequestHeader()) {
                const {addressId} = payload;
                const response = await AddressService.deleteAddress(addressId);
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
