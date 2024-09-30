import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import FormRow from "../../ui/FormRow";
import { Controller, useForm } from "react-hook-form";
import { useCreateBlog } from "./useCreateBlog";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { toolbarOptions } from "./ToolBarOptions";
import Modal from "../../ui/Modal";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
// import { useSingleBlog } from "./useSingleBlog";

const module = {
  toolbar: toolbarOptions,
};
const CreateBlog = ({ onClose }) => {
  const navigate = useNavigate();
  const { addBlog, isPending } = useCreateBlog();
  const { user: { user_metadata: { name: authorName, avatar } = {} } = {} } =
    useCurrentUser();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const image = data.blogImage[0];
    addBlog(
      {
        ...data,
        blogImage: image,
        author: authorName,
        authorImage: avatar,
      },
      {
        onSuccess: () => {
          reset();
          navigate("/dashboard/manage-blogs");
        },
      },
    );
  };

  return createPortal(
    <Modal isLoading={isPending} onClose={onClose} size={"large"}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" mx-auto mt-6 max-w-[80%] items-start space-y-14 font-primary text-white sm:grid sm:grid-cols-2 sm:gap-x-7 sm:gap-y-12 sm:space-y-0"
      >
        <h2 className=" col-span-2 text-center text-xl font-bold capitalize text-stone-100">
          "Create Blog post"
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
            {...register("blogImage", {
              required: "Field is required.",
              validate: (value) => {
                const isBigImage = value[0].size / 1000;
                return isBigImage < 1000 || "Image must be less than 1 MB";
              },
            })}
          />
        </FormRow>

        <div className=" mt-6">
          <button
            disabled={isPending}
            className="btn flex min-w-[8rem] items-center justify-center border-none bg-gradient-to-tr from-sky-600 to-cyan-400 font-semibold uppercase text-bodyColor hover:from-cyan-400 hover:to-sky-600 active:scale-95 disabled:bg-sky-500 disabled:text-bodyColor disabled:opacity-50"
            type="submit"
          >
            submit
          </button>
        </div>
      </form>
    </Modal>,
    document.body,
  );
};

export default CreateBlog;
