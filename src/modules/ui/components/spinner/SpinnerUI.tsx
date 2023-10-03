import React from "react";
import spinImg from "../../../../assets/images/spinner.gif";

export const SpinnerUI = () => {
    return (
        <>
            <div className="spinner">
                <img src={spinImg} alt="No image found" className="m-auto text-center d-block"/>
            </div>
        </>
    );
};