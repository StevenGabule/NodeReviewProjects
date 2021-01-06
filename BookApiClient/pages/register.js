import React, {useState} from "react";
import Layout from "../components/_App/Layout";
import {Button, Col, Container, Row} from "react-bootstrap";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import Router from "next/router";
import catchErrors from "../utils/catchErrors";

const INITIAL_VALUE = {
    firstName: "mike",
    lastName: "ross",
    middleName: "d",
    email: "mike@gmail.com",
    contact_number: "0987654321",
    password: "password",
    password_confirmation: "password",
}

function Register() {
    const [user, setUser] = useState(INITIAL_VALUE);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    const [show, setShow] = useState(true);

    function handleChange(e) {
        const {name, value} = e.target;
        setUser(prevState => ({...prevState, [name]: value}))
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            setLoading(true);
            setError('');
            const user_type = 1;
            const url = `${baseUrl}/api/v1/users/register`;
            const {
                firstName,
                middleName,
                lastName,
                email,
                contact_number,
                password} = user;
            const payload = {firstName,
                middleName,
                lastName,
                email,
                contact_number,
                password,
                user_type,
            };
            await axios.post(url, payload)
            setUser(INITIAL_VALUE);
            setSuccess(true)
            await Router.push('/login');
        } catch (e) {
            catchErrors(e, setError);
            setShow(true);
        } finally {
            setLoading(false);
        }
    }

    return <>
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h3>Register</h3>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="firstName">First name</label>
                                <input type="text"
                                       className="form-control"
                                       id="firstName"
                                       placeholder=""
                                       value=""
                                       name={"firstName"}
                                       required value={user.firstName} onChange={handleChange}/>
                            </div>

                            <div className="col-md-4 mb-3">
                                <label htmlFor="middleName">Middle name</label>
                                <input type="text"
                                       className="form-control"
                                       id="middleName"
                                       placeholder=""
                                       value={user.middleName}
                                       name={"middleName"}
                                       onChange={handleChange}
                                       required/>

                            </div>

                            <div className="col-md-4 mb-3">
                                <label htmlFor="lastName">Last name</label>
                                <input type="text"
                                       className="form-control"
                                       id="lastName"
                                       placeholder=""
                                       name={"lastName"}
                                       value={user.lastName}
                                       onChange={handleChange}
                                       required/>

                            </div>
                        </div>

                        <div className="row">

                            <div className="col-md-12 mb-3">
                                <label htmlFor="email">Email</label>
                                <input type="text"
                                       className="form-control"
                                       id="email"
                                       placeholder=""
                                       name={"email"}
                                       value={user.email}
                                       onChange={handleChange}
                                       required/>
                            </div>

                            <div className="col-md-12 mb-3">
                                <label htmlFor="contact_number">Contact number</label>
                                <input type="text"
                                       className="form-control"
                                       id="contact_number"
                                       placeholder=""
                                       name={"contact_number"}
                                       value={user.contact_number}
                                       onChange={handleChange}
                                       required/>
                            </div>

                            <div className="col-md-12 mb-3">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                       className="form-control"
                                       id="password"
                                       placeholder=""
                                       name={"password"}
                                       value={user.password}
                                       onChange={handleChange}
                                       required/>
                            </div>

                            <div className="col-md-12 mb-3">
                                <label htmlFor="password_confirmation">Password Confirm</label>
                                <input type="password"
                                       className="form-control"
                                       id="password_confirmation"
                                       name="password_confirmation"
                                       placeholder=""
                                       onChange={handleChange}
                                       value={user.password_confirmation}
                                       required/>
                            </div>

                            <div className="col-md-12 mb-3">
                                <Button type={"submit"} name={"submit"}
                                        className={"btn btn-block btn-primary"}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    </>
}

export default Register;