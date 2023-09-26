import React from "react";
import {MainNavbar} from "../../../layouts/pages/navbar/MainNavbar";
import {LayoutHeading} from "../../../layouts/components/layout-heading/LayoutHeading";

export const ChangePassword: React.FC = () => {
    return (
        <>
            <MainNavbar/>
            <LayoutHeading icon={"bi-eye-fill"} heading={'Change Password'}/>
        </>
    );
};