import { lazy } from "react";
import FileViewerPage from "../pages/FileViewerPage";
const preloadComponent = (importFn) => {
  const Component = lazy(importFn);
  Component.preload = importFn;
  return Component;
};

export const routes = {
  public: [
    {
      path: "/login",
      component: preloadComponent(() => import("@/pages/LoginPage")),
      title: "Login",
    },
    {
      path: "/register",
      component: preloadComponent(() => import("@/pages/RegistrationForm")),
      title: "Register",
    },
  ],
  private: [
    {
      path: "/",
      component: preloadComponent(() => import("@/pages/FileUploadPage")),
      title: "File Upload",
    },
    {
      path: "/file-viewer",
      component: FileViewerPage,
      title: "File Viewer",
    }
  ],
};