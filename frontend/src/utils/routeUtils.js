import { routes } from "../routes/routes";
/**
 * Get route path by name
 * @param {string} routeName - The name of the route
 * @returns {string} The path of the route
 */
export const getRoutePath = (routeName) => {
  const allRoutes = [...routes.public, ...routes.private];
  const route = allRoutes.find(
    (r) => r.title.toLowerCase() === routeName.toLowerCase(),
  );
  return route?.path || "/";
};

/**
 * Check if a route is private
 * @param {string} path - The path to check
 * @returns {boolean} Whether the route is private
 */
export const isPrivateRoute = (path) => {
  return routes.private.some((route) => route.path === path);
};

/**
 * Get route title by path
 * @param {string} path - The path to get the title for
 * @returns {string} The title of the route
 */
export const getRouteTitle = (path) => {
  const allRoutes = [...routes.public, ...routes.private];
  const route = allRoutes.find((r) => r.path === path);
  return route?.title || "Not Found";
};
