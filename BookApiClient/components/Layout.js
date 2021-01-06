import React from 'react';
import {Button} from "react-bootstrap";
import Link from "next/link";

export default function Layout({children}) {
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#" tabIndex="-1"
                                   aria-disabled="true">Disabled</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown"
                                   aria-haspopup="true" aria-expanded="false">Dropdown</a>
                                <div className="dropdown-menu" aria-labelledby="dropdown01">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li>
                        </ul>
                        <div className="form-inline my-2 my-lg-0">
                            <Link href={"/login"}><a className="btn btn-primary my-2 mr-2 my-sm-0">Login</a></Link>
                            <Link href={"/register"}><a className="btn btn-primary my-2 my-sm-0" >Register</a></Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main role="main">
                {children}
            </main>

            <footer className="container">
                <p>&copy; YourHeartBooks 2017-2020</p>
            </footer>
        </>
    )
}