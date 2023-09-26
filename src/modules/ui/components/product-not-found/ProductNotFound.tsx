import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import noProductsFoundImg from "../../../../assets/images/No-Product-Found.png";

export const ProductNotFound: React.FC = () => {
    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col xs={4} className="offset-4">
                        <img src={noProductsFoundImg} alt="" className="img-fluid"/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};