export interface ICartRequestView {
    products: CartProductsEntity[];
    total: number;
    tax: number;
    grandTotal: number;
    userObj?: string;
}

export interface CartProductsEntity {
    product: string;
    count: number;
    price: number;
}
