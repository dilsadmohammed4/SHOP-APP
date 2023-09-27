import {combineReducers} from "@reduxjs/toolkit";
import *  as userReducer from "./user/user.slice"
import *  as categoriesReducer from "./categories/categories.slice"
import *  as productReducer from "./product/product.slice"
import *  as cartReducer from "./cart/cart.slice"
import *  as orderReducer from "./order/order.slice"

const rootReducer = combineReducers({
    [userReducer.userFeatureKey]: userReducer.userSlice.reducer,
    [categoriesReducer.categoryFeatureKey]: categoriesReducer.categorySlice.reducer,
    [productReducer.productFeatureKey]: productReducer.productSlice.reducer,
    [cartReducer.cartFeatureKey]: cartReducer.cartSlice.reducer,
    [orderReducer.orderFeatureKey]: orderReducer.orderSlice.reducer
});
export default rootReducer;