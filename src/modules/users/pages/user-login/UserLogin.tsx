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
        dispatch(userAction.loginUserAction({user: user})).then((response: any) => {
            if (!response.error) {
                navigate("/contacts/admin");
            }

        })
    }
    return (
        <>
            <MainNavbar/>
            <LayoutHeading icon={"bi-person-lock"} heading={'Login'}/>
            <Container>
                <pre>{JSON.stringify(user)}</pre>
                <Row>
                    <Col xs={4}>
                        <Form onSubmit={event => handleSubmit(event)}>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    value={user.email}
                                    name={"email"}
                                    onChange={e => updateInput(e)}
                                    placeholder="Email" type="email"/>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    value={user.password}
                                    name={"password"}
                                    onChange={e => updateInput(e)}
                                    placeholder="Password" type="password"/>
                            </Form.Group>
                            <Button variant="success" type="submit">Login</Button>
                            <Link to={"/"} className="btn btn-dark ms-2">Cancel</Link>
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