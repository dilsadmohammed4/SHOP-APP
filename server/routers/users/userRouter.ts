import { Router, Request, Response } from "express";
import { tokenMiddleware } from "../../middlewares/tokenMiddleware";
import * as userController from "../../controllers/userController";
import { body } from "express-validator";
import { validateForm } from "../../middlewares/validateForm";

const userRouter: Router = Router();

/**
 * @usage : register user
 * @url : http://localhost:9000/api/users/register
 * @param : username, email, password
 * @method : POST
 * @access : PUBLIC
 */
userRouter.post(
  "/register",
  [
    body("username").not().isEmpty().withMessage("username is required"),
    body("email").isEmail().withMessage("email is required"),
    body("password")
      .isStrongPassword()
      .withMessage("password is required"),
  ],
  validateForm,
  async (request: Request, response: Response) => {
    await userController.registerUser(request, response);
  }
);

/**
 * @usage : login user
 * @url : http://localhost:9000/api/users/login
 * @param : email, password
 * @method : POST
 * @access : PUBLIC
 */
userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("email is required"),
    body("password")
      .isStrongPassword()
      .withMessage("password is required"),
  ],
  validateForm,
  async (request: Request, response: Response) => {
    await userController.loginUser(request, response);
  }
);

/**
 * @usage : get all users
 * @url : http://localhost:9000/api/users/me
 * @param : no-params
 * @method : GET
 * @access : PRIVATE
 */

userRouter.get(
  "/me",
  tokenMiddleware,
  async (request: Request, response: Response) => {
    await userController.getUsersData(request, response);
  }
);

/**
 * @usage : update profile picture
 * @url : http://localhost:9000/api/users/profile
 * @param : imageUrl
 * @method : POST
 * @access : PRIVATE
 */

userRouter.post(
  "/profile",
  [body("imageUrl").not().isEmpty().withMessage("imageUrl is required")],
  tokenMiddleware,
  validateForm,
  async (request: Request, response: Response) => {
    await userController.updateProfilePicture(request, response);
  }
);

/**
 * @usage : change the password
 * @url : http://localhost:9000/api/users/change-password
 * @param : password
 * @method : POST
 * @access : PRIVATE
 */

userRouter.post(
  "/change-password",
  [
    body("password")
      .not()
      .isStrongPassword()
      .withMessage("password is required"),
  ],
  tokenMiddleware,
  validateForm,
  async (request: Request, response: Response) => {
    await userController.changePassword(request, response);
  }
);

export default userRouter;
