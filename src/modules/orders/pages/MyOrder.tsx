import {MainNavbar} from "../../layouts/pages/navbar/MainNavbar";
import {LayoutHeading} from "../../layouts/components/layout-heading/LayoutHeading";
import React from "react";

export const MyOrder = () => {
    return (
        <>
            <MainNavbar/>
            <LayoutHeading icon={"bi-list"} heading={'My Orders'}/>
        </>
    );
};