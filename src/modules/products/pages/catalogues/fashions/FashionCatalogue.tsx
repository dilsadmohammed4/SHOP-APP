import {MainNavbar} from "../../../../layouts/pages/navbar/MainNavbar";
import {LayoutHeading} from "../../../../layouts/components/layout-heading/LayoutHeading";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {ProductSidebar} from "../../../components/ProductSidebar";
import {useEffect, useState} from "react";
import {ICategoryResponseView, ISubCategoryView} from "../../../../categories/models/ICategoryResponseView";
import {AppDispatch, RootState, useAppDispatch} from "../../../../../redux/store";
import * as productReducer from "../../../../../redux/product/product.slice";
import * as categoryReducer from "../../../../../redux/categories/categories.slice";
import {useSelector} from "react-redux";
import * as categoryAction from "../../../../../redux/categories/categories.action";
import * as productAction from "../../../../../redux/product/product.action";
import {IProductResponseView} from "../../../models/IProductResponseView";
import {Link} from "react-router-dom";
import {ProductNotFound} from "../../../../ui/components/product-not-found/ProductNotFound";
import {SpinnerUI} from "../../../../ui/components/spinner/SpinnerUI";
import {addToCartAction} from "../../../../../redux/cart/cart.slice";
import {CartReduxService} from "../../../../cart/models/ICartReduxService";

export const FashionCatalogue = () => {

    const dispatch: AppDispatch = useAppDispatch();

    const [subCategories, setSubCategories] = useState<ISubCategoryView[]>([]);
    const [category, setCategory] = useState<ICategoryResponseView>({} as ICategoryResponseView);
    const [products, setProducts] = useState<IProductResponseView[]>([]);
    const [filterproducts, setFilterProducts] = useState<IProductResponseView[]>([]);
    const [filterLoading, setFilterLoading] = useState<boolean>(false);

    const categoryReduxState: categoryReducer.InitialState = useSelector((store: RootState) => {
        return store[categoryReducer.categoryFeatureKey];
    })

    const productReduxState: productReducer.InitialState = useSelector((store: RootState) => {
        return store[productReducer.productFeatureKey];
    })
    const {products: reduxProducts, loading} = productReduxState;
    const {categories} = categoryReduxState;


    useEffect(() => {
        dispatch(categoryAction.getAllCategoryAction())
    }, []);

    useEffect(() => {
        if (categories.length > 0) {
            const category: ICategoryResponseView | undefined = categories.find(item => item.name.toLowerCase().trim().includes("fashion"));
            if (category) {
                setCategory(category);
                if (category.subCategories) {
                    setSubCategories(category.subCategories.map(item => {
                        return {
                            _id: item._id,
                            name: item.name,
                            description: item.description,
                            isChecked: true,
                        }
                    }));
                }
            }
        }
    }, [categories]);

    useEffect(() => {
        if (category && Object.keys(category).length > 0) {
            dispatch(productAction.getAllProductsWithCategoryIdAction({categoryId: category._id}));
        }
    }, [category]);

    useEffect(() => {
        if (reduxProducts.length > 0) {
            setProducts(reduxProducts);
            setFilterProducts(reduxProducts);
        }
    }, [reduxProducts]);

    const filteredTheProducts = (subCategories: ISubCategoryView[]) => {

        let subs = subCategories.map(item => {
            if (item.isChecked) {
                return item._id;
            }
        }).filter(item => item !== undefined);
        setFilterLoading(true);
        setTimeout(() => {
            setFilterProducts((products.filter(item => subs.includes(item?.subCategoryObj?._id))))
            setFilterLoading(false);
        }, 300)

    }

    const clickAddTocart = (product: IProductResponseView) => {
        dispatch({
            type: `${addToCartAction}`,
            payload: {product: CartReduxService.convertToProductEntity(product), count: 1}
        })
    }
    return (
        <>
            {(loading || filterLoading) && <SpinnerUI/>}
            <MainNavbar/>
            <Container fluid>
                <Row>
                    <Col xs={1}>
                        <ProductSidebar subCategories={subCategories} setSubCategories={setSubCategories}
                                        filteredTheProducts={filteredTheProducts}/>
                    </Col>

                    <Col className="product-layout">
                        <LayoutHeading heading={'Fashion Catalogue'}/>
                    </Col>
                </Row>
            </Container>
            {
                filterproducts && filterproducts.length > 0 &&
                <Container>
                    <Row>
                        {
                            filterproducts.map((product) => {
                                return (
                                    <Col xs={3} key={product._id} className="mb-3 text-center">
                                        <Card>
                                            <Card.Header className="fashion-products">
                                                <Link to={`/products/view/${category.name}/${product._id}`}>
                                                    <img src={product.imageUrl} alt="" width={"180px"} height={"200px"}
                                                         className="m-auto d-block text-center"/>
                                                </Link>
                                            </Card.Header>
                                            <Card.Body>
                                                <small className="fw-bold text-success">{product.title}</small><br/>
                                                <small
                                                    className="fw-bold text-danger">&#8377; {Number(product.price).toFixed(2)}</small><br/>
                                                <Button variant={'warning'} size={'sm'} onClick={() => {
                                                    clickAddTocart(product)
                                                }}>Add to Cart</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            }
            {
                filterproducts.length === 0 && <ProductNotFound/>
            }

        </>
    )
}