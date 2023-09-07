import { Router, Request, Response } from "express";
import { tokenMiddleware } from "../../middlewares/tokenMiddleware";
import * as catagoryController from "../../controllers/catagoryController";
import { body } from "express-validator";
import { validateForm } from "../../middlewares/validateForm";

const catagoryRouter: Router = Router();

/**
 * @usage : create catagory
 * @url : http://localhost:9000/api/catagories/
 * @param : name, description
 * @method : POST
 * @access : PRIVATE
 */
catagoryRouter.post(
  "/",
  [
    body("name").not().isEmpty().withMessage("name is required"),
    body("description").not().isEmpty().withMessage("description is required"),
  ],
  tokenMiddleware,
  validateForm,
  async (request: Request, response: Response) => {
    await catagoryController.createCatagory(request, response);
  }
);

/**
 * @usage : create sub catagory
 * @url : http://localhost:9000/api/:catagoryId
 * @param : name, description
 * @method : POST
 * @access : PRIVATE
 */
catagoryRouter.post(
  "/:catagoryId",
  [
    body("name").not().isEmpty().withMessage("name is required"),
    body("description").not().isEmpty().withMessage("description is required"),
  ],
  tokenMiddleware,
  validateForm,
  async (request: Request, response: Response) => {
    await catagoryController.createSubCatagory(request, response);
  }
);

/**
 * @usage : Get all catagory
 * @url : http://localhost:9000/api/catagories/
 * @param : no-params
 * @method : GET
 * @access : PUBLIC
 */
catagoryRouter.post("/", async (request: Request, response: Response) => {
  await catagoryController.createSubCatagory(request, response);
});

export default catagoryRouter;
