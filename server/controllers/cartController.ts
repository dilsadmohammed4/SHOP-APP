import {Request, Response} from "express";
import {ThrowError} from "../utils/ErrorUtil";
import * as UserUtil from "../utils/UserUtil";
import CartCollection from "../schemas/CartSchema";
import {ICart} from "../models/ICart";
import mongoose from "mongoose";
import {APP_STATUS} from "../constants";

/**
 * @usage : create a cart
 * @url : http://localhost:9000/api/carts
 * @param : products[{product, count, price}], total, tax, grandTotal
 * @method : POST
 * @access : PRIVATE
 */
export const createCart = async (request: Request, response: Response) => {
    try {
        const theUser: any = await UserUtil.getUser(request, response);
        if (theUser) {
            const {products, total, tax, grandTotal} = request.body;
            const cart = await CartCollection.findOne({userObj: theUser._id});
            if (cart) {
                await CartCollection.findOneAndDelete({userObj: theUser._id});
            }
            const newCart: ICart = {
                products: products,
                total: total,
                tax: tax,
                grandTotal: grandTotal,
                userObj: theUser._id,
            };
            const theCart = await new CartCollection(newCart).save();
            if (!theCart) {
                return ThrowError(response, 400, "Cart creation failed!");
            }
            const actualCart = await CartCollection.findById(
                new mongoose.Types.ObjectId(theCart._id)
            ).populate({
                path: "userObj",
                strictPopulate: false,
            });
            return response.status(200).json({
                status: APP_STATUS.SUCCESS,
                data: actualCart,
                msg: "Cart added!",
            });
        }
    } catch (error: any) {
        return ThrowError(response, error);
    }
};

/**
 * @usage : get cart info
 * @url : http://localhost:9000/api/carts/me
 * @param : np-params
 * @method : GET
 * @access : PRIVATE
 */
export const getCartInfo = async (request: Request, response: Response) => {
    try {
        const theUser: any = await UserUtil.getUser(request, response);
        if (theUser) {
            const theCart = await CartCollection.find({
                userObj: new mongoose.Types.ObjectId(theUser._id),
            })
                .populate({
                    path: "products.product",
                    strictPopulate: false,
                })
                .populate({
                    path: "userObj",
                    strictPopulate: false,
                });
            return response.status(200).json({
                status: APP_STATUS.SUCCESS,
                data: theCart,
                msg: "Cart info fetched!",
            });
        }
    } catch (error: any) {
        return ThrowError(response, error);
    }
};
