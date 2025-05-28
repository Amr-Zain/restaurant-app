"use client";

interface ErrRes {
  statusCode: number;
}

export default function Error({
  error,
  reset,
}: {
  error: Error | ErrRes;
  reset: () => void;
}) {
  const getErrorMessage = (error: Error | ErrRes): string => {
    let statusCode = 500;
    let message = "";

    if ("statusCode" in error) {
      // error is ErrRes
      statusCode = error.statusCode;
    } else {
      // error is Error
      message = error.message;
    }

    switch (statusCode) {
      case 400:
        return "400 - Bad Request. Please check your request.";
      case 401:
        return "401 - Unauthorized. Please log in.";
      case 403:
        return "403 - Forbidden. You don't have permission to access this resource.";
      case 404:
        return "404 - Page Not Found. The resource doesn't exist.";
      case 500:
        return `500 - Internal Server Error. ${message}`;
      default:
        return `Error ${statusCode}: ${message || "An unexpected error occurred."}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
      <h1 className="text-4xl font-bold">Oops! Something Went Wrong</h1>
      <p className="mt-4 text-lg">{getErrorMessage(error)}</p>
      <button
        type="button"
        className="mt-6 rounded-sm bg-red-600 px-6 py-3 text-white transition hover:bg-red-700"
        onClick={reset}
      >
        Try Again
      </button>
    </div>
  );
}
