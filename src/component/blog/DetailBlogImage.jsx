import React from "react";

const DetailBlogImage = ({ blogImage, category, author }) => {
  return (
    <figure className="flex flex-col items-center overflow-hidden text-center">
      <img
        className="w-full rounded-md object-cover px-3 sm:h-[700px]"
        src={blogImage}
        alt="Blog post"
      />
      <figcaption className=" mt-2 flex flex-wrap gap-3">
        <span className="flex gap-1 font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="h-6 w-6 text-sky-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6h.008v.008H6V6Z"
            />
          </svg>
          Category: {category}
        </span>
        <span className=" font-normal capitalize sm:font-medium">
          Author: {author}
        </span>
      </figcaption>
    </figure>
  );
};

export default DetailBlogImage;
