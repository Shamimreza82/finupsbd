import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MessageSquare, AlertTriangle } from "lucide-react"

interface AdminNotesSectionProps {
  adminNotes: string
}

export function AdminNotesSection({ adminNotes }: AdminNotesSectionProps) {
  return (
    <Card className="mb-6 shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
          <MessageSquare className="h-8 w-8 animate-bounce" />
          Reviewer feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="border-green-200 bg-green-50 dark:border-amber-800 dark:bg-amber-950">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-green-800 dark:text-amber-200 font-medium">{adminNotes}</AlertDescription>
        </Alert>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
          Please review the admin notes above and take any necessary actions.
        </p>
      </CardContent>
    </Card>
  )
}
