import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    // Application errors are captured by router and we can capture and log them here
    const error = useRouteError();

    // Once we have the error we can determine if it is an application error or a route error
    //>> isRouteErrorResponse(error);

    return (
        <>
            <h1>Oops...</h1>
            <p>
                {isRouteErrorResponse(error)
                    ? 'Page not found'
                    : error instanceof Error
                    ? error.message
                    : 'Sorry, an unexpected error has occurred'}
            </p>
        </>
    );
};

export default ErrorPage;
