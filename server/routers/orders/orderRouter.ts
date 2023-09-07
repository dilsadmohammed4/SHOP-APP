import { Router, Request, Response } from "express";
import { tokenMiddleware } from "../../middlewares/tokenMiddleware";
import * as orderController from "../../controllers/orderController";
import { body } from "express-validator";
import { validateForm } from "../../middlewares/validateForm";

const orderRouter: Router = Router();

/**
 * @usage : place an order
 * @url : http://localhost:9000/api/orders/place
 * @param : products[{product, count, price}], total, tax, grandTotal, paymentType
 * @method : POST
 * @access : PRIVATE
 */
orderRouter.post(
  "/place",
  [
    body("products").not().isEmpty().withMessage("products is required"),
    body("total").not().isEmpty().withMessage("total is required"),
    body("tax").not().isEmpty().withMessage("tax is required"),
    body("grandTotal").not().isEmpty().withMessage("grandTotal is required"),
    body("paymentType").not().isEmpty().withMessage("paymentType is required"),
  ],
  tokenMiddleware,
  validateForm,
  async (request: Request, response: Response) => {
    await orderController.placeOrder(request, response);
  }
);

/**
 * @usage : get all orders
 * @url : http://localhost:9000/api/orders/all
 * @param : np-params
 * @method : GET
 * @access : PRIVATE
 */
orderRouter.get(
  "/all",
  tokenMiddleware,
  async (request: Request, response: Response) => {
    await orderController.getAllOrders(request, response);
  }
);

/**
 * @usage : get my orders
 * @url : http://localhost:9000/api/orders/me
 * @param : np-params
 * @method : GET
 * @access : PRIVATE
 */
orderRouter.get(
  "/me",
  tokenMiddleware,
  async (request: Request, response: Response) => {
    await orderController.getMyOrders(request, response);
  }
);

/**
 * @usage : update orders status
 * @url : http://localhost:9000/api/orders/:orderId
 * @param : orderStatus
 * @method : POST
 * @access : PRIVATE
 */
orderRouter.post(
  "/:orderId",
  [body("orderStatus").not().isEmpty().withMessage("orderStatus is required")],
  tokenMiddleware,
  validateForm,
  async (request: Request, response: Response) => {
    await orderController.updateOrderStatus(request, response);
  }
);

export default orderRouter;
