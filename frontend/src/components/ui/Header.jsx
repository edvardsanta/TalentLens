import { Link, useNavigate } from "react-router-dom";
import { routes } from "@/routes/routes";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/Redux/thunks/authThunks";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary w-100">
      <div className="container">
        <Link className="navbar-brand" to="/">
          {import.meta.env.VITE_APP_NAME}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {routes.private.map(({ path, title }) => (
              <li key={path} className="nav-item">
                <Link className="nav-link" to={path}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="d-flex align-items-center">
            <span className="text-light me-3">{user?.id}</span>
            {user && (
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
