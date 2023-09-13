import express, {Application, Request, Response} from "express";
import dotenv from "dotenv";
import cors from "cors";
import {DBUtil} from "./db/DBUtil";
import userRouter from "./routers/users/userRouter";
import catagoryRouter from "./routers/categories/categoryRouter";
import productRouter from "./routers/products/productRouter";
import adressRouter from "./routers/address/adressRouter";
import cartRouter from "./routers/cart/cartRouter";
import orderRouter from "./routers/orders/orderRouter";

const app: Application = express();

//configure express to read the .env
dotenv.config({
    path: "./.env",
});

const port: number | undefined = Number(process.env.SERVER_PORT_NAME) || 9000;
const dbUrl: string | undefined = process.env.MONGO_DB_CLOUD_URL;
const dbName: string | undefined = process.env.MONGO_DB_DATABASE;

//configure express to read the form data / body
app.use(express.json());
//Add cors
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.status(200);
    res.json({
        msg: "Welcome to Express Server....",
    });
});

//Router configuration
app.use("/api/users", userRouter);
app.use("/api/categories", catagoryRouter);
app.use("/api/products", productRouter);
app.use("/api/addresses", adressRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);

if (port && dbUrl && dbName) {
    app.listen(port, () => {
        if (dbUrl && dbName) {
            DBUtil.connectToDb(dbUrl, dbName)
                .then((dbResponse) => {
                    console.log(dbResponse);
                })
                .catch((error) => {
                    console.error(error);
                    process.exit(0);
                });
        }
        console.log(`Server started at ${port}`);
    });
}
