import {Request, Response} from "express";
import {ThrowError} from "../utils/ErrorUtil";
import OrderCollection from "../schemas/OrderSchema";
import * as UserUtil from "../utils/UserUtil";
import {IOrder} from "../models/IOrder";
import mongoose from "mongoose";
import {APP_STATUS} from "../constants";

/**
 * @usage : place an order
 * @url : http://localhost:9000/api/orders/place
 * @param : products[{product, count, price}], total, tax, grandTotal, paymentType
 * @method : POST
 * @access : PRIVATE
 */
export const placeOrder = async (request: Request, response: Response) => {
    try {
        const theUser: any = await UserUtil.getUser(request, response);
        if (theUser) {
            const {products, total, tax, grandTotal, paymentType} = request.body;
            const newOrder: IOrder = {
                products: products,
                total: total,
                tax: tax,
                grandTotal: grandTotal,
                orderBy: theUser._id,
                paymentType: paymentType,
            };
            const theOrder = await new OrderCollection(newOrder).save();
            if (!theOrder) {
                return ThrowError(response, 400, "Order creation failed!");
            }
            const actualOrder = await OrderCollection.findById(
                new mongoose.Types.ObjectId(theOrder._id)
            ).populate({
                path: "userObj",
                strictPopulate: false,
            });
            return response.status(200).json({
                status: APP_STATUS.SUCCESS,
                data: actualOrder,
                msg: "Order added!",
            });
        }
    } catch (error: any) {
        return ThrowError(response, error);
    }
};

/**
 * @usage : get all orders
 * @url : http://localhost:9000/api/orders/all
 * @param : np-params
 * @method : GET
 * @access : PRIVATE
 */
export const getAllOrders = async (request: Request, response: Response) => {
    try {
        const theUser: any = await UserUtil.getUser(request, response);
        if (theUser) {
            const orders = await OrderCollection.find()
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
                data: orders,
                msg: "Order fetched!",
            });
        }
    } catch (error: any) {
        return ThrowError(response, error);
    }
};

/**
 * @usage : get my orders
 * @url : http://localhost:9000/api/orders/me
 * @param : no-params
 * @method : GET
 * @access : PRIVATE
 */
export const getMyOrders = async (request: Request, response: Response) => {
    try {
        const theUser: any = await UserUtil.getUser(request, response);
        if (theUser) {
            const orders = await OrderCollection.find({
                orderBy: new mongoose.Types.ObjectId(theUser._id),
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
                data: orders,
                msg: "Order fetched!",
            });
        }
    } catch (error: any) {
        return ThrowError(response, error);
    }
};

/**
 * @usage : update orders status
 * @url : http://localhost:9000/api/orders/:orderId
 * @param : orderStatus
 * @method : POST
 * @access : PRIVATE
 */
export const updateOrderStatus = async (
    request: Request,
    response: Response
) => {
    try {
        const {orderId} = request.params;
        const {orderStatus} = request.body;
        const mongoOrderId = new mongoose.Types.ObjectId(orderId);
        const theUser: any = await UserUtil.getUser(request, response);
        if (theUser) {
            const theOrder: IOrder | any = await OrderCollection.findById(
                mongoOrderId
            );
            if (!theOrder) {
                return ThrowError(response, 400, "No order found!");
            }
            theOrder.orderStatus = orderStatus;
            await theOrder.save();
            const theActualOrder = await OrderCollection.findById(mongoOrderId)
                .populate({
                    path: "products.product",
                    strictPopulate: false,
                })
                .populate({
                    path: "orderBy",
                    strictPopulate: false,
                });
            return response.status(200).json({
                status: APP_STATUS.SUCCESS,
                data: theActualOrder,
                msg: "Order status Updated!",
            });
        }
    } catch (error: any) {
        return ThrowError(response, error);
    }
};
