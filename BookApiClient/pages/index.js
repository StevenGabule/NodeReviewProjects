import React from 'react';
import {Container, Col, Card, Button} from "react-bootstrap";
import Link from "next/link";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import Layout from "../components/Layout";

function HomePage({data}) {

    async function handleDeleteBook(id) {
        const url = `${baseUrl}/api/v1/books/${id}`
        const response = await axios.delete(url, null);
        console.log(response);
    }

    return (
        <>
            <Container style={{marginTop: '4%'}}>
                <div className={"d-flex justify-content-between align-items-center"}>
                    <h1>E-Book Page</h1>
                    <Link href="/books/create">
                        <a>New Book</a>
                    </Link>
                </div>
                <div className={"row row-cols-1 row-cols-md-4"}>
                    {data.map(({id, title}) => (
                        <Col key={id}>
                            <Card className={"mb-3"}>
                                <Card.Body>
                                    <Card.Title className={"mb-0"}>
                                        <Link href={`/books?_id=${id}`}><a className={"btn-link"}>{title}</a></Link>
                                    </Card.Title>
                                    <div className={"my-2"}>
                                        <Link href={`/books/edit?_id=${id}`}>
                                            <a className={"btn btn-sm btn-info mr-2"}>Edit</a>
                                        </Link>

                                        <Button className={"btn btn-sm btn-danger"}
                                                onClick={() => handleDeleteBook(id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </div>
            </Container>
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