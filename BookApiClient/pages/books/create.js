import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import catchErrors from "../../utils/catchErrors";
import Alert from "react-bootstrap/Alert";
import Router from "next/router";
import Layout from "../../components/Layout";

const INITIAL_VALUE = {
    title: "",
    description: "",
    price: ""
}

function Create() {
    const [book, setBook] = useState(INITIAL_VALUE);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    const [show, setShow] = useState(true);

    function handleChange(e) {
        const {name, value} = e.target;
        setBook(prevState => ({...prevState, [name]: value}))
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            setLoading(true);
            setError('');
            const url = `${baseUrl}/api/v1/books`;
            const {title, price, description} = book;
            const payload = {title, price, description};
            await axios.post(url, payload)
            setBook(INITIAL_VALUE);
            setSuccess(true)
            await Router.push('/');
        } catch (e) {
            catchErrors(e, setError);
            setShow(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Layout>
            <Container>
                <Row>
                    <Col>
                        {error && show && (
                            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                <p>{error.message}</p>
                            </Alert>
                        )}
                        <h4>Create a book information</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" name={"title"} value={book.title}
                                       placeholder="" onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="InputPrice" className="form-label">Price</label>
                                <input type="text" className="form-control" id="InputPrice" name={"price"}
                                       value={book.price}
                                       onChange={handleChange}
                                       placeholder=""/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="InputDescription" className="form-label">Description</label>
                                <textarea className="form-control" onChange={handleChange} value={book.description}
                                          id="InputDescription" rows="3" name={"description"}/>
                            </div>
                            <div className="mb-3">
                                <Button variant="primary" disabled={disabled || loading} type={"submit"}>Create</Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Create;