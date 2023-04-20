import HomeIcon from "@mui/icons-material/Home";
import LibraryIcon from "@mui/icons-material/LibraryBooks";
import WishlistIcon from "@mui/icons-material/Star";
import routes from "./routes";

export type MenuItem = {
  label: string;
  route: string;
  icon: React.ReactNode;
};

const sideMenuItems: MenuItem[] = [
  {
    label: "Home",
    route: routes.HOME,
    icon: <HomeIcon />,
  },
  {
    label: "Library",
    route: routes.LIBRARY,
    icon: <LibraryIcon />,
  },
  {
    label: "Wishlist",
    route: routes.WISHLIST,
    icon: <WishlistIcon />,
  },
];

export default sideMenuItems;
