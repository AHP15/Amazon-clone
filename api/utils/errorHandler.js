

const handleError = (err, status, res) => {
    console.log(err);
    res.status(status).send({
        success: false,
        message: err.message
    });
}

const handleAsyncError = (theFunc) => (req, res) => {
    Promise.resolve(theFunc(req, res))
    .catch(err => {
        if(err._message && err._message.indexOf("validation failed") !== -1){
            return handleError(err, 400, res);
        }
        if(err.name && err.name === "CastError"){
            return handleError(new Error(`Resource not found: Invalid ${err.path}`), 400, res);
        }
        if(err.code === 11000){
            return handleError(new Error("User with this email already exist!"), 400, res);
        }
        return handleError(err, 500, res);
    })
}

export { handleError,handleAsyncError };
