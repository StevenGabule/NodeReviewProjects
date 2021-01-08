import App from "next/app";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Layout from "../components/_App/Layout";
import {destroyCookie, parseCookies} from "nookies";
import {redirectUser} from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import '../styles/nprogress.css';
import "react-quill/dist/quill.snow.css";


class MyApp extends App {

    static async getInitialProps({Component, ctx}) {
        const {token} = parseCookies(ctx);
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        if (!token) {
            const isProtectedRoute = ctx.pathname === "/profile";
            if (isProtectedRoute) {
                redirectUser(ctx, '/login');
            }
        } else {
            try {
                const payload = {headers: {Authorization: token}};
                const url = `${baseUrl}/api/v1/users/profile`;
                const {data: user} = await axios.get(url, payload);
                pageProps.user = user;
                pageProps.token = token;
            } catch (e) {
                console.error("Error getting current user!", e);
                destroyCookie(ctx, 'token');
                redirectUser(ctx, 'login');
            }
        }
        return {
            pageProps
        };
    }

    render() {
        const {Component, pageProps} = this.props;
        return (
            <Layout {...pageProps}>
                <Component {...pageProps} />
            </Layout>
        )
    }
}

export default MyApp;