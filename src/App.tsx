import React from "react";
import "./App.css";
import {ToastConfiguration} from "./modules/ui/components/toast-config/ToastConfiguration";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "./modules/layouts/pages/home/HomePage";
import {FashionCatalogue} from "./modules/products/pages/catalogues/fashions/FashionCatalogue";
import {UserLogin} from "./modules/users/pages/user-login/UserLogin";

const App = () => {
    return (
        <>

            <BrowserRouter>
                <ToastConfiguration/>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/product/fashion'} element={<FashionCatalogue/>}/>
                    <Route path={'/users/login'} element={<UserLogin/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
