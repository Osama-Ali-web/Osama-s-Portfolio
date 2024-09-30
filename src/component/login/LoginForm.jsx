import React from "react";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../authentication/useCurrentUser";
import SubPageLoader from "../../ui/SubPageLoader";
import toast from "react-hot-toast";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isPending } = useLogin();
  const { isAuthenticated, isLoading } = useCurrentUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email, password }) => {
    login(
      { email, password },
      {
        onSuccess: ({ user }) => {
          const isAdmin = user.user_metadata.isAdmin;
          if (isAdmin) return navigate("/dashboard", { replace: true });
          else return navigate("/", { replace: true });
        },
      },
    );
  };
  const onError = (err) => {
    console.log(err);
  };

  if (isLoading) return <SubPageLoader />;
  if (isAuthenticated) {
    navigate("/");
    toast.error("Already logged in.");
    return;
  }
  if (!isAuthenticated)
    return (
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit, onError)}
        className="mx-5 mt-3 w-full space-y-10 rounded-xl px-3 py-10 text-gray-500 shadow-shadowTwo dark:text-white dark:shadow-shadowOne sm:mx-0 sm:max-w-2xl sm:space-y-12 sm:px-8
      
      "
      >
        <h2 className="  text-center text-lg font-semibold capitalize text-sky-500 dark:text-sky-300 sm:text-3xl">
          Login to your account
        </h2>

        <FormRow lable="email" error={errors?.email?.message}>
          <input
            type="email"
            placeholder="Enter email"
            className={`h-12 w-full rounded-lg border-gray-700 bg-gray-200 p-4 text-gray-500 shadow-shadowTwo outline-none outline-offset-2 focus-visible:border-b-transparent ${errors?.email?.message ? "focus-visible:outline-designColor" : "focus-visible:outline-sky-500"} dark:border-b-[1px] dark:bg-[#191b1e] dark:text-lightText dark:shadow-none `}
            {...register("email", {
              required: "Field is required.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
            disabled={isPending}
          />
        </FormRow>
        <FormRow lable="password" error={errors?.password?.message}>
          <input
            type="password"
            placeholder="Enter password"
            className={`h-12 w-full rounded-lg border-gray-700 bg-gray-200 p-4 text-gray-500 shadow-shadowTwo outline-none outline-offset-2 focus-visible:border-b-transparent ${errors?.password?.message ? "focus-visible:outline-designColor" : "focus-visible:outline-sky-500"} dark:border-b-[1px] dark:bg-[#191b1e] dark:text-lightText dark:shadow-none`}
            {...register("password", {
              required: "Field is required.",
            })}
            disabled={isPending}
          />
        </FormRow>
        <div>
          <button
            disabled={isPending}
            type="submit"
            className="sm:text-bas btn-info btn-sm btn text-xs transition-all duration-500 sm:btn-md hover:scale-95 hover:bg-opacity-75"
          >
            login
          </button>
          <div className="divider mt-2 p-0 text-xs sm:text-base">OR</div>
        </div>
        <div className=" flex flex-col justify-between gap-4 sm:flex-row sm:gap-0">
          <p className="whitespace-nowrap font-light">
            Do not have an account?
            <Link
              className="link ml-2 capitalize text-sky-500"
              to={"/register"}
            >
              signup
            </Link>
          </p>
          <Link
            className="link ml-2 capitalize text-sky-500"
            to={"/forgot-password"}
          >
            forgot password?
          </Link>
        </div>
      </form>
    );
};

export default LoginForm;
