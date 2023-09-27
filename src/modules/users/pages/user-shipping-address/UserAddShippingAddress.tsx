import React, {useState} from "react";
import {MainNavbar} from "../../../layouts/pages/navbar/MainNavbar";
import {LayoutHeading} from "../../../layouts/components/layout-heading/LayoutHeading";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {AppDispatch, useAppDispatch} from "../../../../redux/store";
import * as userAction from "../../../../redux/user/user.action";
import {IAddressView} from "../../models/IAddressView";

export const UserAddShippingAddress: React.FC = () => {
    const [address, setAddress] = useState<IAddressView>({
        city: "",
        country: "",
        email: "",
        flat: "",
        landmark: "",
        mobile: "",
        name: "",
        pinCode: "",
        state: "",
        street: ""

    });
    const [validated, setValidated] = useState<boolean>(false);
    const updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAddress({
            ...address,
            [event.target.name]: event.target.value
        })
    }
    const navigate = useNavigate();
    const dispatch: AppDispatch = useAppDispatch();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            dispatch(userAction.createNewAddressAction({address: address})).then((response: any) => {
                if (!response.error) {
                    navigate("/users/profile");
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
            <LayoutHeading icon={""} heading={'Add Shipping Address'}/>
            <Container>
                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={event => handleSubmit(event)}>

                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.mobile}
                                    name={"mobile"}
                                    onChange={e => updateInput(e)}
                                    placeholder="Mobile" type="text"/>
                                <Form.Control.Feedback type="invalid">Please choose a valid
                                    mobile.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.flat}
                                    name={"flat"}
                                    onChange={e => updateInput(e)}
                                    placeholder="Flat" type="text"/>
                                <Form.Control.Feedback type="invalid">Please choose a valid
                                    flat.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.landmark}
                                    name={"landmark"}
                                    onChange={e => updateInput(e)}
                                    placeholder="Landmark" type="text"/>
                                <Form.Control.Feedback type="invalid">Please choose a valid
                                    landmark.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.street}
                                    name={"street"}
                                    onChange={e => updateInput(e)}
                                    placeholder="Street" type="text"/>
                                <Form.Control.Feedback type="invalid">Please choose a valid
                                    street.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.city}
                                    name={"city"}
                                    onChange={e => updateInput(e)}
                                    placeholder="City" type="text"/>
                                <Form.Control.Feedback type="invalid">Please choose a valid
                                    mobile.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.state}
                                    name={"state"}
                                    onChange={e => updateInput(e)}
                                    placeholder="State" type="text"/>
                                <Form.Control.Feedback type="invalid">Please choose a valid
                                    state.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.country}
                                    name={"country"}
                                    onChange={e => updateInput(e)}
                                    placeholder="Country" type="text"/>
                                <Form.Control.Feedback type="invalid">Please choose a valid
                                    country.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.pinCode}
                                    name={"pinCode"}
                                    onChange={e => updateInput(e)}
                                    placeholder="Pincode" type="text"/>
                                <Form.Control.Feedback type="invalid">Please choose a valid
                                    pincode.</Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="success" className="me-2" type="submit">Add Address</Button>
                            <Link to={"/users/profile"} className="btn btn-dark">Cancel</Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};