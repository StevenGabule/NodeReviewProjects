import React, {useEffect} from 'react';

function HomePage({data}) {

    useEffect(() => {
        console.log(data);
    })

    return (
        <ul>
            {data.map((book) => (
                <li key={book.id}>{book.title}</li>
            ))}
        </ul>
    )
}

export async function getStaticProps() {
    const res = await fetch('http://localhost:8000/api/v1/books');
    const {data} = await res.json();
    return {
        props: {
            data
        }
    }
}

export default HomePage;