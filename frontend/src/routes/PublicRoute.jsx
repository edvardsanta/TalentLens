import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
const PublicRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? <Navigate to="/" replace /> : children;
};
PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PublicRoute;
