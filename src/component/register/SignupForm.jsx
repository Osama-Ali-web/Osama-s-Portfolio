import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormRow from "../../ui/FormRow";
import { useCreateUser } from "./useCreateUser";

const SignupForm = () => {
  const navigate = useNavigate();
  const { createUser, isCreating } = useCreateUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const onSubmit = ({ name, email, password }) => {
    createUser(
      { name, email, password },
      {
        onSuccess: () => {
          reset();
          navigate("/", { replace: true });
        },
      },
    );
  };
  const onError = (err) => {
    console.log(err);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className=" mx-3 grid w-full grid-cols-1 gap-y-10 rounded-xl px-8 py-4 text-gray-500 shadow-shadowTwo dark:text-white dark:shadow-shadowOne sm:mx-0 sm:w-3/5"
    >
      <h2 className=" mb-3 text-center text-lg font-semibold capitalize text-sky-500 dark:text-sky-300 sm:text-3xl">
        Register your Account
      </h2>

      <FormRow lable="name" error={errors?.name?.message}>
        <input
          type="text"
          placeholder="Enter name"
          className={`h-12 w-full rounded-lg border-gray-700 bg-gray-200 p-4 text-gray-500 shadow-shadowTwo outline-none outline-offset-2 focus-visible:border-b-transparent ${errors?.name?.message ? "focus-visible:outline-designColor" : "focus-visible:outline-sky-500"} dark:border-b-[1px] dark:bg-[#191b1e] dark:text-lightText dark:shadow-none sm:w-3/4`}
          {...register("name", {
            required: "Field is required.",
          })}
          disabled={isCreating}
        />
      </FormRow>
      <FormRow lable="email" error={errors?.email?.message}>
        <input
          type="email"
          placeholder="Enter email"
          autoComplete="email"
          className={`h-12 w-full rounded-lg border-gray-700 bg-gray-200 p-4 text-gray-500 shadow-shadowTwo outline-none outline-offset-2 focus-visible:border-b-transparent ${errors?.email?.message ? "focus-visible:outline-designColor" : "focus-visible:outline-sky-500"} dark:border-b-[1px] dark:bg-[#191b1e] dark:text-lightText dark:shadow-none sm:w-3/4`}
          {...register("email", {
            required: "Field is required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
          disabled={isCreating}
        />
      </FormRow>
      <FormRow lable="password" error={errors?.password?.message}>
        <input
          type="password"
          placeholder="Enter password"
          className={`h-12 w-full rounded-lg border-gray-700 bg-gray-200 p-4 text-gray-500 shadow-shadowTwo outline-none outline-offset-2 focus-visible:border-b-transparent ${errors?.password?.message ? "focus-visible:outline-designColor" : "focus-visible:outline-sky-500"} dark:border-b-[1px] dark:bg-[#191b1e] dark:text-lightText dark:shadow-none sm:w-3/4`}
          {...register("password", {
            required: "Field is required.",
            minLength: {
              value: 6,
              message: "Should be 6 character long!",
            },
          })}
          disabled={isCreating}
        />
      </FormRow>
      <FormRow
        lable="confirm password"
        error={errors?.confirmPassword?.message}
      >
        <input
          type="password"
          placeholder="Enter password"
          className={`h-12 w-full rounded-lg border-gray-700 bg-gray-200 p-4 text-gray-500 shadow-shadowTwo outline-none outline-offset-2 focus-visible:border-b-transparent ${errors?.confirmPassword?.message ? "focus-visible:outline-designColor" : "focus-visible:outline-sky-500"} dark:border-b-[1px] dark:bg-[#191b1e] dark:text-lightText dark:shadow-none sm:w-3/4`}
          {...register("confirmPassword", {
            required: "Field is required.",
            validate: (value) =>
              value === getValues().password || "Password not match!",
          })}
          disabled={isCreating}
        />
      </FormRow>
      <div>
        <button
          disabled={isCreating}
          type="submit"
          className="btn-success btn  hover:scale-95"
        >
          signup
        </button>
        <div className="divider">OR</div>
      </div>
      <p className="text-sm font-medium sm:text-base">
        already have an account?
        <Link className=" link ml-2 capitalize text-sky-500" to="/login">
          login
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
