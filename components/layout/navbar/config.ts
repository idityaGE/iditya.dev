export interface NavLink {
  to: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  {
    to: "/projects",
    label: "projects",
  },
  {
    to: "/blogs",
    label: "blogs",
  },
  {
    to: "/pow",
    label: "PoW",
  },
];
