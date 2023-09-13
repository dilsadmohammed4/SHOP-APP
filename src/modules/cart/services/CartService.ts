import axios from "axios";
import {ICartRequestView} from "../models/ICartRequestView";
import {ICartResponseView} from "../models/ICartResponseView";

export class CartService {
    private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL
        ? process.env.REACT_APP_EXPRESS_SERVER_URL
        : "";

    /**
     * @usage : create a cart
     * @url : http://localhost:9000/api/carts
     * @param : products[{product, count, price}], total, tax, grandTotal
     * @method : POST
     * @access : PRIVATE
     */

    public static createCart(cart: ICartRequestView): Promise<{
        data: { data: ICartResponseView; msg: string; status: string };
    }> {
        const dataUrl: string = `${this.serverUrl}/api/carts`;
        return axios.post(dataUrl, cart);
    }

    /**
     * @usage : get cart info
     * @url : http://localhost:9000/api/carts/me
     * @param : np-params
     * @method : GET
     * @access : PRIVATE
     */

    public static getCartInfo(): Promise<{
        data: { data: ICartResponseView[]; msg: string; status: string };
    }> {
        const dataUrl: string = `${this.serverUrl}/api/carts/me`;
        return axios.get(dataUrl);
    }
}
