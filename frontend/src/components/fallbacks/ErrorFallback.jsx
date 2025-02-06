import PropTypes from "prop-types";
import { useErrorLogging } from "@/hooks/useErrorLogging";
import React, { useEffect } from "react";

/**
 * ErrorFallback component that displays an error message and a "Try again" button when an error occurs.
 * @param {object} props - The component props.
 * @param {object} props.error - The error object containing the error message.
 * @param {Function} props.resetErrorBoundary - A function to reset the error boundary and try again.
 * @returns {React.JSX.Element} The rendered ErrorFallback component.
 */
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const { handleError } = useErrorLogging();

  useEffect(() => {
    handleError(error);
  }, [error, handleError]);

  return (
    <div role="alert" className="error-fallback">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
ErrorFallback.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};
export default ErrorFallback;
