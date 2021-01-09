import React, {useState} from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import catchErrors from "../utils/catchErrors";
import Alert from "react-bootstrap/Alert";
import Head from "next/head";
import HomePage from "./index";
import {parseCookies} from "nookies";
import Link from "next/link";


function Carts({carts}) {
    console.log(carts)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [cartProducts, setCartProducts] = useState(carts);

    return <>
        <Head>
            <title>Carts</title>
        </Head>
        <Container>
            <Row className="justify-content-md-center">
                <Col md={12}>
                    <h3>Cart information</h3>
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {parseInt(cartProducts.length) !== 0 && cartProducts.map(({Book,qty}, i) => (
                                <tr key={i}>
                                    <td>{++i}</td>
                                    <td>{Book.title}</td>
                                    <td>{Book.price}</td>
                                    <td>{qty}</td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Link href={"/orders-information"}>
                        <a className={'btn btn-primary btn-sm'}>Checkout</a>
                    </Link>
                </Col>
            </Row>
        </Container>
    </>
}

Carts.getInitialProps = async ctx => {
    try {
        const {token} = parseCookies(ctx);
        if (!token) {
            return { carts: [] };
        }
        const headers = {headers: {Authorization: token}};
        const {data} = await axios.get(`${baseUrl}/api/v1/carts`, headers);
        console.log(data.data)
        return {carts: data.data}
    } catch (e) {
        throw e;
    }
}

export default Carts;