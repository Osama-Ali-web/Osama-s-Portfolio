import React from "react";
import { Link } from "react-router-dom";
import { dateFormatter } from "../../helper/DateFormatter";

const DetailBlogHeader = ({
  title,
  authorImage,
  author,
  created_at,
  author_linkdin,
}) => {
  return (
    <>
      <h1 className=" font-secondary text-2xl capitalize sm:text-4xl ">
        {title}
      </h1>
      <div className="my-8 flex gap-4">
        <img
          className="aspect-square w-20 rounded-full border-2 border-gray-400 object-cover"
          src={authorImage}
          alt={`Author ${author}`}
        />
        <div>
          <p className="flex gap-2">
            <span className=" group font-medium capitalize text-gray-800 dark:text-gray-200">
              {author}
            </span>
            <span>&#183;</span>
            <span>
              <Link
                className="font-medium uppercase text-sky-500 duration-300 hover:text-sky-700"
                to={author_linkdin}
              >
                follow
              </Link>
            </span>
          </p>
          <p className="space-x-2">
            10 min read <span>&#183;</span>{" "}
            <span>{dateFormatter(created_at)}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default DetailBlogHeader;
