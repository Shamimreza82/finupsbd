import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "./queryKeys";

export const useModuleStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      isActive,
    }: {
      id: string;
      isActive: boolean;
    }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/super-admin/dashboard/modules-status/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive }),
        }
      );
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Module status updated");
      queryClient.invalidateQueries({ queryKey: queryKeys.modules.all });
    },
    onError: () => {
      toast.error("Failed to update module status");
    },
  });
};
