import {Router, Request, Response} from "express";
import {tokenMiddleware} from "../../middlewares/tokenMiddleware";
import * as cartController from "../../controllers/cartController";
import {body} from "express-validator";
import {validateForm} from "../../middlewares/validateForm";

const cartRouter: Router = Router();

/**
 * @usage : create a cart
 * @url : http://localhost:9000/api/carts
 * @param : products[{product, count, price}], total, tax, grandTotal
 * @method : POST
 * @access : PRIVATE
 */
cartRouter.post(
    "/",
    [
        body("products").not().isEmpty().withMessage("products is required"),
        body("total").not().isEmpty().withMessage("total is required"),
        body("tax").not().isEmpty().withMessage("tax is required"),
        body("grandTotal").not().isEmpty().withMessage("grandTotal is required"),
    ],
    tokenMiddleware,
    validateForm,
    async (request: Request, response: Response) => {
        await cartController.createCart(request, response);
    }
);

/**
 * @usage : get cart info
 * @url : http://localhost:9000/api/carts/me
 * @param : np-params
 * @method : GET
 * @access : PRIVATE
 */
cartRouter.get(
    "/me",
    tokenMiddleware,
    async (request: Request, response: Response) => {
        await cartController.getCartInfo(request, response);
    }
);

export default cartRouter;
