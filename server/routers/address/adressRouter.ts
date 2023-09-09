import { Router, Request, Response } from "express";
import { tokenMiddleware } from "../../middlewares/tokenMiddleware";
import * as addressController from "../../controllers/addressController";
import { body } from "express-validator";
import { validateForm } from "../../middlewares/validateForm";

const addressRouter: Router = Router();

/**
 * @usage : create new address
 * @url : http://localhost:9000/api/addresses/new
 * @param : name, email, mobile, flat, landmark, street, city, state, country, pincode
 * @method : POST
 * @access : PRIVATE
 */
addressRouter.post(
  "/new",
  [
    body("mobile").not().isEmpty().withMessage("mobile is required"),
    body("flat").not().isEmpty().withMessage("flat is required"),
    body("landmark").not().isEmpty().withMessage("landmark is required"),
    body("street").not().isEmpty().withMessage("street is required"),
    body("city").not().isEmpty().withMessage("city is required"),
    body("state").not().isEmpty().withMessage("state is required"),
    body("country").not().isEmpty().withMessage("country is required"),
    body("pinCode").not().isEmpty().withMessage("pincode is required"),
  ],
  tokenMiddleware,
  validateForm,
  async (request: Request, response: Response) => {
    await addressController.createNewAddress(request, response);
  }
);

/**
 * @usage : update address
 * @url : http://localhost:9000/api/addresses/:addressId
 * @param : mobile, flat, landmark, street, city, state, country, pincode
 * @method : PUT
 * @access : PRIVATE
 */
addressRouter.put(
  "/:addressId",
  [
    body("mobile").not().isEmpty().withMessage("mobile is required"),
    body("flat").not().isEmpty().withMessage("flat is required"),
    body("landmark").not().isEmpty().withMessage("landmark is required"),
    body("street").not().isEmpty().withMessage("street is required"),
    body("city").not().isEmpty().withMessage("city is required"),
    body("state").not().isEmpty().withMessage("state is required"),
    body("country").not().isEmpty().withMessage("country is required"),
    body("pinCode").not().isEmpty().withMessage("pincode is required"),
  ],
  tokenMiddleware,
  validateForm,
  async (request: Request, response: Response) => {
    await addressController.updateAddress(request, response);
  }
);

/**
 * @usage : get address
 * @url : http://localhost:9000/api/addresses/me
 * @param : no-param
 * @method : GET
 * @access : PRIVATE
 */
addressRouter.get(
  "/me",
  tokenMiddleware,
  async (request: Request, response: Response) => {
    await addressController.getAddress(request, response);
  }
);

/**
 * @usage : delete address
 * @url : http://localhost:9000/api/addresses/:addressId
 * @param : no-param
 * @method : DELETE
 * @access : PRIVATE
 */
addressRouter.delete(
  "/:addressId",
  tokenMiddleware,
  async (request: Request, response: Response) => {
    await addressController.deleteAddress(request, response);
  }
);

export default addressRouter;
