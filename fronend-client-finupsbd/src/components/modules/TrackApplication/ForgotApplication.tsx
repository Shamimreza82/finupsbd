// app/forgot-application-id/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import * as z from 'zod'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { forgotApplication } from '@/services/public'
import { EmailTrackingDialog } from './TrackingDialogProps'
import { useState } from 'react'
import { toast } from 'sonner'

/** 1) Change schema: require a valid email instead of digits */
const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type FormValues = z.infer<typeof schema>

export default function ForgotApplicationIdPage() {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [forgotApplicationData, setForgotApplicationData] = useState({})


  const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  /** 2) Send { email } instead of { phone } */
  async function onSubmit(data: FormValues) {
    try {
      const res = await forgotApplication({ email: data.email })
      setForgotApplicationData(res)
      // router.push('/track-application/track-application-public')
      setOpen(true)

    } catch (err) {
      console.error('Failed to send reset request:', err)
      toast.error('Failed to send reset request. Please try again later.')
    }
  }

  const resendEmail = async () => {
    // call your API to resend the email…
  };



  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/60 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl hover:shadow-2xl transition-shadow duration-300">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader className="pb-0 px-6 pt-6 text-center">
              <CardTitle className="text-2xl">Forgot Application ID</CardTitle>
              <CardDescription>
                Enter your email address to reset your application ID
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 px-6">
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  {...register('email')}
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p role="alert" className="mt-1 text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 px-6 pb-6">
              <Button type="submit" disabled={isSubmitting} className="flex items-center justify-center">
                {
                  isSubmitting ? <p>Submitting........</p> : "Submit"
                }

              </Button>
              <Link
                href="/"
                className="inline-flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back
              </Link>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
      <EmailTrackingDialog
        submitData={forgotApplicationData}
        onResendEmail={resendEmail}
        setOpen={setOpen}
        open={open} // Pass the open state to control the dialog visibility

      />
    </div>
  )
}
