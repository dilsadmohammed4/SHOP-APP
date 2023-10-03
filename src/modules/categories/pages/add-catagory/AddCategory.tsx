import {MainNavbar} from "../../../layouts/pages/navbar/MainNavbar";
import {LayoutHeading} from "../../../layouts/components/layout-heading/LayoutHeading";
import React, {useEffect, useState} from "react";
import * as categoryReducer from "../../../../redux/categories/categories.slice";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import * as categoryAction from "../../../../redux/categories/categories.action";
import {Button, Card, Col, Container, Form, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {ICategoryResponseView, ISubCategoryView} from "../../models/ICategoryResponseView";
import {useNavigate} from "react-router-dom";

export const AddCategory = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const navigate = useNavigate();

    const [categoryId, setCategoryId] = useState<string>("");
    const [subCategory, setSubCategory] = useState<ISubCategoryView>({
        name: "",
        description: ""

    });
    const [subCategories, setSubCategories] = useState<ISubCategoryView[]>([]);
    const [validated, setValidated] = useState<boolean>(false);

    const categoryState: categoryReducer.InitialState = useSelector((store: RootState) => {
        return store[categoryReducer.categoryFeatureKey];
    })

    const {categories} = categoryState;
    useEffect(() => {
        dispatch(categoryAction.getAllCategoryAction())
    }, []);

    const selectACategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryId(e.target.value);
        setSubCategory({
            name: "",
            description: ""
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

    const updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSubCategory({
            ...subCategory,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            dispatch(categoryAction.createSubCategoryAction({
                category: subCategory,
                categoryId: categoryId
            })).then((response: any) => {
                if (response && !response.error) {
                    dispatch(categoryAction.getAllCategoryAction());
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
            <LayoutHeading heading={'Add SubCategories'}/>
            <Container>
                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={event => handleSubmit(event)}>
                            <Form.Group className="mb-2">
                                <Form.Select
                                    value={categoryId}
                                    onChange={(e) => selectACategory(e)}
                                >
                                    <option>Select a Category</option>
                                    {
                                        categories.map(category => {
                                            return (
                                                <option value={category._id}>{category.name}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    name={"name"}
                                    value={subCategory.name}
                                    onChange={e => updateInput(e)}
                                    placeholder="SubCategory" type="text"/>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    rows={3}
                                    name={"description"}
                                    value={subCategory.description}
                                    onChange={e => updateInput(e)}
                                    placeholder="Description" as="textarea"/>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Button variant={'success'} type={'submit'}>Create</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={4}>
                        <Row>
                            <Card>
                                <Card.Header>
                                    <p className="h6">Available Sub-Categories</p>
                                </Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        {
                                            subCategories.map(subCategory => {
                                                return (
                                                    <ListGroupItem
                                                    >{subCategory.name}</ListGroupItem>
                                                )
                                            })
                                        }
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};