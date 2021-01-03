import React from "react";

export default function Books() {
    return <div>id</div>
}

export async function getStaticPaths({params}) {
    // Return a list of possible value for id
    console.log(params);
    return {
        paths: [{params: [{ }]}],
        fallback: false
    }
}

export async function getStaticProps({params}) {
    // Fetch necessary data for the blog post using params.id
    console.log(params.id)
}