function Error({type}) {

    function msg() {
        if (type === "error") {
            return <h1 className="textInfo">You must be logged in to access this page</h1>
        } else {
            return <h1 className="textInfo">The page you're looking for does not exist</h1>
        }
    }

    return (
        <>
            {msg()}
        </>
    )
}

export default Error;