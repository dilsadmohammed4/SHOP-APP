import axios from "axios";
import {IAddressView} from "../models/IAddressView";

export class AddressService {
    private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL
        ? process.env.REACT_APP_EXPRESS_SERVER_URL
        : "";

    /**
     * @usage : create new address
     * @url : http://localhost:9000/api/addresses/new
     * @param : name, email, mobile, flat, landmark, street, city, state, country, pinCode
     * @method : POST
     * @access : PRIVATE
     */
    public static createNewAddress(
        address: IAddressView
    ): Promise<{ data: { data: IAddressView; msg: string; status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/addresses/new`;
        return axios.post(dataUrl, address);
    }

    /**
     * @usage : update address
     * @url : http://localhost:9000/api/addresses/:addressId
     * @param : mobile, flat, landmark, street, city, state, country, pincode
     * @method : PUT
     * @access : PRIVATE
     */
    public static updateAddress(
        address: IAddressView,
        addressId: string
    ): Promise<{ data: { data: IAddressView; msg: string; status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/addresses/${addressId}`;
        return axios.put(dataUrl, address);
    }

    /**
     * @usage : get address
     * @url : http://localhost:9000/api/addresses/me
     * @param : no-param
     * @method : GET
     * @access : PRIVATE
     */
    public static getAddressInfo(): Promise<{
        data: { data: IAddressView; msg: string; status: string };
    }> {
        const dataUrl: string = `${this.serverUrl}/api/addresses/me`;
        return axios.get(dataUrl);
    }

    /**
     * @usage : delete address
     * @url : http://localhost:9000/api/addresses/:addressId
     * @param : no-param
     * @method : DELETE
     * @access : PRIVATE
     */
    public static deleteAddress(addressId: string): Promise<{
        data: { data: IAddressView; msg: string; status: string };
    }> {
        const dataUrl: string = `${this.serverUrl}/api/addresses/${addressId}`;
        return axios.delete(dataUrl);
    }
}
