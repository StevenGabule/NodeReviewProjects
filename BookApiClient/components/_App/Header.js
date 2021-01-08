import Router, {useRouter}  from "next/router";
import Link from "next/link";
import React from "react";
import {Button, Navbar} from "react-bootstrap";
import {handleLogout} from "../../utils/auth";
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function Header({user}) {
    const router = useRouter();

    function isActive(route) {
        return route === router.pathname;
    }

    return (
        <Navbar collapseOnSelect expand={"lg"} bg={"dark"} variant={"dark"}>
            <div className="container">
                <Link href="/">
                    <a className="navbar-brand">FullyBook</a>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">

                        <li className={isActive("/") ? "nav-item active" : "nav-item"}>
                            <Link href="/">
                                <a className="nav-link">Home</a>
                            </Link>
                        </li>

                        <li className={isActive("/best-seller") ? "nav-item active" : "nav-item"}>
                            <Link href="/best-seller">
                                <a className="nav-link">Best Sellers</a>
                            </Link>
                        </li>

                        <li className={isActive("/new-releases") ? "nav-item active" : "nav-item"}>
                            <Link href="/new-releases">
                                <a className="nav-link">New Releases</a>
                            </Link>
                        </li>

                        <li className={isActive("/pre-order-title") ? "nav-item active" : "nav-item"}>
                            <Link href="/pre-order-title">
                                <a className="nav-link">Pre-Order Titles</a>
                            </Link>
                        </li>

                        <li className={isActive("/category") ? "nav-item active" : "nav-item"}>
                            <Link href="/category">
                                <a className="nav-link">Shop By Category</a>
                            </Link>
                        </li>

                        <li className={isActive("/genre") ? "nav-item active" : "nav-item"}>
                            <Link href="/genre">
                                <a className="nav-link">Genre</a>
                            </Link>
                        </li>

                        <li className={isActive("/deals") ? "nav-item active" : "nav-item"}>
                            <Link href="/deals">
                                <a className="nav-link">Deals</a>
                            </Link>
                        </li>
                    </ul>
                    {user  ? (
                        <>
                            <Link href={"/profile"}>
                                <a className="nav-link">Profile</a>
                            </Link>
                            <Button size={"sm"} type={"button"} onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <div className="form-inline my-2 my-lg-0">
                            <Link href={"/login"}><a className="btn btn-primary btn-sm my-2 mr-2 my-sm-0">Login</a></Link>
                            <Link href={"/register"}><a className="btn btn-primary btn-sm my-2 my-sm-0" >Register</a></Link>
                        </div>
                    )}
                </div>
            </div>
        </Navbar>
    )
}

export default Header;