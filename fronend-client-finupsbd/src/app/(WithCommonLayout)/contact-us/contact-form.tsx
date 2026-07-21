"use client";

import { TextAreaInput, TextInput } from "@/components/form/FormInputs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z
    .string()
    .max(11, {
      message: "Phone number not more than 11 digit.",
    })
    .regex(/^(\+880\s?|0)1[3-9]\d{2}-?\d{6}$/, "Invalid phone number."),
  message: z.string().min(11, {
    message: "Message must be at least 11 characters.",
  }),
  agreeToPrivacy: z.boolean().refine((value) => value === true, {
    message: "You must agree to the privacy policy.",
  }),
});

export const ContactForm = () => {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
      agreeToPrivacy: false,
    },
  });

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    //   toast.success("Message sent successfully!", {
    //     description: "We'll get back to you as soon as possible.",
    //   });
    form.reset();
  }
  return (
    <div className="rounded-lg bg-[#F7FFF5] p-6 shadow-sm">
      <div className="mx-auto max-w-xl py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextInput
                form={form}
                name="firstName"
                label="First Name"
                placeholder="Enter your first name"
                required
              />
              <TextInput
                form={form}
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
                required
              />
            </div>
            <TextInput
              form={form}
              name="email"
              label="Email Address"
              placeholder="Enter your email address"
              type="email"
              required
            />
            <TextInput
              form={form}
              name="phoneNumber"
              label="Phone Number"
              placeholder="Enter your phone number"
              type="tel"
              required
            />
            <TextAreaInput
              form={form}
              name="message"
              label="Message"
              placeholder="Leave us a message..."
              required
            />

            <FormField
              control={form.control}
              name="agreeToPrivacy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="cursor-pointer font-normal text-gray-600">
                      You agree to our friendly{" "}
                      <Link
                        href="/privacy-policy"
                        className="text-primary underline hover:text-green-700"
                      >
                        privacy policy
                      </Link>
                      .
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="pt-8">
              <Button
                type="submit"
                className="h-12 w-full rounded-lg bg-primary py-3 font-medium text-white transition-colors hover:bg-green-700"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
