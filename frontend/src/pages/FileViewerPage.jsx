import FileHistoryViewer from "@/components/viewer/FileViewer";
import mockFiles from "../Mock/mockFileViewer";

function FileViewerPage() {
  return <FileHistoryViewer files={mockFiles} />;
}

export default FileViewerPage;
