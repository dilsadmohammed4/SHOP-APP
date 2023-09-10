import axios from "axios";
import { IUserView } from "../models/IUserView";

export class UserService {
  private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL
    ? process.env.REACT_APP_EXPRESS_SERVER_URL
    : "";

  /**
   * @usage : register user
   * @url : http://localhost:9000/api/users/register
   * @param : username, email, password
   * @method : POST
   * @access : PUBLIC
   */

  public static registerUser(
    user: IUserView
  ): Promise<{ data: { data: IUserView; msg: string; status: string } }> {
    const dataUrl: string = `${this.serverUrl}/api/users/register`;
    return axios.post(dataUrl, user);
  }
  /**
   * @usage : login user
   * @url : http://localhost:9000/api/users/login
   * @param : email, password
   * @method : POST
   * @access : PUBLIC
   */
  public static loginUser(user: IUserView): Promise<{
    data: { data: IUserView; msg: string; status: string; token: string };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/users/login`;
    return axios.post(dataUrl, user);
  }
  /**
   * @usage : get all users
   * @url : http://localhost:9000/api/users/me
   * @param : no-params
   * @method : GET
   * @access : PRIVATE
   */
  public static getUserData(
    user: IUserView
  ): Promise<{ data: { data: IUserView; msg: string; status: string } }> {
    const dataUrl: string = `${this.serverUrl}/api/users/me`;
    return axios.get(dataUrl);
  }
  /**
   * @usage : update profile picture
   * @url : http://localhost:9000/api/users/profile
   * @param : imageUrl
   * @method : POST
   * @access : PRIVATE
   */
  public static updateProfilePicture(imageUrl: string): Promise<{
    data: { data: IUserView; msg: string; status: string };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/users/profile`;
    return axios.post(dataUrl, { imageUrl: imageUrl });
  }
  /**
   * @usage : change the password
   * @url : http://localhost:9000/api/users/change-password
   * @param : password
   * @method : POST
   * @access : PRIVATE
   */
  public static changePassword(password: string): Promise<{
    data: { data: IUserView; msg: string; status: string };
  }> {
    const dataUrl: string = `${this.serverUrl}/api/users/change-password`;
    return axios.post(dataUrl, { password: password });
  }
}
