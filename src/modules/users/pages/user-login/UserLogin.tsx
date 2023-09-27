import React, {useState} from "react";
import {MainNavbar} from "../../../layouts/pages/navbar/MainNavbar";
import {LayoutHeading} from "../../../layouts/components/layout-heading/LayoutHeading";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {AppDispatch, useAppDispatch} from "../../../../redux/store";
import * as userAction from "../../../../redux/user/user.action"

export const UserLogin: React.FC = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
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
            dispatch(userAction.loginUserAction({user: user})).then((response: any) => {
                if (!response.error) {
                    navigate("/products/fashion");
                }
            })
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
            <LayoutHeading icon={"bi-person-lock"} heading={'Login'}/>
            <Container>
                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={event => handleSubmit(event)}>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={user.email}
                                    name={"email"}
                                    onChange={e => updateInput(e)}
                                    placeholder="Email" type="email"/>
                                <Form.Control.Feedback type="invalid">Please choose a valid
                                    email.</Form.Control.Feedback>
                            </Form.Group>
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
                            <Button variant="success" className="me-2" type="submit">Login</Button>
                            <Link to={"/"} className="btn btn-dark">Cancel</Link>
                        </Form>
                        <small>
                            Don't have an account? <Link className="text-primary fw-bold text-decoration-none"
                                                         to={'/users/register'}>Register</Link>
                        </small>
                    </Col>
                </Row>
            </Container>
        </>
    );
};