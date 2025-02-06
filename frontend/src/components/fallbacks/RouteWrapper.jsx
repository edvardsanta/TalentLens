import React, { Suspense, useRef, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import LoadingFallback from "./LoadingFallback";
import ErrorFallback from "./ErrorFallback";
import PropTypes from "prop-types";

const RouteWrapper = ({ children }) => {
  const loadingStartTimeRef = useRef(null);

  useEffect(() => {
    return () => {
      if (loadingStartTimeRef.current) {
        const timeElapsed = Date.now() - loadingStartTimeRef.current;
        console.log(`Component lazy loading time: ${timeElapsed}ms`);
      }
    };
  }, []);

  const handleLoadingStart = () => {
    loadingStartTimeRef.current = Date.now();
    return <LoadingFallback />;
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={handleLoadingStart()}>{children}</Suspense>
    </ErrorBoundary>
  );
};

RouteWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RouteWrapper;
