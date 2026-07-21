import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLoan } from "@/services/modules/modulesService";
import { toast } from "sonner";
import { queryKeys } from "./queryKeys";

export const useCreateLoan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => addLoan(formData),
    onSuccess: (result) => {
      if (result?.success) {
        toast.success(result.message || "Loan created successfully");
        queryClient.invalidateQueries({ queryKey: queryKeys.modules.all });
      } else {
        toast.error(result?.message || "Failed to create loan");
      }
    },
    onError: () => {
      toast.error("Failed to create loan. Please try again.");
    },
  });
};
