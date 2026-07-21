/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { loginUser } from "@/services/auth"



// ✅ Zod Schema
const loginSchema = z.object({
  identifier: z
    .string()
    .min(3, "Identifier must be at least 3 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  // ✅ React Hook Form Setup
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "super.admin@gmail.com",
      password: "123456",
    },
  })

  // ✅ Login Mutation
  const mutation = useMutation({
    mutationFn: async (payload: LoginFormValues) => {
      return loginUser(payload)
    },

    onSuccess: (res) => {
      const message = res?.message

      if (message?.includes("Admin Login successfully")) {
        toast.success(message || "Login successful")
        router.push("/dashboard")
      }

      else if (message?.includes("User login successfully")) {
        toast.error(message || "Invalid user!!")
      }

       else {
            toast.error(message || "Invalid user!!")
       }

    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Something went wrong!"
      )
    },
  })



  // ✅ Submit handler
  const onSubmit = async (values: LoginFormValues) => {
    mutation.mutate(values)
  }

  return (
    <div className="flex items-center justify-center px-4 min-h-[calc(100vh-140px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Admin Service
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <CardContent className="space-y-4">

              {/* ✅ Identifier */}
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email or phone</FormLabel>

                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          placeholder="Type your identifier"
                          className="pl-10"
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>

                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={mutation.isPending}
              >
                {mutation.isPending
                  ? "Signing In..."
                  : "Sign In"}
              </Button>

              <div className="text-center text-sm text-gray-600">
                <Link
                  href="https://finupsbd.com"
                  target="_blank"
                  className="text-blue-600 hover:underline font-medium"
                >
                  See Finups Client Site
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
