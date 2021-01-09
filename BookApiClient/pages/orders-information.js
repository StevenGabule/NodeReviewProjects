import React, {useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import catchErrors from "../utils/catchErrors";
import Alert from "react-bootstrap/Alert";
import Head from "next/head";
import Router from "next/router";

const INITIAL_VALUE = {
    deliveryDate: "",
    orderStatus: 1,
    voucherId: null,
    streetId: 1,
    barangayId: 1,
    municipalityId: 1,
    supplierFee: 200,
    note: "i want work man",
};

function Order({user, token}) {
    const [order, setOrder] = useState(INITIAL_VALUE);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);

    function handleChange(e) {
        const {name, value} = e.target;
        setOrder(prevState => ({...prevState, [name]: value}))
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            setLoading(true);
            setError('');
            const url = `${baseUrl}/api/v1/orders`;
            const { deliveryDate, orderStatus, voucherId,streetId, barangayId, municipalityId, supplierFee, note} = order;
            const payload = { deliveryDate, orderStatus, voucherId,streetId, barangayId, municipalityId, supplierFee, note};
            const headers = {headers: {Authorization: token}};
            const response = await axios.post(url, payload, headers)
            Router.push("/orders").then();
        } catch (e) {
            catchErrors(e, setError);
            setShow(true);
        } finally {
            setLoading(false);
        }
    }

    return <>
        <Head>
            <title>Set Your Order Information</title>
        </Head>
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h3>Order Information</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col mb-3">
                                <label htmlFor="streetId">Delivery Date</label>
                                <input type="date"
                                       className="form-control"
                                       id="deliveryDate"
                                       placeholder=""
                                       value=""
                                       name={"deliveryDate"}
                                       required value={order.deliveryDate}
                                       onChange={handleChange}/>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col mb-3">
                                <label htmlFor="streetId">Select the street address</label>
                                <input type="text"
                                       className="form-control"
                                       id="streetId"
                                       placeholder=""
                                       value=""
                                       name={"streetId"}
                                       required value={order.streetId}
                                       onChange={handleChange}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <label htmlFor="barangayId">Select the barangay</label>
                                <input type="text"
                                       className="form-control"
                                       id="barangayId"
                                       placeholder=""
                                       name={"email"}
                                       value={order.barangayId}
                                       onChange={handleChange}
                                       required/>
                            </div>

                            <div className="col-md-12 mb-3">
                                <label htmlFor="municipalityId">Select the state/province</label>
                                <input type="text"
                                       className="form-control"
                                       id="municipalityId"
                                       placeholder=""
                                       name={"municipalityId"}
                                       value={order.municipalityId}
                                       onChange={handleChange}
                                       required/>
                            </div>

                            <div className="col-md-12 mb-3">
                                <label htmlFor="note">Additional instruction</label>
                                <textarea
                                       className="form-control"
                                       id="note"
                                       placeholder=""
                                       name={"note"}
                                       value={order.note}
                                       onChange={handleChange} rows={4}
                                       required/>
                            </div>

                            <div className="col-md-12 mb-3">
                                <Button type={"submit"} name={"submit"}
                                        className={"btn btn-primary"}>
                                    Place Order
                                </Button>
                            </div>
                        </div>
                    </form>
                </Col>

            </Row>
        </Container>
    </>
}

export default Order;