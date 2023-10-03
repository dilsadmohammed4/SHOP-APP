import {MainNavbar} from "../../../layouts/pages/navbar/MainNavbar";
import {LayoutHeading} from "../../../layouts/components/layout-heading/LayoutHeading";
import React from "react";
import {Button, Card, Col, Container, ListGroup, ListGroupItem, Row, Table} from "react-bootstrap";
import * as cartReducer from "../../../../redux/cart/cart.slice";
import {decrProductQtyAction, deleteCartItemAction, incrProductQtyAction} from "../../../../redux/cart/cart.slice";
import * as cartAction from "../../../../redux/cart/cart.action";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import {ProductNotFound} from "../../../ui/components/product-not-found/ProductNotFound";
import {CartReduxService} from "../../models/ICartReduxService";
import {ICartRequestView} from "../../models/ICartRequestView";
import {useNavigate} from "react-router-dom";
import * as userReducer from "../../../../redux/user/user.slice";
import {IUserView} from "../../../users/models/IUserView";

export const CartPage = () => {

    const dispatch: AppDispatch = useAppDispatch();

    const navigate = useNavigate();

    const cartReduxState: cartReducer.InitialState = useSelector((store: RootState) => {
        return store[cartReducer.cartFeatureKey];
    })

    const userState: userReducer.InitialState = useSelector((store: RootState) => {
        return store[userReducer.userFeatureKey];
    })

    const clickIncrQty = (productId: string | undefined) => {
        if (productId) {
            dispatch({
                type: `${incrProductQtyAction}`,
                payload: {productId: productId}
            })
        }
    }

    const clickDecrQty = (productId: string | undefined) => {
        if (productId) {
            dispatch({
                type: `${decrProductQtyAction}`,
                payload: {productId: productId}
            })
        }
    }
    const clickDeleteProduct = (productId: string | undefined) => {
        if (productId) {
            dispatch({
                type: `${deleteCartItemAction}`,
                payload: {productId: productId}
            })
        }
    }

    const {cartProduct} = cartReduxState;
    const {products} = cartProduct;
    const {user} = userState;

    const prepareCartRequestObject = (user: IUserView): ICartRequestView => {
        return {
            products: products.map(product => {
                return {
                    product: product?._id,
                    count: product.count,
                    price: product.price,
                }
            }),
            tax: CartReduxService.calculateTax(products),
            total: CartReduxService.calculateTotal(products),
            grandTotal: CartReduxService.grandTotal(products),
            userObj: user._id
        };
    }
    const clickCheckout = () => {
        if (user && Object.keys(user).length > 0) {
            dispatch(cartAction.createCartAction({cart: prepareCartRequestObject(user)})).then((response: any) => {
                if (response && !response.error) {
                    navigate('/cart/checkout')
                }
            })
        }
    }

    return (
        <>
            <MainNavbar/>
            <LayoutHeading icon={"bi-cart-fill"} heading={'Your Cart'}/>
            {
                cartProduct.products.length > 0 ?
                    <Container className="mt-3">
                        <Row>
                            <Col xs={9}>
                                <Card className="shadow-lg">
                                    <Card.Header className="bg-success text-white">
                                        <p className="h4">Cart Items</p>
                                    </Card.Header>
                                    <Card.Body className="bg-light-grey">
                                        <Table striped hover>
                                            <thead>
                                            <tr className='bg-warning'>
                                                <th>SNO</th>
                                                <th>Image</th>
                                                <th>Title</th>
                                                <th>Prices</th>
                                                <th>Qty</th>
                                                <th>Total</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                cartProduct.products.map((product, index) => {
                                                    return (
                                                        <tr key={product._id}>
                                                            <td>{index + 1}</td>
                                                            <td><img src={product.imageUrl} alt="" width={50}
                                                                     height={50}/>
                                                            </td>
                                                            <td>{product.title}</td>
                                                            <td>&#8377; {product.price}</td>
                                                            <td>
                                                                <i className="bi bi-dash-circle-fill me-1"
                                                                   onClick={() => clickDecrQty(product._id)}></i>
                                                                {product.count}
                                                                <i className="bi bi-plus-circle-fill ms-1"
                                                                   onClick={() => clickIncrQty(product._id)}></i>
                                                            </td>
                                                            <td>&#8377; {product.price * product.count}</td>
                                                            <td><Button variant={"danger"}
                                                                        onClick={() => clickDeleteProduct(product._id)}>
                                                                <i className="bi bi-trash-fill"></i></Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={3}>
                                <Card className="shadow-lg">
                                    <Card.Header className="bg-success text-white">
                                        <p className="h4">Cart Items</p>
                                    </Card.Header>
                                    <Card.Body className="bg-light-grey">
                                        <ListGroup>
                                            <ListGroupItem>Total : <span
                                                className="fw-bold">&#8377; {CartReduxService.calculateTotal(products).toFixed(2)}</span></ListGroupItem>
                                            <ListGroupItem>Tax : <span
                                                className="fw-bold">&#8377; {CartReduxService.calculateTax(products).toFixed(2)}</span></ListGroupItem>
                                            <ListGroupItem>Grand Total : <span
                                                className="fw-bold">&#8377; {CartReduxService.grandTotal(products).toFixed(2)}</span></ListGroupItem>
                                        </ListGroup>
                                        <div className="d-grid gap-2">
                                            <Button variant={"warning"} className="mt-3"
                                                    onClick={clickCheckout}>Checkout</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container> : <ProductNotFound/>
            }

        </>
    )
        ;
};