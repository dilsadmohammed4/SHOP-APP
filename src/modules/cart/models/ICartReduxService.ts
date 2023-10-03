import {IProductResponseView} from "../../products/models/IProductResponseView";
import {CartProductsEntity, ICartResponseView} from "./ICartResponseView";
import {ToastUtils} from "../../../utils/ToastUtils";

export class CartReduxService {

    private static PRODUCT_TAX = 5.0;

    public static convertToProductEntity(product: IProductResponseView): CartProductsEntity {
        return {
            _id: product._id,
            count: product.count,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: product.quantity,
            brand: product.brand,
            sold: product.sold,
            categoryObj: product.categoryObj._id,
            description: product.description,
            subCategoryObj: product.subCategoryObj._id,
            title: product.title,
            userObj: product.userObj._id,
        }
    }

    public static addToCartUtil(cart: ICartResponseView, product: CartProductsEntity, count: number): ICartResponseView {
        const exitingProduct: CartProductsEntity | undefined = cart.products.find(item => item._id === product._id);
        if (exitingProduct) {
            ToastUtils.displayErrorToast("Item already exist in cart!")
            return cart;
        } else {
            ToastUtils.displaySuccessToast("Item added to cart!")
            return {
                ...cart,
                products: [...cart.products, {...product, count: count}]
            }
        }
    }

    public static incrementProductQuantity(cart: ICartResponseView, productId: string): ICartResponseView {
        return {
            ...cart,
            products: cart.products.map(product => {
                if (product._id === productId) {
                    return {
                        ...product,
                        count: product.count + 1
                    }
                }
                return product;
            })
        }
    }

    public static decrementProductQuantity(cart: ICartResponseView, productId: string): ICartResponseView {
        return {
            ...cart,
            products: cart.products.map(product => {
                if (product._id === productId) {
                    return {
                        ...product,
                        count: product.count - 1 > 0 ? product.count - 1 : 1
                    }
                }
                return product;
            })
        }
    }

    public static deleteProductItemUtill(cart: ICartResponseView, productId: string): ICartResponseView {
        ToastUtils.displayInfoToast("Product is deleted from cart!");
        return {
            ...cart,
            products: cart.products.filter(product => product._id !== productId)
        }
    }

    public static calculateTotal(products: CartProductsEntity[]): number {

        let total: number = 0;
        for (let product of products) {
            total += Number(product.price) * Number(product.count);
        }
        return total;
    }

    public static calculateTax(products: CartProductsEntity[]): number {

        let total: number = this.calculateTotal(products);
        return total * this.PRODUCT_TAX / 100;
    }

    public static grandTotal(products: CartProductsEntity[]): number {

        return this.calculateTotal(products) + this.calculateTax(products);
    }

}
