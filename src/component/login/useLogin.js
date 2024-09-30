import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onError: (err) => {
      console.log(err);
      if (
        err.message
          .toString()
          .startsWith("Cannot read properties of undefined ")
      ) {
        return toast.error("Something went wrong. Please try again later!");
      } else {
        toast.error(err.message);
        console.log("error", err);
      }
    },
  });

  return { login, isPending };
}
