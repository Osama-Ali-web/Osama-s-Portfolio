import React from "react";

const AdminInfo = () => {
  return (
    <div className="flex items-center gap-2">
      <p>Admin</p>
      <img
        src="/images.png"
        alt="admin"
        className=" h-10 w-10 rounded-full object-cover"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className=" h-4 w-4 cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        />
      </svg>
    </div>
  );
};

export default AdminInfo;
