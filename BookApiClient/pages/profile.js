import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import catchErrors from "../utils/catchErrors";
import Alert from "react-bootstrap/Alert";
import Head from "next/head";

const PASSWORD = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
}

function Profile({user: ProfileInfo, token: Tokens}) {
    const [user, setUser] = useState(ProfileInfo.data);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState(PASSWORD);
    const [token, setToken] = useState(Tokens);

    function handleChange(e) {
        const {name, value} = e.target;
        setUser(prevState => ({...prevState, [name]: value}))
    }

    function handleChangePassword(e) {
        const {name, value} = e.target;
        setPassword(prevState => ({...prevState, [name]: value}))
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            setLoading(true);
            setError('');
            const url = `${baseUrl}/api/v1/users/update`;
            const { name, contact_number, email, } = user;
            const payload = { name, contact_number, email};
            const headers = {headers: {Authorization: token}};
            const response = await axios.put(url, payload, headers)
            console.log(response)
        } catch (e) {
            catchErrors(e, setError);
            setShow(true);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmitPassword(e) {
        e.preventDefault();

        setLoading(true);
        setError({});
        const url = `${baseUrl}/api/v1/users/update/password`;

        const {
            currentPassword,
            newPassword,
            confirmPassword,
        } = password;

        if (newPassword !== confirmPassword) {
            // setError("");
            setShow(true);
        } else {
            try {
                const payload = {
                    params: {
                        currentPassword,
                        newPassword,
                    }
                };
                const headers = {headers: {Authorization: token}};
                const response = await axios.put(url, payload, headers)
                console.log(response)
            } catch (e) {
                catchErrors(e, setError);
            } finally {
                setLoading(false);
            }
        }
    }

    return <>
        <Head>
            <title>{user.name} Profile</title>
        </Head>
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h3>Personal Information</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col mb-3">
                                <label htmlFor="name">Name</label>
                                <input type="text"
                                       className="form-control"
                                       id="name"
                                       placeholder=""
                                       value=""
                                       name={"name"}
                                       required value={user.name}
                                       onChange={handleChange}/>
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
                                <Button type={"submit"} name={"submit"}
                                        className={"btn btn-primary"}>
                                    Save changes
                                </Button>
                            </div>
                        </div>
                    </form>
                </Col>

                <Col md={8}>
                    <h3 style={{marginTop: '10%'}}>Change Password</h3>
                    <form onSubmit={handleSubmitPassword}>
                        <div className="row">
                            {Object.keys(error).length > 0 && (
                                <div className="col-md-12 mb-3">
                                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                                        <p>{error.message}</p>
                                    </Alert>
                                </div>
                            )}
                            <div className="col-md-12 mb-3">
                                <label htmlFor="password_confirmation">Current password</label>
                                <input type="password"
                                       className="form-control"
                                       id="currentPassword"
                                       name="currentPassword"
                                       placeholder=""
                                       onChange={handleChangePassword}
                                       value={password.currentPassword}
                                       required/>
                            </div>


                            <div className="col-md-12 mb-3">
                                <label htmlFor="password_confirmation">New Password</label>
                                <input type="password"
                                       className="form-control"
                                       id="newPassword"
                                       name="newPassword"
                                       placeholder=""
                                       onChange={handleChangePassword}
                                       value={password.newPassword}
                                       required/>
                            </div>

                            <div className="col-md-12 mb-3">
                                <label htmlFor="password">Confirm Password</label>
                                <input type="password"
                                       className="form-control"
                                       id="confirmPassword"
                                       placeholder=""
                                       name={"confirmPassword"}
                                       value={password.confirmPassword}
                                       onChange={handleChangePassword}
                                       required/>
                            </div>

                            <div className="col-md-12 mb-3">
                                <Button type={"submit"} name={"submit"}
                                        className={"btn btn-primary"}>
                                    Save password
                                </Button>
                            </div>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    </>
}

export default Profile;