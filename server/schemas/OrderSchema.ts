import mongoose from "mongoose";
import {IOrder} from "../models/IOrder";

const OrderSchema = new mongoose.Schema<IOrder>(
    {
        products: [
            {
                product: {
                    type: mongoose.Schema.ObjectId,
                    required: true,
                    ref: "products",
                },
                price: {type: String, required: true},
                count: {type: Number, required: true},
            },
        ],
        total: {type: Number, required: true},
        tax: {type: Number, required: true},
        grandTotal: {type: Number, required: true},
        paymentType: {type: String, required: true},
        orderStatus: {
            type: String,
            required: true,
            default: "Order Placed",
            enum: [
                "Order Placed",
                "Processing",
                "Dispatched",
                "Delivered",
                "Cancelled",
                "Completed",
            ],
        },
        orderBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "users",
        },
    },
    {timestamps: true}
);

const OrderCollection = mongoose.model<IOrder>("orders", OrderSchema);
export default OrderCollection;
