export interface ICartResponseView {
    _id: string;
    products: CartProductsEntity[];
    total: string;
    tax: string;
    grandTotal: string;
    userObj: CartUserObj;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface CartNewResponseView {
    _id?: string;
    products: CartProductsEntity[];
    total: string;
    tax: string;
    grandTotal: string;
    userObj: CartUserObj;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface CartProductsEntity {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    brand: string;
    price: number;
    quantity: number;
    sold: number;
    count: number,
    userObj: string;
    categoryObj: string;
    subCategoryObj: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface CartProduct {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    brand: string;
    price: number;
    quantity: number;
    sold: number;
    count: number,
    userObj: string;
    categoryObj: string;
    subCategoryObj: string;
    __v: number;
}

export interface CartUserObj {
    _id: string;
    username: string;
    email: string;
    password: string;
    imageUrl: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
