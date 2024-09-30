import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useCurrentUser() {
  const { data: user, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
