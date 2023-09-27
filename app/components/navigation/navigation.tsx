import { Link } from "@remix-run/react";

const links = [
  {
    name: "New User",
    href: "/new",
  },
  {
    name: "Messages",
    href: "/messages",
  },
  {
    name: "Users",
    href: "/users",
  },
];

export function Navbar() {
  return (
    <nav className="w-full h-20 flex flex-row justify-start gap-12 bg-red-500">
      {links.map((link) => (
        <Link to={link.href} key={link.href}>
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
