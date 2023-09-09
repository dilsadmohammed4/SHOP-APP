import { Request, Response } from "express";
import { ThrowError } from "../utils/ErrorUtil";
import * as UserUtil from "../utils/UserUtil";
import { ICategory, ISubCategory } from "../models/ICatagory";
import {
  CategoryCollection,
  subCategoryCollection,
} from "../schemas/CatagorySchema";
import { APP_STATUS } from "../constants";
import mongoose from "mongoose";
/**
 * @usage : create catagory
 * @url : http://localhost:9000/api/catagories/
 * @param : name, description
 * @method : POST
 * @access : PRIVATE
 */
export const createCatagory = async (request: Request, response: Response) => {
  try {
    const { name, description } = request.body;
    const theUser: any = await UserUtil.getUser(request, response);
    if (theUser) {
      //Check catagory is exits
      const categoryObj: ICategory | undefined | null =
        await CategoryCollection.findOne({ name: name });
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
          msg: "New category id created!",
        });
      }
    }
  } catch (error: any) {
    return ThrowError(response, error);
  }
};

/**
 * @usage : create sub catagory
 * @url : http://localhost:9000/api/:catagoryId
 * @param : name, description
 * @method : POST
 * @access : PRIVATE
 */
export const createSubCatagory = async (
  request: Request,
  response: Response
) => {
  try {
    const { categoryId } = request.params;
    const mongoCategoryId = new mongoose.Types.ObjectId(categoryId);
    const { name, description } = request.body;
    const theUser: any = await UserUtil.getUser(request, response);
    if (theUser) {
      let theCategory = await CategoryCollection.findById(mongoCategoryId);
      if (!theCategory) {
        return ThrowError(response, 404, "Category is already exits!");
      }
      let theSub = await subCategoryCollection.findOne({ name: name });
      if (theSub) {
        ThrowError(response, 401, "SubCategory is already exits!");
      }
      let theSubCategory = await new subCategoryCollection({
        name: name,
        description: description,
      }).save();
      if (theSubCategory) {
        theCategory.subCategories.push(theSubCategory);
        let catagoryObj = await theCategory.save();
        if (catagoryObj) {
          return response.status(200).json({
            status: APP_STATUS.SUCCESS,
            data: catagoryObj,
            msg: "Sub category id created!",
          });
        }
      }
    }
  } catch (error: any) {
    return ThrowError(response, error);
  }
};

/**
 * @usage : Get all catagory
 * @url : http://localhost:9000/api/catagories/
 * @param : no-params
 * @method : GET
 * @access : PUBLIC
 */
export const getAllCatagory = async (request: Request, response: Response) => {
  try {
    const categories: any = await CategoryCollection.find().populate({
      path: "subCategories",
      strictPopulate: false,
    });
    return response.status(200).json({
      status: APP_STATUS.SUCCESS,
      data: categories,
      msg: "All Catagory fetched!",
    });
  } catch (error: any) {
    return ThrowError(response, error);
  }
};
