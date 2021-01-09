import React, {useState} from "react";
import {Col, Container, Row, Table} from "react-bootstrap";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import Head from "next/head";
import {parseCookies} from "nookies";
import Link from "next/link";


function Orders({orders: customerOrders}) {
    console.log(orders)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [orders, setOrder] = useState(customerOrders);

    return <>
        <Head>
            <title>Orders</title>
        </Head>
        <Container>
            <Row className="justify-content-md-center">
                <Col md={12}>
                    <h3>Your Order information</h3>
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
                        {/*{orders.map(({Book,qty}, i) => (
                            <tr key={i}>
                                <td>{++i}</td>
                                <td>{Book.title}</td>
                                <td>{Book.price}</td>
                                <td>{qty}</td>
                                <td></td>
                            </tr>
                        ))}*/}
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

Orders.getInitialProps = async ctx => {
    try {
        const {token} = parseCookies(ctx);
        if (!token) {
            return { orders: [] };
        }
        const headers = {headers: {Authorization: token}};
        const {data} = await axios.get(`${baseUrl}/api/v1/orders`, headers);
        return {orders: data.data}
    } catch (e) {
        throw e;
    }
}

export default Orders;