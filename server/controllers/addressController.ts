import { Request, Response } from "express";
import { ThrowError } from "../utils/ErrorUtil";
import * as UserUtil from "../utils/UserUtil";
import AddressCollection from "../schemas/AddressSchema";
import mongoose from "mongoose";
import { IAddress } from "../models/IAddress";
import { APP_STATUS } from "../constants";

/**
 * @usage : create new address
 * @url : http://localhost:9000/api/addresses/new
 * @param : name, email, mobile, flat, landmark, street, city, state, country, pinCode
 * @method : POST
 * @access : PRIVATE
 */
export const createNewAddress = async (
  request: Request,
  response: Response
) => {
  try {
    const { mobile, flat, landmark, street, city, state, country, pinCode } =
      request.body;
    const userData: any = await UserUtil.getUser(request, response);
    if (userData) {
      const addressObj = await AddressCollection.findOne({
        userObj: new mongoose.Types.ObjectId(userData._id),
      });
      if (addressObj) {
        return ThrowError(response, 400, "Address is already exists!");
      } else {
        const theAddress: IAddress = {
          name: userData.username,
          email: userData.email,
          mobile: mobile,
          flat: flat,
          landmark: landmark,
          street: street,
          city: city,
          state: state,
          country: country,
          pinCode: pinCode,
          userObj: userData._id,
        };
        const newAddress = await new AddressCollection(theAddress).save();
        if (newAddress) {
          return response.status(200).json({
            status: APP_STATUS.SUCCESS,
            data: newAddress,
            msg: "New shipping address added!",
          });
        }
      }
    }
  } catch (error: any) {
    return ThrowError(response, error);
  }
};

/**
 * @usage : update address
 * @url : http://localhost:9000/api/addresses/:addressId
 * @param : mobile, flat, landmark, street, city, state, country, pincode
 * @method : PUT
 * @access : PRIVATE
 */
export const updateAddress = async (request: Request, response: Response) => {
  try {
    const { addressId } = request.params;
    const mongoAddressId = new mongoose.Types.ObjectId(addressId);
    const { mobile, flat, landmark, street, city, state, country, pinCode } =
      request.body;
    const theUser: any = await UserUtil.getUser(request, response);
    if (theUser) {
      const theAddress: IAddress | undefined | null =
        await AddressCollection.findById(mongoAddressId);
      if (!theAddress) {
        return ThrowError(response, 404, "Address not found!");
      }
      const addressObj = await AddressCollection.findByIdAndUpdate(
        mongoAddressId,
        {
          $set: {
            name: theUser.username,
            email: theUser.email,
            mobile: mobile,
            flat: flat,
            landmark: landmark,
            street: street,
            city: city,
            state: state,
            country: country,
            pinCode: pinCode,
            userObj: theUser._id,
          },
        },
        { new: true }
      );
      if (addressObj) {
        return response.status(200).json({
          status: APP_STATUS.SUCCESS,
          data: addressObj,
          msg: "Shipping address is updated!",
        });
      }
    }
  } catch (error: any) {
    return ThrowError(response, error);
  }
};

/**
 * @usage : get address
 * @url : http://localhost:9000/api/addresses/me
 * @param : no-param
 * @method : GET
 * @access : PRIVATE
 */
export const getAddress = async (request: Request, response: Response) => {
  try {
    const theUser: any = await UserUtil.getUser(request, response);
    const addressObj: IAddress | undefined | null =
      await AddressCollection.findOne({
        userObj: new mongoose.Types.ObjectId(theUser._id),
      });
    if (!theUser) {
      return ThrowError(response, 404, "Address not found!");
    }
    if (addressObj) {
      return response.status(200).json({
        status: APP_STATUS.SUCCESS,
        data: addressObj,
        msg: "Shipping address details!",
      });
    }
  } catch (error: any) {
    return ThrowError(response, error);
  }
};

/**
 * @usage : delete address
 * @url : http://localhost:9000/api/addresses/:addressId
 * @param : no-param
 * @method : DELETE
 * @access : PRIVATE
 */
export const deleteAddress = async (request: Request, response: Response) => {
  try {
    const { addressId } = request.params;
    const theUser: any = await UserUtil.getUser(request, response);
    if (theUser) {
      const addressObj: IAddress | undefined | null =
        await AddressCollection.findById(
          new mongoose.Types.ObjectId(addressId)
        );
      if (!addressObj) {
        return ThrowError(response, 404, "Address not found!");
      }
      const theAddress: IAddress | undefined | null =
        await AddressCollection.findByIdAndDelete(
          new mongoose.Types.ObjectId(addressId)
        );
      if (theAddress) {
        return response.status(200).json({
          status: APP_STATUS.SUCCESS,
          data: theAddress,
          msg: "Shipping address deleted!",
        });
      }
    }
  } catch (error: any) {
    return ThrowError(response, error);
  }
};
