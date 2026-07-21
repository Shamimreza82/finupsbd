"use client"

import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useModuleStatus } from "@/hooks/useModuleStatus"

interface StatusToggleButtonProps {
  id: string
  isActive: boolean
  onSuccess?: () => void
}

export function ModuleStatusToggleButton({ id, isActive, onSuccess }: StatusToggleButtonProps) {
  const mutation = useModuleStatus()

  const handleToggle = () => {
    mutation.mutate(
      { id, isActive: !isActive },
      { onSuccess: () => onSuccess?.() }
    )
  }

  const loading = mutation.isPending

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={loading}
          className={`transition-all duration-300 px-4 py-2 rounded-xl font-semibold shadow-md ${
            isActive ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
          } text-white`}
        >
          {loading ? "Updating..." : isActive ? "Active" : "Inactive"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isActive ? "Deactivate Module?" : "Activate Module?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to {isActive ? "deactivate" : "activate"} this module?
            This action can be changed later.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleToggle}
            disabled={loading}
            className={isActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
          >
            {loading ? "Processing..." : "Yes, Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
