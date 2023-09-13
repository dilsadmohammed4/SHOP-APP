export interface IOrderResponseView {
    _id: string;
    products?: OrderProductsEntity[] | null;
    total: number;
    tax: number;
    grandTotal: number;
    paymentType: string;
    orderStatus: string;
    orderBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface OrderProductsEntity {
    product: OrderProduct;
    price: string;
    count: number;
    _id: string;
}

export interface OrderProduct {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    brand: string;
    price: number;
    quantity: number;
    sold: number;
    userObj: string;
    categoryObj: string;
    subCategoryObj: string;
    __v: number;
}
