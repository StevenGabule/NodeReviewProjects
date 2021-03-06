import React, {useState} from "react";
import Layout from "../components/_App/Layout";
import {Button, Col, Container, Row} from "react-bootstrap";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import catchErrors from "../utils/catchErrors";
import {handleLogin} from "../utils/auth";
import Alert from "react-bootstrap/Alert";
import Head from "next/head";

const INITIAL_VALUE = {
    email: "mike@gmail.com",
    password: "password",
}

function Login() {
    const [user, setUser] = useState(INITIAL_VALUE);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState({});
    const [show, setShow] = useState(true);

    function handleChange(e) {
        const {name, value} = e.target;
        setUser(prevState => ({...prevState, [name]: value}))
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            setLoading(true);
            setError({});
            const url = `${baseUrl}/api/v1/users/login`;
            const { email, password} = user;
            const payload = { email, password};
            const response = await axios.post(url, payload)
            handleLogin(response.data);
        } catch (e) {
            // console.log(e)
            catchErrors(e, setError);
            setShow(true);
        } finally {
            setLoading(false);
        }
    }
    return <>
        <Head>
            <title>Login</title>
        </Head>
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h3>Login</h3>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="row">
                            {Object.keys(error).length > 0 && (
                                <div className="col-md-12">
                                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                                        <p className={"mb-0"}>{error.message}</p>
                                    </Alert>
                                </div>
                            )}
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
                                <Button type={"submit"} name={"submit"}
                                        className={"btn btn-block btn-primary"}>
                                    Login
                                </Button>
                            </div>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    </>
}

export default Login;