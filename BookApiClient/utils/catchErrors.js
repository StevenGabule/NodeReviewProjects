function catchErrors(error, displayError) {
    let errorMsg;
    if (error.response) {
        // the request was made and the server responsed with a status code that
        // is not in the range of 2xx
        errorMsg = error.response.data;
        console.error("error response", errorMsg);
    } else if(error.request) {
        // the request was made, but no response was received
        errorMsg = error.request;
        console.error("Error request", errorMsg);
    } else {
        // something else happened in making the request that triggered an err
        errorMsg = error.message;
        console.error("Error message: ", errorMsg);
    }
    displayError(errorMsg);
}

export default catchErrors