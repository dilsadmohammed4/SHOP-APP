import axios from "axios";
import { IProductRequestView } from "../models/IProductRequestView";
import { IProductResponseView } from "../models/IProductResponseView";
import { IProductView } from "../models/IProductView";

export class ProductService {
  private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL
    ? process.env.REACT_APP_EXPRESS_SERVER_URL
    : "";

  /**
   * @usage : create a product
   * @url : http://localhost:9000/api/products
   * @param : title, description, imageUrl, brand, price, quantity, catagoryId, subCatagoryId
   * @method : POST
   * @access : PRIVATE
   */

  public static createProduct(
    product: IProductRequestView
  ): Promise<{ data: { data: IProductView; msg: string; status: string } }> {
    const dataUrl: string = `${this.serverUrl}/api/products`;
    return axios.post(dataUrl, product);
  }
  /**
   * @usage : Update a product
   * @url : http://localhost:9000/api/products/:productId
   * @param : title, description, imageUrl, brand, price, quantity, catagoryId, subCatagoryId
   * @method : PUT
   * @access : PRIVATE
   */

  public static updateProduct(
    product: IProductRequestView,
    productId: string
  ): Promise<{ data: { data: IProductView; msg: string; status: string } }> {
    const dataUrl: string = `${this.serverUrl}/api/products/${productId}`;
    return axios.put(dataUrl, product);
  }
  /**
   * @usage : Get all product
   * @url : http://localhost:9000/api/products
   * @param : no-params
   * @method : GET
   * @access : PRIVATE
   */
  public static getAllProducts(): Promise<{
    data: { data: IProductResponseView[]; msg: string; status: string };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/products`;
    return axios.get(dataUrl);
  }
  /**
   * @usage : Get a product
   * @url : http://localhost:9000/api/products/:productId
   * @param : no-params
   * @method : GET
   * @access : PRIVATE
   */
  public static getAProduct(productId: string): Promise<{
    data: { data: IProductResponseView; msg: string; status: string };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/products/${productId}`;
    return axios.get(dataUrl);
  }
  /**
   * @usage : Delete a product
   * @url : http://localhost:9000/api/products/:productId
   * @param : no-params
   * @method : DELETE
   * @access : PRIVATE
   */
  public static deleteProduct(productId: string): Promise<{
    data: { data: IProductView; msg: string; status: string };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/products/${productId}`;
    return axios.delete(dataUrl);
  }
  /**
   * @usage : Get all products with catagory id
   * @url : http://localhost:9000/api/products/catagories/:catagoryId
   * @param : no-params
   * @method : GET
   * @access : PRIVATE
   */
  public static getAllProductsWithCategoryId(catagoryId: string): Promise<{
    data: { data: IProductResponseView[]; msg: string; status: string };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/products/catagories/${catagoryId}`;
    return axios.get(dataUrl);
  }
}
