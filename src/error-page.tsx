import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    let errorMessage: string = "An unexpected error has occurred.";

    if (error instanceof Error) {
        errorMessage = error.message;
    } else if (
        typeof error === "object" &&
        error !== null &&
        "statusText" in error &&
        typeof (error as any).statusText === "string"
    ) {
        errorMessage = (error as any).statusText;
    }

    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{errorMessage}</i>
            </p>
        </div>
    );
}
