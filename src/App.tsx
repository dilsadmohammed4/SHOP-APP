import React from "react";
import "./App.css";
import {ToastConfiguration} from "./modules/ui/components/toast-config/ToastConfiguration";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "./modules/layouts/pages/home/HomePage";
import {FashionCatalogue} from "./modules/products/pages/catalogues/fashions/FashionCatalogue";
import {UserLogin} from "./modules/users/pages/user-login/UserLogin";
import {ElectronicCatalogue} from "./modules/products/pages/catalogues/electronics/ElectronicCatalogue";
import {HouseholdCatalogue} from "./modules/products/pages/catalogues/households/HouseholdCatalogue";
import {PageNotFound} from "./modules/ui/components/page-not-found/PageNotFound";
import {UploadProduct} from "./modules/products/pages/upload-products/UploadProduct";
import {ManageProduct} from "./modules/products/pages/manage-products/ManageProduct";
import {AddCategory} from "./modules/categories/pages/add-catagory/AddCategory";
import {ManageOrder} from "./modules/orders/pages/ManageOrder";
import {CartPage} from "./modules/cart/pages/cart-page/CartPage";
import {CheckoutPage} from "./modules/cart/pages/checkout-page/CheckoutPage";
import {UserProfile} from "./modules/users/pages/user-profile/UserProfile";
import {UserRegister} from "./modules/users/pages/user-register/UserRegister";
import {ChangePassword} from "./modules/users/pages/user-password/ChangePassword";
import {MyOrder} from "./modules/orders/pages/MyOrder";

const App = () => {
    return (
        <>

            <BrowserRouter>
                <ToastConfiguration/>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/products/fashion'} element={<FashionCatalogue/>}/>
                    <Route path={'/products/electronics'} element={<ElectronicCatalogue/>}/>
                    <Route path={'/products/household'} element={<HouseholdCatalogue/>}/>
                    <Route path={'/products/upload'} element={<UploadProduct/>}/>
                    <Route path={'/products/admin'} element={<ManageProduct/>}/>
                    <Route path={'/categories/add'} element={<AddCategory/>}/>
                    <Route path={'/orders/admin'} element={<ManageOrder/>}/>
                    <Route path={'/cart/list'} element={<CartPage/>}/>
                    <Route path={'/cart/checkout'} element={<CheckoutPage/>}/>
                    <Route path={'/users/profile'} element={<UserProfile/>}/>
                    <Route path={'/users/register'} element={<UserRegister/>}/>
                    <Route path={'/users/change-password'} element={<ChangePassword/>}/>
                    <Route path={'/users/orders/me'} element={<MyOrder/>}/>
                    <Route path={'/users/login'} element={<UserLogin/>}/>
                    <Route path={'*'} element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
