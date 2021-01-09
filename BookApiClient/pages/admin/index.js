import React from 'react';
import {Container, Col, Card, Button} from "react-bootstrap";
import Link from "next/link";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import Head from "next/head";

function HomePage({data}) {
    async function handleDeleteBook(id) {
        const url = `${baseUrl}/api/v1/books/${id}`
        const response = await axios.delete(url, null);
        console.log(response);
    }

    return (
        <>
            <Head>
                <title>Admin Management</title>
            </Head>
            <Container>
                <div className={"d-flex justify-content-between align-items-center"}>
                    <Link href="/books/create">
                        <a>New Book</a>
                    </Link>
                </div>

            </Container>
            <style jsx>{`
                .page-title {
                    font-size: 24px;
                    margin-top: 2%;
                }
            `}</style>
        </>
    )
}

HomePage.getInitialProps = async () => {
    try {
        const {data} = await axios.get(`${baseUrl}/api/v1/books`);
        return {data: data.data}
    } catch (e) {
        throw e;
    }
}

export default HomePage;