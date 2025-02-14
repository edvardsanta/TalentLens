import FileHistoryViewer from "@/components/viewer/FileViewer";
import { RefreshCw } from "lucide-react";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import LoadingFallback from "@/components/fallbacks/LoadingFallback";
import "./FileViewerPage.scss";
import useFileViewer from "@/hooks/files/useFileViewer";

/**
 * Component for displaying the file viewer page.
 * @returns {React.JSX.Element} The rendered component.
 */
function FileViewerPage() {
  const user = useSelector((state) => state.auth.auth);
  const { files, error, loading, hasMore, refreshFiles, loadMore } =
    useFileViewer(user);

  const handleItemsRendered = useCallback(
    ({ visibleStopIndex }) => {
      // If we're within 10 items of the end, load more
      if (visibleStopIndex > files.length - 10 && hasMore && !loading) {
        loadMore();
      }
    },
    [files.length, hasMore, loading, loadMore],
  );

  if (!user) {
    return (
      <Alert variant="danger">
        <AlertTitle>Authentication Required</AlertTitle>
        <AlertDescription>Please log in to view files.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">File History</h1>
        <div className="d-flex align-items-center gap-3">
          <button
            onClick={refreshFiles}
            disabled={loading}
            className="btn btn-primary d-flex align-items-center gap-2 position-relative"
          >
            <RefreshCw
              className={`${loading ? "animate-spin" : ""}`}
              size={20}
            />
            <span className="text-white">Refresh</span>
          </button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="h-[calc(100vh-12rem)]">
        <FileHistoryViewer
          files={files}
          onItemsRendered={handleItemsRendered}
        />

        {loading && (
          <div className="flex justify-center py-4">
            <LoadingFallback />
          </div>
        )}

        {!loading && !hasMore && files.length > 0 && (
          <div className="text-center py-4">
            <p>No more files to load.</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default FileViewerPage;
