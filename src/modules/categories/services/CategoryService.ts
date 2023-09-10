import axios from "axios";
import { ICategoryRequestView } from "../models/ICategoryRequestView";
import { ICategoryResponseView } from "../models/ICategoryResponseView";

export class CategoryService {
  private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL
    ? process.env.REACT_APP_EXPRESS_SERVER_URL
    : "";

  /**
   * @usage : create category
   * @url : http://localhost:9000/api/catagories/
   * @param : name, description
   * @method : POST
   * @access : PRIVATE
   */

  public static createCategory(category: ICategoryRequestView): Promise<{
    data: { data: ICategoryResponseView; msg: string; status: string };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/catagories/`;
    return axios.post(dataUrl, category);
  }
  /**
   * @usage : create sub category
   * @url : http://localhost:9000/api/catagories/:categoryId
   * @param : name, description
   * @method : POST
   * @access : PRIVATE
   */
  public static createSubCategory(
    category: ICategoryRequestView,
    categoryId: string
  ): Promise<{
    data: { data: ICategoryResponseView; msg: string; status: string };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/catagories/${categoryId}`;
    return axios.post(dataUrl, category);
  }
  /**
   * @usage : Get all category
   * @url : http://localhost:9000/api/catagories/
   * @param : no-params
   * @method : GET
   * @access : PUBLIC
   */
  public static getAllCategory(): Promise<{
    data: { data: ICategoryResponseView[]; msg: string; status: string };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/catagories`;
    return axios.get(dataUrl);
  }
}
