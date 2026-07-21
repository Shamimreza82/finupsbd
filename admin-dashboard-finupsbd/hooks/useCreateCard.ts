import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCard } from "@/services/modules/modulesService";
import { toast } from "sonner";
import { queryKeys } from "./queryKeys";

export const useCreateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => addCard(formData),
    onSuccess: (result) => {
      if (result?.success) {
        toast.success(result.message || "Card created successfully");
        queryClient.invalidateQueries({ queryKey: queryKeys.modules.all });
      } else {
        toast.error(result?.message || "Failed to create card");
      }
    },
    onError: () => {
      toast.error("Failed to create card. Please try again.");
    },
  });
};
