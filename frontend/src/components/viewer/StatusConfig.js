import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Upload,
  XCircle,
} from "lucide-react";

export const STATUS_CONFIG = {
  failed: {
    icon: XCircle,
    className: "fg-danger-subtle text-danger",
    classNameBg: "bg-danger-subtle text-danger",
  },
  completed: {
    icon: CheckCircle2,
    className: "fg-success-subtle text-success",
    classNameBg: "bg-success-subtle text-success",
  },
  inprogress: {
    icon: Upload,
    className: "fg-primary-subtle text-primary",
    classNameBg: "bg-primary-subtle text-primary",
  },
  created: {
    icon: Clock,
    className: "fg-warning-subtle text-warning",
    classNameBg: "bg-warning-subtle text-warning",
  },
  default: {
    icon: AlertCircle,
    className: "fg-secondary-subtle text-secondary",
    classNameBg: "bg-secondary-subtle text-secondary",
  },
};

export const getStatusConfig = (status) => {
  const statusKey = status?.toLowerCase();
  return STATUS_CONFIG[statusKey] || STATUS_CONFIG.default;
};
