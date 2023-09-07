import mongoose from "mongoose";
import { IAddress } from "../models/IAddress";

const Addressschema = new mongoose.Schema<IAddress>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    flat: { type: String, required: true },
    landmark: { type: String, required: true },
    street: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    pinCode: { type: String, required: true },
    userObj: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  { timestamps: true }
);
const AddressCollection = mongoose.model<IAddress>("addresses", Addressschema);
export default AddressCollection;
