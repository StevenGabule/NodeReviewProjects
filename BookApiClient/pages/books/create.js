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
import dynamic from "next/dynamic";


const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})


const INITIAL_VALUE = {
    title: "",
    description: "",
    price: "",
    avatar: ""
}

function Create() {
    const [book, setBook] = useState(INITIAL_VALUE);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    const [show, setShow] = useState(true);

    const modules = {
        toolbar: [
            [{'header': [1, 2, false]}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];


    function handleChange(e) {
        let inputValue = "";
        const {name, value, files} = e.target;
        if (e.target.name === "avatar") {
            inputValue = files[0];
        }
        if (inputValue !== "") {
            setBook(prevState => ({...prevState, [name]: inputValue}))
        } else {
            setBook(prevState => ({...prevState, [name]: value}))
        }
    }

    function handleInputChange(e) {
        setBook(prevState => ({...prevState, description: e}))
        console.log(e)
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            setLoading(true);
            setError('');
            let formData = new FormData();

            const url = `${baseUrl}/api/v1/books`;
            const config = {
                headers: {'content-type': 'multipart/form-data'}
            }

            const {title, price, description, avatar} = book;
            formData.append('title', title);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('avatar', avatar);

            await axios.post(url, formData, config)
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
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                            <ReactQuill theme="snow" style={{ height: 250}}
                                        modules={modules}
                                        formats={formats}
                                        value={book.description}
                                        onChange={handleInputChange}
                                        id="InputDescription"
                                        rows="3"/>
                        </div>
                        <br/>
                        <br/>
                        <div className="form-group">
                            <input type="file" name="avatar" accept="image/*" onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <Button variant="primary" disabled={disabled || loading} type={"submit"}>Create</Button>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

Create.modules = {
    toolbar: [
        [
            {header: '1'},
            {header: '2'},
            {font: []}],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['link', 'image', 'video',]
            ['clean'],
        ['code-block']
    ]
}

Create.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image', 'video', 'code-block'
]

export default Create;