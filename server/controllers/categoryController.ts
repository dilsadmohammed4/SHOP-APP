import {Request, Response} from "express";
import {ThrowError} from "../utils/ErrorUtil";
import * as UserUtil from "../utils/UserUtil";
import {ICategory, ISubCategory} from "../models/ICategory";
import {
    CategoryCollection,
    subCategoryCollection,
} from "../schemas/CategorySchema";
import {APP_STATUS} from "../constants";
import mongoose from "mongoose";

/**
 * @usage : create category
 * @url : http://localhost:9000/api/categories/
 * @param : name, description
 * @method : POST
 * @access : PRIVATE
 */
export const createCategory = async (request: Request, response: Response) => {
    try {
        const {name, description} = request.body;
        const theUser: any = await UserUtil.getUser(request, response);
        if (theUser) {
            //Check category is exits
            const categoryObj: ICategory | undefined | null =
                await CategoryCollection.findOne({name: name});
            if (categoryObj) {
                return ThrowError(response, 401, "Category is already exits!");
            }
            //Create
            const theCategory: ICategory = {
                name: name,
                description: description,
                subCategories: [] as ISubCategory[],
            };
            const savedCategory = await new CategoryCollection(theCategory).save();
            if (savedCategory) {
                return response.status(200).json({
                    status: APP_STATUS.SUCCESS,
                    data: savedCategory,
                    msg: "New category added!",
                });
            }
        }
    } catch (error: any) {
        return ThrowError(response, error);
    }
};

/**
 * @usage : create sub category
 * @url : http://localhost:9000/api/:categoryId
 * @param : name, description
 * @method : POST
 * @access : PRIVATE
 */
export const createSubCategory = async (
    request: Request,
    response: Response
) => {
    try {
        const {categoryId} = request.params;
        const mongoCategoryId = new mongoose.Types.ObjectId(categoryId);
        const {name, description} = request.body;
        const theUser: any = await UserUtil.getUser(request, response);
        if (theUser) {
            let theCategory: any = await CategoryCollection.findById(mongoCategoryId);
            if (theCategory) {
                let theSubCategory: any = await subCategoryCollection.findOne({name: name});
                if (theSubCategory) {
                    ThrowError(response, 401, "Subcategory is already exits!");
                }
                let theSub = await new subCategoryCollection({
                    name: name,
                    description: description,
                }).save();
                if (theSub) {
                    theCategory.subCategories.push(theSub);
                    let categoryObj: any = await theCategory.save();
                    if (categoryObj) {
                        return response.status(200).json({
                            status: APP_STATUS.SUCCESS,
                            data: categoryObj,
                            msg: "Subcategory added!",
                        });
                    }
                }
            }
        }
    } catch (error: any) {
        return ThrowError(response, error);
    }
};

/**
 * @usage : Get all category
 * @url : http://localhost:9000/api/categories/
 * @param : no-params
 * @method : GET
 * @access : PUBLIC
 */
export const getAllCategory = async (request: Request, response: Response) => {
    try {
        const categories: any = await CategoryCollection.find().populate({
            path: "subCategories",
            strictPopulate: false,
        });
        return response.status(200).json({
            status: APP_STATUS.SUCCESS,
            data: categories,
            msg: "All category fetched!",
        });
    } catch (error: any) {
        return ThrowError(response, error);
    }
};
