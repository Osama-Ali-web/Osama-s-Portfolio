import React from "react";
import { useParams } from "react-router-dom";

import { useSingleBlog } from "./useSingleBlog";
import PageLoader from "../../ui/PageLoader";
import Error from "../../ui/Error";
import Author from "./Author";
import BackCircleBtn from "../../ui/BackCircleBtn";
import DetailBlogImage from "./DetailBlogImage";
import DetailBlogHeader from "./DetailBlogHeader";
import DetailBlogContent from "./DetailBlogContent";

const DetailBlog = () => {
  const { blogId } = useParams();
  const { Blog, isLoading, isError } = useSingleBlog(blogId);

  if (isLoading) return <PageLoader />;
  if (isError) return <Error />;
  const {
    title,
    author,
    authorImage,
    created_at,
    blogImage,
    category,
    content,
    author_linkdin,
    linkdin_followers,
  } = Blog;

  return (
    <div className="bg-gray-200 py-10 font-primary text-gray-600 dark:bg-bodyColor dark:text-gray-200 sm:py-20">
      <BackCircleBtn />
      <div className=" mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-6 sm:py-12">
        <DetailBlogHeader
          title={title}
          authorImage={authorImage}
          author={author}
          created_at={created_at}
          author_linkdin={author_linkdin}
        />
        <DetailBlogImage
          blogImage={blogImage}
          category={category}
          author={author}
        />
        <DetailBlogContent content={content} />
      </div>
      <Author
        authorImage={authorImage}
        author={author}
        author_linkdin={author_linkdin}
        linkdin_followers={linkdin_followers}
      />
    </div>
  );
};

export default DetailBlog;
