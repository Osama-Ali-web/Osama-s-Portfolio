import React from "react";

const DetailBlogContent = ({ content }) => {
  return (
    <div
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default DetailBlogContent;
