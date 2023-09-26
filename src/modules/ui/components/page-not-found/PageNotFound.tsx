import React from "react";
import {MainNavbar} from "../../../layouts/pages/navbar/MainNavbar";
import {LayoutHeading} from "../../../layouts/components/layout-heading/LayoutHeading";
import {Col, Container, Row} from "react-bootstrap";
import notFoundImage from "../../../../assets/images/page-not-found.png"

export const PageNotFound: React.FC = () => {
    return (
        <>
            <MainNavbar/>
            <LayoutHeading heading={'Page Not Found'}/>
            <Container className="mt-5">
                <Row>
                    <Col xs={4} className="offset-4">
                        <img src={notFoundImage} alt="" className="img-fluid"/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};