import {Router, Request, Response} from "express";
import {tokenMiddleware} from "../../middlewares/tokenMiddleware";
import * as categoryController from "../../controllers/categoryController";
import {body} from "express-validator";
import {validateForm} from "../../middlewares/validateForm";

const categoryRouter: Router = Router();

/**
 * @usage : create category
 * @url : http://localhost:9000/api/categories/
 * @param : name, description
 * @method : POST
 * @access : PRIVATE
 */
categoryRouter.post(
    "/",
    [
        body("name").not().isEmpty().withMessage("name is required"),
        body("description").not().isEmpty().withMessage("description is required"),
    ],
    tokenMiddleware,
    validateForm,
    async (request: Request, response: Response) => {
        await categoryController.createCategory(request, response);
    }
);

/**
 * @usage : create sub category
 * @url : http://localhost:9000/api/:categoryId
 * @param : name, description
 * @method : POST
 * @access : PRIVATE
 */
categoryRouter.post(
    "/:categoryId",
    [
        body("name").not().isEmpty().withMessage("name is required"),
        body("description").not().isEmpty().withMessage("description is required"),
    ],
    tokenMiddleware,
    validateForm,
    async (request: Request, response: Response) => {
        await categoryController.createSubCategory(request, response);
    }
);

/**
 * @usage : Get all category
 * @url : http://localhost:9000/api/categories/
 * @param : no-params
 * @method : GET
 * @access : PUBLIC
 */
categoryRouter.get("/", async (request: Request, response: Response) => {
    await categoryController.getAllCategory(request, response);
});

export default categoryRouter;
