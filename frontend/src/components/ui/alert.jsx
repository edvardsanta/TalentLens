import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Alert.scss";
import {
  faCircleCheck,
  faCircleXmark,
  faCircleExclamation,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ALERT_ICONS = {
  success: faCircleCheck,
  danger: faCircleXmark,
  warning: faCircleExclamation,
  info: faCircleInfo,
  primary: faCircleInfo,
};
export const Alert = ({
  variant = "primary",
  children,
  className = "",
  dismissible = false,
  onClose,
  autoClose = false,
  autoCloseTime = 5000,
  showIcon = true,
}) => {
  const [show, setShow] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (autoClose && show) {
      timeoutId = setTimeout(handleClose, autoCloseTime);
    }
    return () => timeoutId && clearTimeout(timeoutId);
  }, [autoClose, autoCloseTime, show]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShow(false);
      onClose?.();
    }, 300);
  };

  if (!show) return null;

  return (
    <div
      className={`
        alert 
        alert-${variant} 
        ${dismissible ? "alert-dismissible fade show" : ""} 
        ${isExiting ? "alert--exiting" : ""}
        ${showIcon ? "alert--with-icon" : ""}
        ${className}
      `}
      role="alert"
    >
      {showIcon && ALERT_ICONS[variant] && (
        <FontAwesomeIcon icon={ALERT_ICONS[variant]} className="alert__icon" />
      )}
      <div className="alert__content">{children}</div>
      {dismissible && (
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
        />
      )}
    </div>
  );
};

Alert.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
  ]),
  children: PropTypes.node,
  className: PropTypes.string,
  dismissible: PropTypes.bool,
  onClose: PropTypes.func,
  autoClose: PropTypes.bool,
  autoCloseTime: PropTypes.number,
  showIcon: PropTypes.bool,
};

export const AlertTitle = ({ children, className = "" }) => (
  <h4 className={`alert-heading mb-1 ${className}`}>{children}</h4>
);

AlertTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const AlertDescription = ({ children, className = "" }) => (
  <p className={`mb-0 ${className}`}>{children}</p>
);

AlertDescription.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
