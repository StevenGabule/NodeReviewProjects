import React from 'react';
import {Container, Col, Card, Button} from "react-bootstrap";
import Link from "next/link";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import Head from "next/head";
import "../styles/Home.module.css";

function HomePage({data, token}) {
    async function handleAddToCart(id) {
        const url = `${baseUrl}/api/v1/carts`;
        const qty = 1;
        const bookId = id;
        const payload = { bookId, qty};
        const headers = {headers: {Authorization: token}};
        const response = await axios.post(url, payload, headers)
        console.log(response)
    }

    return (
        <>
            <Head>
                <title>Fully Booked Online Bookstore</title>
            </Head>
            <Container>
                <div className={"d-flex justify-content-between align-items-center"}>
                    <h1 className={"page-title"}>E-Book Page</h1>
                    <Link href="/books/create">
                        <a>New Book</a>
                    </Link>
                </div>

                <div className={"row row-cols-1 row-cols-md-4"}>
                    {parseInt(data.length) === 0 && (
                        <Col>
                            <p>No book available</p>
                        </Col>
                    )}
                    {data.map(({id, title, price, avatar}) => (
                        <Col key={id}>
                            <Card className={"mb-3"}>
                                <Card.Img variant="top" src={avatar}/>
                                <Card.Body>
                                    <Card.Title className={"mb-2"}>
                                        <Link href={`/books?_id=${id}`}><a className={"btn-link"}>{title}</a></Link>
                                    </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Price: {price}</Card.Subtitle>
                                    <Button type={"button"} variant="primary" size={"sm"} block onClick={() => handleAddToCart(id)}>Add to cart</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </div>
            </Container>
            <style jsx>{`
                .page-title {
                    font-size: 24px;
                    margin-top: 2%;
                }
            `}</style>
        </>
    )
}

HomePage.getInitialProps = async () => {
    try {
        const {data} = await axios.get(`${baseUrl}/api/v1/books`);
        return {data: data.data}
    } catch (e) {
        throw e;
    }
}

export default HomePage;