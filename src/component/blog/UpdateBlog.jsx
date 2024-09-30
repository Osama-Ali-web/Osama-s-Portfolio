import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Controller, useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { toolbarOptions } from "./ToolBarOptions";
import { useSingleBlog } from "./useSingleBlog";
import Modal from "../../ui/Modal";
import { useUpdateBlog } from "./useUpdateBlog";
import Button from "../../ui/Button";

const module = {
  toolbar: toolbarOptions,
};
const UpdateBlog = ({ onClose, editId }) => {
  const { Blog, isLoading } = useSingleBlog(editId);
  const { updateBlog, isUpdating } = useUpdateBlog();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: Blog,
  });

  function onSubmit(data) {
    const image =
      typeof data.blogImage === "string" ? data.blogImage : data?.blogImage[0];

    updateBlog(
      { newBlog: { ...data, blogImage: image }, id: editId },
      {
        onSuccess: onClose,
      },
    );
  }
  useEffect(() => {
    if (!isLoading && Blog) {
      reset(Blog);
    }
  }, [isLoading, Blog, reset, editId]);
  return (
    <Modal size="large" onClose={onClose}>
      {isLoading ? (
        <div className=" flex min-h-screen flex-col items-center gap-2">
          <h2 className=" text-3xl font-semibold capitalize">
            Loading{" "}
            <span className=" animate-pulse text-7xl font-bold">...</span>
          </h2>
          <p className=" text-stone-300">
            Keep patient your blog is loading.👍
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" mx-auto mt-6 max-w-[80%] items-start space-y-14 font-primary text-white sm:grid sm:grid-cols-2 sm:gap-x-7 sm:gap-y-12 sm:space-y-0"
        >
          <h2 className=" col-span-2 text-center text-xl font-bold capitalize text-stone-100">
            update Blog post
          </h2>
          <FormRow lable={"Blog title"} error={errors?.title?.message}>
            <input
              type="text"
              placeholder="Enter Blog title"
              className={`h-12 w-full rounded-lg border-transparent bg-transparent p-4 shadow-xl outline-none  placeholder:text-[16px] placeholder:text-stone-400 ${errors?.title?.message ? " border-2 focus-visible:border-designColor" : " border-none shadow-xl"} `}
              {...register("title", {
                required: "Field is required.",
              })}
            />
          </FormRow>

          <FormRow lable={"Blog Category"} error={errors?.category?.message}>
            <input
              type="text"
              placeholder="eg programming..."
              className={`h-12 w-full rounded-lg border-transparent bg-transparent p-4 shadow-xl outline-none  placeholder:text-[16px] placeholder:text-stone-400 ${errors?.category?.message ? " border-2 focus-visible:border-designColor" : " border-none shadow-xl"} `}
              {...register("category", {
                required: "Field is required.",
              })}
            />
          </FormRow>

          <FormRow
            lable={"Linkdin Profile"}
            error={errors?.author_linkdin?.message}
          >
            <input
              type="text"
              placeholder="https://www.linkedin.com/etc..."
              className={`h-12 w-full rounded-lg border-transparent bg-transparent p-4 shadow-xl outline-none  placeholder:text-[16px] placeholder:text-stone-400 ${errors?.author_linkdin?.message ? " border-2 focus-visible:border-designColor" : " border-none shadow-xl"} `}
              {...register("author_linkdin", {
                required: "Field is required.",
              })}
            />
          </FormRow>

          <FormRow
            lable={"Linkdin Followers"}
            error={errors?.linkdin_followers?.message}
          >
            <input
              type="number"
              placeholder="1000..."
              className={`h-12 w-full rounded-lg border-transparent bg-transparent p-4 shadow-xl outline-none  placeholder:text-[16px] placeholder:text-stone-400 ${errors?.linkdin_followers?.message ? " border-2 focus-visible:border-designColor" : " border-none shadow-xl"} `}
              {...register("linkdin_followers", {
                required: "Field is required.",
              })}
            />
          </FormRow>

          <FormRow
            lable={"Blog Content"}
            extend={true}
            error={errors?.content?.message}
          >
            <Controller
              name="content" // Set the name for React Hook Form
              control={control}
              defaultValue=""
              render={({ field }) => (
                <ReactQuill
                  className={` w-full rounded-lg border-transparent bg-transparent p-4 shadow-xl outline-none  placeholder:text-[16px] placeholder:text-stone-400 ${errors?.content?.message ? " border-2 focus-visible:border-designColor" : " border-none shadow-xl"} `}
                  modules={module}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </FormRow>

          <FormRow
            extend={true}
            lable={"Blog image"}
            error={errors?.blogImage?.message}
          >
            <input
              type="file"
              className={` w-full rounded-lg border-transparent bg-transparent p-4 shadow-xl outline-none  placeholder:text-[16px] placeholder:text-stone-400 ${errors?.blogImage?.message ? " border-2 focus-visible:border-designColor" : " border-none shadow-xl"} `}
              {...register("blogImage")}
            />
          </FormRow>

          <div className=" mt-6">
            <Button
              disable={isUpdating}
              className="btn flex min-w-[8rem] items-center justify-center border-none bg-gradient-to-tr from-sky-600 to-cyan-400 font-semibold uppercase text-bodyColor hover:from-cyan-400 hover:to-sky-600 active:scale-95 disabled:bg-sky-500 disabled:text-bodyColor disabled:opacity-50"
              type="submit"
            >
              update
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default UpdateBlog;
