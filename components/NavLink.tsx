"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navLinks = [
  {
    name: "Home",
    src: "/",
  },
  {
    name: "News",
    src: "/news",
  },
  {
    name: "Resources",
    src: "/resources",
  },
];

const NavLink = () => {
  const pathname = usePathname();
  return (
    <div>
      <ul className="flex space-x-8 items-center">
        {navLinks.map((item, index) => (
          <li
            key={index}
            className={`${
              pathname === item.src
                ? "text-[#0841ae] px-5 py-2 rounded-md  border"
                : "text-[#98989A]"
            }`}
          >
            <Link href={item.src}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavLink;
