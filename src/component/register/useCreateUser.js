import { useMutation } from "@tanstack/react-query";
import { createUser as createUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useCreateUser() {
  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationFn: ({ name, email, password, avatar }) =>
      createUserApi({ name, email, password, avatar }),
    onSuccess: (user) => {
      toast.success(
        `A verification mail has been sent to your ${user.email}. Please verify your mail to login.`
      );
    },
    onError: (err) => toast.error(err.message),
  });
  return { createUser, isCreating };
}
