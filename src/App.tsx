import React from "react";
import "./App.css";
import {Button} from "react-bootstrap";
import {ToastContainer} from "react-toastify";

const App = () => {
    return (
        <>
            <ToastContainer
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
            />
            <h1>Hello From Dilsad!!!</h1>
            <Button variant={"success"}>Submit</Button>
            <i className="bi bi-github"></i>
        </>
    );
};

export default App;
