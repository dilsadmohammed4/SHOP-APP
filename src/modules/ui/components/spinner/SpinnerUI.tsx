import React from "react";
import spinImg from "../../../../assets/images/spinner.gif";

export const SpinnerUI: React.FC = () => {
    return (
        <>
            <div className="spinner">
                <img src={spinImg} alt=""/>
            </div>
        </>
    );
};