import React from 'react';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Head from "next/head";

function NewReleases() {
    return (
        <>
            <Head>
                <title>New Releases</title>
            </Head>
            <Container>
                <Row>
                    <Col>
                        <h1>NewReleases</h1>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default NewReleases;