import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVisitors as updateVisitorsApi } from "../../services/apiVisitorCounter";
import toast from "react-hot-toast";

export function useUpdateVisitor() {
  const queryClient = useQueryClient();
  const { mutate: updateVisitors } = useMutation({
    mutationFn: updateVisitorsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateVisitors };
}
