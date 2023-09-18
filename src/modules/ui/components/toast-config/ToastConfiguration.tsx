import {ToastContainer} from "react-toastify";
import React from "react";

export const ToastConfiguration: React.FC = () => {
    return (
        <>  <ToastContainer
            position="top-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        /></>
    );
};