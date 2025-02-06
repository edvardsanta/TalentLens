import { useCallback } from "react";
import { logger } from "@/services/logging/LoggerService";

const useErrorLogging = () => {
  const handleError = useCallback(async (error, errorInfo) => {
    await logger.logError(error, errorInfo);
  }, []);

  return { handleError };
};

export { useErrorLogging };
