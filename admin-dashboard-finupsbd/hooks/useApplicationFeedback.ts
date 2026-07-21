import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationFeedback } from "@/services/applicationService";
import { toast } from "sonner";
import { TLoanStatusType } from "@/types/sharedTypes";
import { queryKeys } from "./queryKeys";

export const useApplicationFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        status: TLoanStatusType;
        adminNote: string;
        additionalDocuments: boolean;
      };
    }) => applicationFeedback(id, payload),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Application Status updated successfully");
        queryClient.invalidateQueries({ queryKey: queryKeys.applications.all });
      } else {
        toast.error(result.message || "Failed to update application");
      }
    },
    onError: () => {
      toast.error("Failed to update application");
    },
  });
};
