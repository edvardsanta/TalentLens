import React, { Suspense } from "react";
import LoadingFallback from "@/components/fallbacks/LoadingFallback";

const LazyComponent = () => {
  return (
    <div className="text-center p-4">
      <h2 className="text-xl font-bold mb-4">
        This is a lazy-loaded component!
      </h2>
      <p>It was loaded after a short delay.</p>
    </div>
  );
};

const BuggyComponent = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(LazyComponent);
    }, 2000);
  });
});
const ErrorBoundaryTestPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Lazy Load Test Page</h1>
      <Suspense fallback={<LoadingFallback />}>
        <BuggyComponent />
      </Suspense>
    </div>
  );
};
export default ErrorBoundaryTestPage;
