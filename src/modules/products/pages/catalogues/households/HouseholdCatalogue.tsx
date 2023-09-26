import {useState} from "react";
import {ISubCategoryView} from "../../../../categories/models/ICategoryResponseView";
import {MainNavbar} from "../../../../layouts/pages/navbar/MainNavbar";
import {Col, Container, Row} from "react-bootstrap";
import {ProductSidebar} from "../../../components/ProductSidebar";
import {LayoutHeading} from "../../../../layouts/components/layout-heading/LayoutHeading";

export const HouseholdCatalogue = () => {
    const [subCategories, setSubCategories] = useState<ISubCategoryView[]>([
        {
            _id: "6",
            name: "Cooker",
            description: "Cooker"
        },
        {
            _id: "7",
            name: "Tables",
            description: "Tables"
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
                        <LayoutHeading heading={'Households Catalogue'}/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};