import {MainNavbar} from "../../../../layouts/pages/navbar/MainNavbar";
import {LayoutHeading} from "../../../../layouts/components/layout-heading/LayoutHeading";
import {Col, Container, Row} from "react-bootstrap";
import {ProductSidebar} from "../../../components/ProductSidebar";
import {useState} from "react";
import {ISubCategoryView} from "../../../../categories/models/ICategoryResponseView";

export const FashionCatalogue = () => {
    const [subCategories, setSubCategories] = useState<ISubCategoryView[]>([
        {
            _id: "1",
            name: "Means Wear",
            description: "Mens Wear"
        },
        {
            _id: "2",
            name: "Kids Wear",
            description: "Kids Wear"
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
                        <LayoutHeading heading={'Fashion Catalogue'}/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};