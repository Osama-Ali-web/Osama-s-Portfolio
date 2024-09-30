import React, { useState } from "react";
import { useBlogs } from "../blog/useBlogs";
import { dateFormatter } from "../../helper/DateFormatter";
import DashboardLoader from "./DashboardLoader";
import Error from "../../ui/Error";
import DeleteSvg from "../../ui/DeleteSvg";
import EditSvg from "../../ui/EditSvg";
import AddSvg from "../../ui/AddSvg";
import { Link } from "react-router-dom";
import UpdateBlog from "../blog/UpdateBlog";
import CreateBlog from "../blog/CreateBlog";
import Button from "../../ui/Button";
import { useDeleteBlog } from "../blog/useDeleteBlog";

const BlogManagement = () => {
  const { deleteBlog, isDeleting } = useDeleteBlog();
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleMenuToggle = (index) => {
    setIsMenuOpen(isMenuOpen === index ? null : index);
  };

  const handleAddClick = () => {
    setIsMenuOpen(null);
    setShowAddModal(true);
  };
  const closeUpdateModal = () => setShowUpdateModal(false);
  const closeAddModal = () => setShowAddModal(false);

  const handleUpdate = (id) => {
    setIsMenuOpen(null);
    setEditId(id);
    setShowUpdateModal(true);
  };

  const handleDelete = (id) => {
    deleteBlog(id);
    setIsMenuOpen(null);
  };
  const { filterBlogs, isError, isLoading } = useBlogs();

  if (isLoading) return <DashboardLoader />;
  if (isError) return <Error />;
  return (
    <>
      {showAddModal && <CreateBlog onClose={closeAddModal} />}
      <div className="text-sm text-stone-600 dark:text-white">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="  text-3xl font-semibold">All Blogs</h1>

          <div>
            <Button onClick={handleAddClick} svg={<AddSvg />}>
              create blog
            </Button>
          </div>
        </div>
        <div className="scrollBar-hide">
          <table className=" table-xs table sm:table-md md:table-lg ">
            {/* head */}
            <thead className=" text-stone-400">
              <tr className=" border-gray-200 dark:border-gray-600">
                <th>Title</th>
                <th>Author</th>
                <th>Created at</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {filterBlogs?.map((blog, index) => {
                return (
                  <tr
                    key={blog.id}
                    className="border-gray-200 duration-300 odd:bg-gray-200 hover:bg-gray-300 dark:border-gray-600 dark:odd:bg-gray-800 dark:hover:bg-gray-500"
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar ">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={blog?.blogImage}
                              alt="blog"
                              className="border border-gray-400 bg-gray-200"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-bold">
                            {blog?.title?.slice(0, 30)}...
                          </div>
                          <div className="text-sm opacity-50">
                            {blog?.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className=" whitespace-nowrap">{blog.author}</td>
                    <td>{dateFormatter(blog.created_at)}</td>
                    <td>
                      <button
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-300"
                        onClick={() => handleMenuToggle(index)}
                      >
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v.01M12 12v.01M12 18v.01"
                          ></path>
                        </svg>
                      </button>
                      {isMenuOpen === index && (
                        <div className="absolute right-0 w-48 rounded-md border border-gray-200 bg-white text-blue-500 shadow-lg">
                          <ul>
                            <li className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100">
                              <EditSvg />
                              <button onClick={() => handleUpdate(blog.id)}>
                                Update
                              </button>
                            </li>
                            <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                              <button
                                disabled={isDeleting}
                                className="flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
                                onClick={() => handleDelete(blog.id)}
                              >
                                <DeleteSvg />
                                <span>Delete</span>
                              </button>
                            </li>
                            <li className="cursor-pointer px-4 py-2  hover:bg-gray-100">
                              <Link
                                onClick={() => setIsMenuOpen(null)}
                                className="flex items-center gap-2"
                                to={`/blog/${blog.id}`}
                                target={"_blank"}
                              >
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    className=" h-4 w-4"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                  </svg>
                                </span>
                                <span>View</span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {showUpdateModal && (
              <UpdateBlog
                onClose={closeUpdateModal}
                editId={editId}
                // setEditId={setEditId}
              />
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default BlogManagement;
