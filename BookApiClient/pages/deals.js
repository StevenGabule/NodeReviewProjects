import React from 'react';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Head from "next/head";

function Deals() {
    return (
        <>
            <Head>
                <title>Deals</title>
            </Head>
            <Container>
                <Row>
                    <Col>
                        <h1>Deals</h1>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Deals;