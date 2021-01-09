import React from 'react';
import Header from "./Header";


export default function Layout({children, user}) {
    return (
        <>
            <Header user={user} />

            <main role="main">
                {children}
            </main>

            <footer className="container">
                <p>&copy; FullBook 2017-2020</p>
            </footer>
        </>
    )
}