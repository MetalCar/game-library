type RouteNames = "HOME" | "SEARCH" | "LIBRARY" | "WISHLIST";

const routes: Record<RouteNames, string> = {
  HOME: "/",
  SEARCH: "/search",
  LIBRARY: "/library",
  WISHLIST: "/wishlist",
};

export default routes;
