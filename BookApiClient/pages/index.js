import React, {useEffect} from 'react';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Link from "next/link";

function HomePage({data}) {
    return (
        <Container>
            <Row>
                <Col>
                    <div className={"d-flex justify-content-between align-items-center"}>
                        <h1>E-Book Page</h1>
                        <Link href="/books/create">
                            <a>New Book</a>
                        </Link>
                    </div>
                    {data.map(({id, title, description}) => (
                        <Card key={id}>
                            <Card.Body>
                                <Card.Title>
                                    <Link href={`/books?_id=${id}`}><a>{title}</a></Link>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
        </Container>
    )
}

export async function getStaticProps() {
    const res = await fetch('http://localhost:8000/api/v1/books');
    const {data} = await res.json();
    return {
        props: {
            data
        }
    }
}

export default HomePage;