import axios from "axios";
import {IOrderRequestView} from "../models/IOrderRequestView";
import {IOrderResponseView} from "../models/IOrderResponseView";

export class OrderService {
    private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL
        ? process.env.REACT_APP_EXPRESS_SERVER_URL
        : "";

    /**
     * @usage : place an order
     * @url : http://localhost:9000/api/orders/place
     * @param : products[{product, count, price}], total, tax, grandTotal, paymentType
     * @method : POST
     * @access : PRIVATE
     */
    public static placeAnOrder(order: IOrderRequestView): Promise<{
        data: { data: IOrderRequestView; msg: string; status: string };
    }> {
        const dataUrl: string = `${this.serverUrl}/api/orders/place`;
        return axios.post(dataUrl, order);
    }

    /**
     * @usage : get all orders
     * @url : http://localhost:9000/api/orders/all
     * @param : np-params
     * @method : GET
     * @access : PRIVATE
     */
    public static getAllOrders(): Promise<{
        data: { data: IOrderResponseView[]; msg: string; status: string };
    }> {
        const dataUrl: string = `${this.serverUrl}/api/orders/all`;
        return axios.get(dataUrl);
    }

    /**
     * @usage : get my orders
     * @url : http://localhost:9000/api/orders/me
     * @param : np-params
     * @method : GET
     * @access : PRIVATE
     */
    public static getMyOrders(): Promise<{
        data: { data: IOrderResponseView[]; msg: string; status: string };
    }> {
        const dataUrl: string = `${this.serverUrl}/api/orders/me`;
        return axios.get(dataUrl);
    }

    /**
     * @usage : update orders status
     * @url : http://localhost:9000/api/orders/:orderId
     * @param : orderStatus
     * @method : POST
     * @access : PRIVATE
     */
    public static updateOrderStatus(
        orderStatus: string,
        orderId: string
    ): Promise<{
        data: { data: IOrderResponseView[]; msg: string; status: string };
    }> {
        const dataUrl: string = `${this.serverUrl}/api/orders/${orderId}`;
        return axios.post(dataUrl, {orderStatus: orderStatus});
    }
}
