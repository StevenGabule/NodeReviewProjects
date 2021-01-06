import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import catchErrors from "../utils/catchErrors";

const PASSWORD = {
    current: "",
    new: "",
    confirm: "",
}

function Profile({user: ProfileInfo, token: Tokens}) {
    const [user, setUser] = useState(ProfileInfo.data);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    const [show, setShow] = useState(true);
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
            const {
                firstName,
                middleName,
                lastName,
                contact_number,
                email,
            } = user;
            const payload = {
                params: {
                    firstName,
                    middleName,
                    lastName,
                    contact_number,
                    email
                }
            };
            const headers = { headers: {Authorization: token} };
            const response = await axios.put(url, payload, headers)
            console.log(response)
        } catch (e) {
            catchErrors(e, setError);
            setShow(true);
        } finally {
            setLoading(false);
        }
    }

    return <>
        <h3>Profile Information</h3>
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h3 style={{marginTop: '10%'}}>Personal Information</h3>
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
                                       required value={user.firstName}
                                       onChange={handleChange}/>
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
                    <form action="">
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <label htmlFor="password_confirmation">Current password</label>
                                <input type="password"
                                       className="form-control"
                                       id="current"
                                       name="current"
                                       placeholder=""
                                       onChange={handleChangePassword}
                                       value={password.current}
                                       required/>
                            </div>


                            <div className="col-md-12 mb-3">
                                <label htmlFor="password_confirmation">New Password</label>
                                <input type="password"
                                       className="form-control"
                                       id="new"
                                       name="new"
                                       placeholder=""
                                       onChange={handleChangePassword}
                                       value={password.new}
                                       required/>
                            </div>

                            <div className="col-md-12 mb-3">
                                <label htmlFor="password">Confirm Password</label>
                                <input type="password"
                                       className="form-control"
                                       id="confirm"
                                       placeholder=""
                                       name={"confirm"}
                                       value={password.confirm}
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