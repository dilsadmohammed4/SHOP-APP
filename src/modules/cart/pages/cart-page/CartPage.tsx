import {MainNavbar} from "../../../layouts/pages/navbar/MainNavbar";
import {LayoutHeading} from "../../../layouts/components/layout-heading/LayoutHeading";
import React from "react";

export const CartPage = () => {
    return (
        <>
            <MainNavbar/>
            <LayoutHeading icon={"bi-cart-fill"} heading={'Your Cart'}/>
        </>
    );
};