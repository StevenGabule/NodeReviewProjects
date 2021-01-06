import React from 'react';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Head from "next/head";

function Category() {
    return (
        <>
            <Head>
                <title>Category</title>
            </Head>
            <Container>
                <Row>
                    <Col>
                        <h1>Category</h1>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Category;