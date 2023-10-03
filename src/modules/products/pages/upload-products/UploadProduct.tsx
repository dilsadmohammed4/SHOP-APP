import {MainNavbar} from "../../../layouts/pages/navbar/MainNavbar";
import {LayoutHeading} from "../../../layouts/components/layout-heading/LayoutHeading";
import React, {useEffect, useRef, useState} from "react";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import * as categoryReducer from "../../../../redux/categories/categories.slice";
import {useSelector} from "react-redux";
import * as categoryAction from "../../../../redux/categories/categories.action";
import * as productAction from "../../../../redux/product/product.action";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {IProductRequestView} from "../../models/IProductRequestView";
import {ICategoryResponseView, ISubCategoryView} from "../../../categories/models/ICategoryResponseView";
import {UploadImageWidget} from "../../../../utils/UploadImageWidget";

export const UploadProduct = () => {

    const dispatch: AppDispatch = useAppDispatch();

    const navigate = useNavigate();

    const [product, setProduct] = useState<IProductRequestView>({
        brand: "",
        categoryId: "",
        description: "",
        imageUrl: "",
        price: "",
        quantity: "",
        subCategoryId: "",
        title: ""

    });
    const [subCategories, setSubCategories] = useState<ISubCategoryView[]>([]);
    const [categoryId, setCategoryId] = useState<string>("");
    const [validated, setValidated] = useState<boolean>(false);

    const cloudinaryRef = useRef<any>();
    const widgetRef = useRef<any>();

    const categoryReduxState: categoryReducer.InitialState = useSelector((store: RootState) => {
        return store[categoryReducer.categoryFeatureKey];
    })
    const {categories} = categoryReduxState;

    const clickUploadImageButton = () => {
        widgetRef.current.open();
    }

    useEffect(() => {
        dispatch(categoryAction.getAllCategoryAction())
        UploadImageWidget.upload(cloudinaryRef, widgetRef).then((imageUrl) => {
            if (imageUrl) {
                setProduct({...product, imageUrl: imageUrl.toString()})
            }
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    const selectACategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProduct({
            ...product,
            categoryId: e.target.value

        })
        if (categories.length > 0) {
            let category: ICategoryResponseView | undefined = categories.find(category => category._id?.toString() === e.target.value);
            if (category && category.subCategories) {
                setSubCategories(category.subCategories);
            } else {
                setSubCategories([] as ISubCategoryView[]);
            }
        }
    }

    const updateInput = (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            dispatch(productAction.createProductAction({
                product: product
            })).then((response: any) => {
                if (response && !response.error) {
                    navigate("/");
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
            <LayoutHeading heading={'Upload Products'}/>
            <Container>
                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={event => handleSubmit(event)}>
                            <Form.Group className="mb-2">
                                <Button variant={"warning"} type={"button"} onClick={clickUploadImageButton}>Upload
                                    Image</Button>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Select
                                    name={"categoryId"}
                                    value={product.categoryId}
                                    onChange={e => selectACategory(e)}
                                >
                                    <option value="">Select a Category</option>
                                    {
                                        categories.length > 0 && categories.map(item => {
                                            return (
                                                <option key={item._id} value={item._id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Select
                                    required
                                    name={"subCategoryId"}
                                    value={product.subCategoryId}
                                    onChange={e => updateInput(e)}>
                                    <option value="">Select a Sub Category</option>
                                    {
                                        subCategories.length > 0 && subCategories.map(item => {
                                            return (
                                                <option key={item._id} value={item._id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    name={"title"}
                                    value={product.title}
                                    onChange={e => updateInput(e)}
                                    type={"text"} placeholder={"Title"}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    name={"brand"}
                                    value={product.brand}
                                    onChange={e => updateInput(e)}
                                    type={"text"} placeholder={"Brand"}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    name={"description"}
                                    value={product.description}
                                    onChange={e => updateInput(e)}
                                    as="textarea" rows={3} placeholder={"Description"}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    name={"price"}
                                    value={product.price}
                                    onChange={e => updateInput(e)}
                                    type={"number"} placeholder={"Price"}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    name={"quantity"}
                                    value={product.quantity}
                                    onChange={e => updateInput(e)}
                                    type={"number"} placeholder={"Qty"}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Button variant={"success"} type={"submit"}>Upload</Button>
                                <Link to={"/"} className="btn btn-dark ms-2">Cancel</Link>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={3}>
                        <img src={product.imageUrl} alt="" className="img-fluid rounded-3 shadow-lg"/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};