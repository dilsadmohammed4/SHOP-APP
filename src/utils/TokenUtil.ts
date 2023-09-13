import {REACT_APP_JWT_TOKEN} from "../constants";

export class TokenUtil {
    public static saveToken(token: string) {
        if (REACT_APP_JWT_TOKEN) {
            sessionStorage.setItem(REACT_APP_JWT_TOKEN, token);
        }
    }

    public static getToken() {
        return sessionStorage.getItem(REACT_APP_JWT_TOKEN);
    }

    public static deleteToken() {
        return sessionStorage.removeItem(REACT_APP_JWT_TOKEN);
    }

    public static isLoggedIn() {
        let token = sessionStorage.getItem(REACT_APP_JWT_TOKEN);
        return !!token;
    }
}
