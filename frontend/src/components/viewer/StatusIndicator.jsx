import PropTypes from "prop-types";
import { getStatusConfig } from "./StatusConfig";
export const StatusIndicator = ({ status, size = 20 }) => {
  const config = getStatusConfig(status);
  const IconComponent = config.icon;

  return <IconComponent size={size} />;
};

StatusIndicator.propTypes = {
  status: PropTypes.string,
  isError: PropTypes.bool,
  size: PropTypes.number,
};
