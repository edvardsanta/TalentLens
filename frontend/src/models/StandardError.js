// Standard Error Model
const StandardError = {
  id: "",
  message: "",
  code: "",
  trace: {
    traceId: "",
    spanId: "",
    functionId: "",
    file: "",
    line: 0,
  },
  metadata: {
    timestamp: "",
    environment: "",
    context: "",
    severity: "",
  },
};

export default StandardError;
