import {useState} from "react";
import {ISubCategoryView} from "../../../../categories/models/ICategoryResponseView";
import {MainNavbar} from "../../../../layouts/pages/navbar/MainNavbar";
import {Col, Container, Row} from "react-bootstrap";
import {ProductSidebar} from "../../../components/ProductSidebar";
import {LayoutHeading} from "../../../../layouts/components/layout-heading/LayoutHeading";
import {ProductNotFound} from "../../../../ui/components/product-not-found/ProductNotFound";

export const ElectronicCatalogue = () => {
    const [subCategories, setSubCategories] = useState<ISubCategoryView[]>([
        {
            _id: "3",
            name: "Mobiles",
            description: "Mobiles"
        },
        {
            _id: "4",
            name: "Laptops",
            description: "Laptops"
        },
        {
            _id: "5",
            name: "Chargers",
            description: "Chargers"
        }
    ]);
    return (
        <>
            <MainNavbar/>
            <Container fluid>
                <Row>
                    <Col xs={1}>
                        <ProductSidebar subCategories={subCategories} setSubCategories={setSubCategories}
                                        filteredTheProducts={() => {

                                        }}/>
                    </Col>
                    <Col className="product-layout">
                        <LayoutHeading heading={'Electronics Catalogue'}/>
                    </Col>
                </Row>
            </Container>
            <ProductNotFound/>
        </>
    );
};