import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Sparkles } from "lucide-react"

type ComingSoonProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommingSoon({ open, onOpenChange }: ComingSoonProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] rounded-2xl shadow-xl p-8">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4 text-primary">
            <Sparkles className="h-10 w-10" />
          </div>
          <DialogTitle className="text-2xl font-bold">
            Coming Soon
          </DialogTitle>
          <DialogDescription className="mt-2 text-muted-foreground text-sm">
            We are working hard to bring you this feature. Stay tuned for exciting updates!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 justify-center">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="px-5 py-2 rounded-full"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
