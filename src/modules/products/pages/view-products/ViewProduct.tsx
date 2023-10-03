import {MainNavbar} from "../../../layouts/pages/navbar/MainNavbar";
import {LayoutHeading} from "../../../layouts/components/layout-heading/LayoutHeading";
import {Button, Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import * as productReducer from "../../../../redux/product/product.slice";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import {useEffect} from "react";
import * as productAction from "../../../../redux/product/product.action";
import {SpinnerUI} from "../../../ui/components/spinner/SpinnerUI";

export const ViewProduct = () => {
    const {categoryName, productId} = useParams();

    const dispatch: AppDispatch = useAppDispatch();

    const productReduxState: productReducer.InitialState = useSelector((store: RootState) => {
        return store[productReducer.productFeatureKey];
    })

    useEffect(() => {
        dispatch(productAction.getAProductAction({productId: productId}))
    }, [productId]);
    const {loading, product} = productReduxState;

    return (
        <>
            {loading && <SpinnerUI/>}
            <MainNavbar/>
            <LayoutHeading heading={"View Products"}/>{
            product && Object.keys(product).length > 0 &&
            <Container>
                <Row>
                    <Col xs={4}>
                        <img src={product.imageUrl} alt="" className="img-fluid rounded-3 shadow-sm"
                             style={{height: "351px", width: "351px"}}/>
                        <Link to={`/products/${categoryName?.toLowerCase()}`}
                              className="btn btn-warning mt-3"><i
                            className="bi bi-arrow-left-circle-fill"></i> Back</Link>
                    </Col>
                    <Col xx={6}>
                        <ListGroup>
                            <ListGroupItem>Name : <span className="fw-bold">{product.title}</span></ListGroupItem>
                            <ListGroupItem>Brand : <span className="fw-bold">{product.brand}</span></ListGroupItem>
                            <ListGroupItem>Category : <span
                                className="fw-bold">{product.categoryObj?.name}</span></ListGroupItem>
                            <ListGroupItem>Sub Category : <span
                                className="fw-bold">{product.subCategoryObj?.name}</span></ListGroupItem>
                            <ListGroupItem>Price : <span
                                className="fw-bold">&#8377; {product.price}</span></ListGroupItem>
                            <ListGroupItem>Description : <span>{product.description}</span></ListGroupItem>
                        </ListGroup>
                        <Button variant={'warning'} className="mt-3">Add to Cart</Button>
                    </Col>
                </Row>
            </Container>
        }

        </>
    );
};