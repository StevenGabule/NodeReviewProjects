import React, {useEffect} from 'react';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import moment from "moment";
import Head from "next/head";

function Books({data}) {
    return (
        <>
            <Head>
                <title>{data.title}</title>
            </Head>
            <Container>
                <Row>
                    <Col>
                        <h1>{data.title}</h1>
                        <small>{moment(data.createdAt).fromNow()}</small>
                        <p>{data.description}</p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

Books.getInitialProps = async ({query: {_id: id}}) => {
    const url = `${baseUrl}/api/v1/books/${id}`
    const payload = {params: {id}}
    const {data} = await axios.get(url, payload);
    return {
        data: data.data
    }
}

export default Books;