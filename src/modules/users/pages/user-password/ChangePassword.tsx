import React, {useState} from "react";
import {MainNavbar} from "../../../layouts/pages/navbar/MainNavbar";
import {LayoutHeading} from "../../../layouts/components/layout-heading/LayoutHeading";
import {AppDispatch, useAppDispatch} from "../../../../redux/store";
import {Link, useNavigate} from "react-router-dom";
import * as userAction from "../../../../redux/user/user.action";
import * as userReducer from "../../../../redux/user/user.slice";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {ToastUtils} from "../../../../utils/ToastUtils";

interface IProps {
    password: string,
    confirmPassword: string,
}

export const ChangePassword: React.FC = () => {

    const [user, setUser] = useState<IProps>({
        password: "",
        confirmPassword: "",
    });

    const [validated, setValidated] = useState<boolean>(false);
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();
    const updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            if (user.password === user.confirmPassword) {
                dispatch(userAction.changePasswordAction({password: user.password})).then((response: any) => {
                    if (response && !response.error) {
                        // dispatch({
                        //     type: `${userReducer.logoutAction}`
                        // });
                        navigate("/users/profile")
                    }
                })
            } else {
                ToastUtils.displayErrorToast("Both the password are not matched!")
            }
        }
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    }
    return (
        <>
            <MainNavbar/>
            <LayoutHeading icon={"bi-eye-fill"} heading={'Change Password'}/>
            <Container>
                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={event => handleSubmit(event)}>

                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    pattern={"^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,}$"}
                                    value={user.password}
                                    name={"password"}
                                    onChange={e => updateInput(e)}
                                    placeholder="Password" type="password"/>
                                <Form.Control.Feedback type="invalid">Please choose a valid
                                    password.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    pattern={"^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,}$"}
                                    value={user.confirmPassword}
                                    name={"confirmPassword"}
                                    onChange={e => updateInput(e)}
                                    placeholder="Confirm Password" type="password"/>
                                <Form.Control.Feedback type="invalid">Please choose a valid
                                    password.</Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="success" className="me-2" type="submit">Change Password</Button>
                            <Link to={"/users/profile"} className="btn btn-dark">Cancel</Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};