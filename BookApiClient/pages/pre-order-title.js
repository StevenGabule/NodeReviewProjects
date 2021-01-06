import React from 'react';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Head from "next/head";

function PreOrderTitle() {
    return (
        <>
            <Head>
                <title>Pre-Order Title</title>
            </Head>
            <Container>
                <Row>
                    <Col>
                        <h1>Pre-Order Title</h1>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default PreOrderTitle;