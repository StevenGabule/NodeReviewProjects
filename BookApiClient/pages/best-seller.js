import React from 'react';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Head from "next/head";

function BestSeller() {
    return (
        <>
            <Head>
                <title>Best Sellers</title>
            </Head>
            <Container>
                <Row>
                    <Col>
                        <h1>Best Sellers</h1>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default BestSeller;