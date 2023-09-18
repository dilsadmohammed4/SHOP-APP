import React from "react";
import {Link} from "react-router-dom";

export const HomePage: React.FC = () => {
    return (
        <>
            <div className="landing-page">
                <div className="wrapper">
                    <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
                        <p className="display-1 text-success">REACT E-COMMERCE 2023</p>
                        <div>
                            <Link to={'/product/fashion'} className="btn btn-warning">
                                <i className="bi bi-phone"> Products</i>
                            </Link>
                            <Link to={'/users/login'} className="btn btn-success ms-2">
                                <i className="bi bi-lock"> Login</i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};