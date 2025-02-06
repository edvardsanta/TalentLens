import React from "react";
import PropTypes from "prop-types";
export const Alert = ({
  variant = "primary",
  children,
  className = "",
  dismissible = false,
  onClose,
}) => {
  const [show, setShow] = React.useState(true);

  const handleClose = () => {
    setShow(false);
    onClose && onClose();
  };

  if (!show) return null;

  return (
    <div
      className={`alert alert-${variant} ${dismissible ? "alert-dismissible fade show" : ""} ${className}`}
      role="alert"
    >
      {children}
      {dismissible && (
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={handleClose}
        ></button>
      )}
    </div>
  );
};

Alert.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  dismissible: PropTypes.bool,
  onClose: PropTypes.func,
};

export const AlertTitle = ({ children, className = "" }) => (
  <h4 className={`alert-heading ${className}`}>{children}</h4>
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
