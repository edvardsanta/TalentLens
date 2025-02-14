import { useCallback, useState, useEffect } from "react";
import { useErrorLogging } from "@/hooks/useErrorLogging";
import FileViewerService from "@/services/FileViewerService";
//import { generateMockFilesPage } from "../../Mock/mockFileViewer";
const CHUNK_SIZE = 20;

/**
 * Custom hook for managing file viewing functionality.
 * @param {import('../types/auth.types').AuthResponse | null} user - The current user.
 * @returns {{
 *   files: object,
 *   error: string,
 *   loading: boolean,
 *   refreshFiles: () => void
 * }} File viewer state and functions.
 */
function useFileViewer(user) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const fileViewerService = new FileViewerService();
  const { handleError } = useErrorLogging();
  const fetchFileChunk = useCallback(
    async (pageNumber) => {
      if (!user) return;
      setLoading(true);
      setError("");

      try {
        const {
          files: newFiles,
          pagination: { totalCount: totalCount },
        } = await fileViewerService.getFiles(
          pageNumber + 1, // API uses 1-based pagination
          CHUNK_SIZE,
          "createdAt",
          true,
          user.token,
        );
        if (
          newFiles.length < CHUNK_SIZE ||
          (pageNumber + 1) * CHUNK_SIZE >= totalCount
        ) {
          setHasMore(false);
        }

        // console.log("New files:", newFiles);
        // const {files: filesMocked, pagination: { totalCount: filesMockedCount } } = generateMockFilesPage({page:pageNumber + 1, pageSize: CHUNK_SIZE});
        // console.log("Mocked files:", filesMocked);
        // console.log("Mocked files count:", filesMockedCount);
        // if (filesMocked.length < CHUNK_SIZE || (pageNumber + 1) * CHUNK_SIZE >= filesMockedCount) {
        //   setHasMore(false);
        // }
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      } catch (err) {
        setError("Failed to load file history. Please try again later.");
        handleError(err, {
          component: "FileViewerPage",
          action: "fetchFileChunk",
        });
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchFileChunk(nextPage);
    }
  }, [loading, hasMore, page, fetchFileChunk]);

  const refreshFiles = useCallback(() => {
    setFiles([]);
    setPage(0);
    setHasMore(true);
    fetchFileChunk(0);
  }, [fetchFileChunk]);

  useEffect(() => {
    if (page === 0) {
      fetchFileChunk(0);
    }
  }, [fetchFileChunk, page]);

  return {
    files,
    error,
    loading,
    hasMore,
    refreshFiles,
    loadMore,
  };
}

export default useFileViewer;
