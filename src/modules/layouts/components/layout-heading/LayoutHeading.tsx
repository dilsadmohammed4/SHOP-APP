import {Col, Container, Row} from "react-bootstrap";
import React from "react";

interface IProps {
    heading: string,
    icon?: string
}

export const LayoutHeading: React.FC<IProps> = (props) => {
    return (
        <>
            <Container className="mt-3">
                <Row>
                    <Col>
                        <p className="h4 text-success">
                            <i className={`bi ${props.icon}`}></i> {props.heading}</p>
                        <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos esse
                            facilis impedit, minus officiis perferendis praesentium sint. Accusantium aliquam cumque
                            debitis dicta, eveniet illo illum maxime numquam perferendis recusandae, voluptates!</p>
                    </Col>
                </Row>
            </Container>
        </>
    );
};