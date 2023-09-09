import { Request, Response } from "express";
import { ThrowError } from "../utils/ErrorUtil";
import * as UserUtil from "../utils/UserUtil";
import { IProduct } from "../models/IProduct";
import ProductCollection from "../schemas/ProductSchema";
import { APP_STATUS } from "../constants";
import mongoose, { mongo } from "mongoose";

/**
 * @usage : create a product
 * @url : http://localhost:9000/api/products
 * @param : title, description, imageUrl, brand, price, quantity, catagoryId, subCatagoryId
 * @method : POST
 * @access : PRIVATE
 */
export const createProduct = async (request: Request, response: Response) => {
  try {
    const {
      title,
      description,
      imageUrl,
      brand,
      price,
      quantity,
      catagoryId,
      subCatagoryId,
    } = request.body;
    const theUser: any = await UserUtil.getUser(request, response);
    if (theUser) {
      const theProduct: IProduct | undefined | null =
        await ProductCollection.findOne({ title: title });
      if (theProduct) {
        return ThrowError(response, 401, "Product is already exits!");
      }
      const newProduct: IProduct = {
        title: title,
        description: description,
        imageUrl: imageUrl,
        brand: brand,
        price: price,
        quantity: quantity,
        userobj: theUser._id,
        categoryObj: catagoryId,
        subCategoryObj: subCatagoryId,
      };
      const createdProduct = await new ProductCollection(newProduct).save();
      if (createdProduct) {
        return response.status(200).json({
          status: APP_STATUS.SUCCESS,
          data: createdProduct,
          msg: "New Product added!",
        });
      }
    }
  } catch (error: any) {
    return ThrowError(response, error);
  }
};

/**
 * @usage : Update a product
 * @url : http://localhost:9000/api/products/:productId
 * @param : title, description, imageUrl, brand, price, quantity, catagoryId, subCatagoryId
 * @method : PUT
 * @access : PRIVATE
 */
export const updateProduct = async (request: Request, response: Response) => {
  try {
    const { productId } = request.params;
    const mongoProductId = new mongoose.Types.ObjectId(productId);
    const {
      title,
      description,
      imageUrl,
      brand,
      price,
      quantity,
      catagoryId,
      subCatagoryId,
    } = request.body;
    const theUser: any = await UserUtil.getUser(request, response);
    if (theUser) {
      const theProduct: IProduct | undefined | null =
        await ProductCollection.findById(mongoProductId);
      if (!theProduct) {
        return ThrowError(response, 401, "Product is not exits!");
      }
      const newProduct: IProduct = {
        title: title,
        description: description,
        imageUrl: imageUrl,
        brand: brand,
        price: price,
        quantity: quantity,
        userobj: theUser._id,
        categoryObj: catagoryId,
        subCategoryObj: subCatagoryId,
      };
      const updatedProduct = await ProductCollection.findByIdAndUpdate(
        mongoProductId,
        {
          $set: newProduct,
        },
        { new: true }
      );
      if (updatedProduct) {
        return response.status(200).json({
          status: APP_STATUS.SUCCESS,
          data: updatedProduct,
          msg: "Product updated successfully!",
        });
      }
    }
  } catch (error: any) {
    return ThrowError(response, error);
  }
};

/**
 * @usage : Get all product
 * @url : http://localhost:9000/api/products
 * @param : no-params
 * @method : GET
 * @access : PRIVATE
 */
export const getAllProducts = async (request: Request, response: Response) => {
  try {
    const theUser: any = await UserUtil.getUser(request, response);
    if (theUser) {
      const theProducts: IProduct[] | any = await ProductCollection.find()
        .populate({
          path: "userobj",
          strictPopulate: false,
        })
        .populate({
          path: "categoryObj",
          strictPopulate: false,
        })
        .populate({
          path: "subCategoryObj",
          strictPopulate: false,
        });
      return response.status(200).json({
        status: APP_STATUS.SUCCESS,
        data: theProducts,
        msg: "Product fetched!",
      });
    }
  } catch (error: any) {
    return ThrowError(response, error);
  }
};

/**
 * @usage : Get a product
 * @url : http://localhost:9000/api/products/:productId
 * @param : no-params
 * @method : GET
 * @access : PRIVATE
 */
export const getProduct = async (request: Request, response: Response) => {
  try {
    const { productId } = request.params;
    const mongoProductId = new mongoose.Types.ObjectId(productId);
    const theUser: any = await UserUtil.getUser(request, response);
    if (theUser) {
      const theProduct: IProduct | any = await ProductCollection.findById(
        mongoProductId
      )
        .populate({
          path: "userobj",
          strictPopulate: false,
        })
        .populate({
          path: "categoryObj",
          strictPopulate: false,
        })
        .populate({
          path: "subCategoryObj",
          strictPopulate: false,
        });
      if (!theProduct) {
        return ThrowError(response, 401, "Product is not exits!");
      }
      return response.status(200).json({
        status: APP_STATUS.SUCCESS,
        data: theProduct,
        msg: "Product fetched!",
      });
    }
  } catch (error: any) {
    return ThrowError(response, error);
  }
};

/**
 * @usage : Delete a product
 * @url : http://localhost:9000/api/products/:productId
 * @param : no-params
 * @method : DELETE
 * @access : PRIVATE
 */
export const deleteProduct = async (request: Request, response: Response) => {
  try {
    const { productId } = request.params;
    const mongoProductId = new mongoose.Types.ObjectId(productId);
    const theUser: any = await UserUtil.getUser(request, response);
    if (theUser) {
      const theProduct: IProduct | any = await ProductCollection.findById(
        mongoProductId
      );
      if (!theProduct) {
        return ThrowError(response, 401, "Product is not exits!");
      }
      const deleteProductDetails = await ProductCollection.findByIdAndDelete(
        mongoProductId
      )
        .populate({
          path: "userobj",
          strictPopulate: false,
        })
        .populate({
          path: "categoryObj",
          strictPopulate: false,
        })
        .populate({
          path: "subCategoryObj",
          strictPopulate: false,
        });
      if (deleteProductDetails) {
        return response.status(200).json({
          status: APP_STATUS.SUCCESS,
          data: deleteProductDetails,
          msg: "Product is deleted!",
        });
      }
    }
  } catch (error: any) {
    return ThrowError(response, error);
  }
};

/**
 * @usage : Get all products with catagory id
 * @url : http://localhost:9000/api/products/catagories/:catagoryId
 * @param : no-params
 * @method : GET
 * @access : PRIVATE
 */
export const getAllProductWithCatagoryId = async (
  request: Request,
  response: Response
) => {
  try {
    const { catagoryId } = request.params;
    const theUser: any = await UserUtil.getUser(request, response);
    if (theUser) {
      const products: IProduct[] | any = await ProductCollection.find({
        categoryObj: catagoryId,
      })
        .populate({
          path: "userobj",
          strictPopulate: false,
        })
        .populate({
          path: "categoryObj",
          strictPopulate: false,
        })
        .populate({
          path: "subCategoryObj",
          strictPopulate: false,
        });
      return response.status(200).json({
        status: APP_STATUS.SUCCESS,
        data: products,
        msg: "Product fetched!",
      });
    }
  } catch (error: any) {
    return ThrowError(response, error);
  }
};
