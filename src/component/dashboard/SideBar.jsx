import React from "react";
import Logo from "../../ui/Logo";
import { Link, useLocation } from "react-router-dom";
import UserSvg from "../../ui/UserSvg";
import BlogBookSvg from "../../ui/BlogBookSvg";
import WebsiteSvg from "../../ui/WebsiteSvg";

const SideBar = () => {
  const location = useLocation();

  return (
    <aside className="flex flex-col px-6 py-3 text-slate-300 ">
      <Logo />
      <ul className="  mt-20 flex flex-col gap-4">
        <Link
          className={` ${location.pathname === "/dashboard" ? "bg-primary" : "bg-[#333A48]"} flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md  px-6 font-medium capitalize transition-all  duration-200 hover:bg-primary `}
          to={"/dashboard"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span>home</span>
        </Link>
        <Link
          className={` ${location.pathname === "/dashboard/manage-blogs" ? "bg-primary" : "bg-[#333A48]"} flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md  px-6 font-medium capitalize transition-all  duration-200 hover:bg-primary `}
          to={"/dashboard/manage-blogs"}
        >
          <BlogBookSvg />
          <span>manage blogs</span>
        </Link>
        <Link
          className={` ${location.pathname === "/dashboard/manage-users" ? "bg-primary" : "bg-[#333A48]"} flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md  px-6 font-medium capitalize transition-all  duration-200 hover:bg-primary `}
          to={"#"}
        >
          <UserSvg />
          <span>manage users</span>
        </Link>
        <Link
          className={` ${location.pathname === "/" ? "bg-primary" : "bg-[#333A48]"} flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-md  px-6 font-medium capitalize transition-all  duration-200 hover:bg-primary `}
          to={"/"}
        >
          <WebsiteSvg />
          <span>visite website</span>
        </Link>
      </ul>
    </aside>
  );
};

export default SideBar;
