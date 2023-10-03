import {MainNavbar} from "../../../layouts/pages/navbar/MainNavbar";
import {LayoutHeading} from "../../../layouts/components/layout-heading/LayoutHeading";
import React, {useEffect} from "react";
import {Button, Card, Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import * as userAction from "../../../../redux/user/user.action";
import * as userReducer from "../../../../redux/user/user.slice";
import * as cartAction from "../../../../redux/cart/cart.action";
import * as cartReducer from "../../../../redux/cart/cart.slice";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import {useSelector} from "react-redux";
import {SpinnerUI} from "../../../ui/components/spinner/SpinnerUI";

export const CheckoutPage = () => {

    const dispatch: AppDispatch = useAppDispatch();

    const userReduxState: userReducer.InitialState = useSelector((store: RootState) => {
        return store[userReducer.userFeatureKey];
    })

    const cartReduxState: cartReducer.InitialState = useSelector((store: RootState) => {
        return store[cartReducer.cartFeatureKey];
    })

    useEffect(() => {
        dispatch(userAction.getAddressInfoAction());
        dispatch(cartAction.getCartInfoAction());
    }, []);

    const {loading, address} = userReduxState;
    const {loading: cartLoading, cartProduct} = cartReduxState;

    return (
        <>
            {(loading || cartLoading) && <SpinnerUI/>}
            <MainNavbar/>
            <LayoutHeading icon={"bi-cart-fill"} heading={'Checkout Products'}/>
            <Container className="mt-3">
                <Row>
                    {address && Object.keys(address).length > 0 &&
                        <Col xs={8}>
                            <Card className="shadow-lg">
                                <Card.Header className="bg-success text-white d-flex justify-content-between">
                                    <h3>Shipping Address</h3>
                                    <Link to={`/users/edit-shipping-address/${address._id}`}>
                                        <Button>
                                            <i className="bi bi-pencil"></i>
                                        </Button>
                                    </Link>
                                </Card.Header>
                                <Card.Body className="bg-light-grey">
                                    <ListGroup>
                                        <ListGroupItem>
                                            Name : <span className="fw-bold">{address.name}</span>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            Mobile : <span className="fw-bold">{address.mobile}</span>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            Email : <span className="fw-bold">{address.email}</span>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            Flat : <span className="fw-bold">{address.flat}</span>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            Street : <span className="fw-bold">{address.street}</span>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            Landmark : <span className="fw-bold">{address.landmark}</span>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            City : <span className="fw-bold">{address.city}</span>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            State : <span className="fw-bold">{address.state}</span>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            Country : <span className="fw-bold">{address.country}</span>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            Pin Code : <span className="fw-bold">{address.pinCode}</span>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    }
                    {
                        cartProduct.products && Object.keys(cartProduct.products).length > 0 &&
                        <Col xs={4}>
                            <Card className="shadow-lg">
                                <Card.Header className="bg-success text-white">
                                    <h3>Your Cart</h3>
                                </Card.Header>
                                <Card.Body className="bg-light-grey">
                                    <ListGroup>
                                        {
                                            cartProduct.products && cartProduct.products.map(product => {
                                                return (
                                                    <ListGroupItem key={product._id}>
                                                        <Row>
                                                            <Col>
                                                                <img src={product.imageUrl} alt="" width={50} height={50}/>
                                                            </Col>
                                                            <Col>
                                                                Name: <span>{product.title}</span><br/>
                                                                Count : <span>{product.count}</span><br/>
                                                                Price : <span>{product.price}</span><br/>
                                                            </Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                )
                                            })
                                        }
                                    </ListGroup>
                                    {/*<ListGroup>*/}
                                    {/*    <ListGroupItem>Total : <span*/}
                                    {/*        className="fw-bold">&#8377; {CartReduxService.calculateTotal(products).toFixed(2)}</span></ListGroupItem>*/}
                                    {/*    <ListGroupItem>Tax : <span*/}
                                    {/*        className="fw-bold">&#8377; {CartReduxService.calculateTax(products).toFixed(2)}</span></ListGroupItem>*/}
                                    {/*    <ListGroupItem>Grand Total : <span*/}
                                    {/*        className="fw-bold">&#8377; {CartReduxService.grandTotal(products).toFixed(2)}</span></ListGroupItem>*/}
                                    {/*</ListGroup>*/}
                                    <div className="d-grid gap-2">
                                        <Button variant={"warning"} className="mt-3">Place Order</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    }
                </Row>
            </Container>
        </>
    );
};