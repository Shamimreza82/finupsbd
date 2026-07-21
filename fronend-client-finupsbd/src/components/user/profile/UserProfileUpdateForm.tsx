"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateUserProfile } from "@/services/UserData";
import { useUserInfo } from "@/hooks/useUserInfo";
import { userProfileSchema } from "./userProfileValidation";
import { useRouter } from "next/navigation";
import ProfileSkeleton from "@/components/loading/ProfileSkeleton";

type UserProfileFormValues = z.infer<typeof userProfileSchema>;

export default function UserProfileUpdateForm() {
  const { user, isLoading: profileLoading } = useUserInfo();
  const [profileImage, setProfileImage] = useState<string | null>(user?.profile?.avatar || null);
  const [image, setImage] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      nameAsNid: "",
      nationalIdNumber: "",
      gender: undefined,
      dateOfBirth: undefined,
      address: "",
      city: undefined,
    },
  });

  useEffect(() => {
    if (user?.profile) {
      form.reset({
        nameAsNid: user.profile.nameAsNid || "",
        nationalIdNumber: user.profile.nationalIdNumber || "",
        gender: user.profile.gender || undefined,
        dateOfBirth: user.profile.dateOfBirth ? new Date(user.profile.dateOfBirth) : undefined,
        address: user.profile.address || "",
        city: user.profile.city || undefined,
      });
      setProfileImage(user.profile.avatar || null);
    }
  }, [user?.profile, form]);

  useEffect(() => {
    const errorKeys = Object.keys(form.formState.errors);
    if (errorKeys.length > 0) {
      const firstErrorField = document.querySelector(`[name="${errorKeys[0]}"]`);
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [form.formState.errors]);

  async function onSubmit(data: UserProfileFormValues) {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (image && image.length > 0) {
        formData.append("file", image[0]);
      }
      const response = await updateUserProfile(formData);
      if (!response.success) throw new Error("Failed to update profile");
      toast.success("Profile updated successfully");
      router.push("/user/profile");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) setProfileImage(event.target.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  if (profileLoading) {
    return <ProfileSkeleton />;
  }


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 border border-gray-300 relative">
            {profileImage ? (
              <Image
                src={ profileImage?.startsWith("data:") ? profileImage : `${process.env.NEXT_PUBLIC_IMAGE_URL}${profileImage}`
                }
                alt="Profile"
                width={120}
                height={120}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image src="/placeholder.svg" alt="Profile" width={120} height={120} className="w-full h-full object-cover" />
            )}
            {profileImage && (
              <button
                type="button"
                onClick={() => {
                  setProfileImage(null);
                  setImage(null);
                }}
                className="absolute top-0 right-0 bg-white rounded-full p-1 text-xs"
              >
                ✖
              </button>
            )}
          </div>
          <div className="mt-4">
            <input
              id="profile-upload"
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleImageChange}
              aria-label="Upload profile image"
            />
            <label
              htmlFor="profile-upload"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer transition"
            >
              📸 Change Profile Photo
            </label>
          </div>
        </div>

        <div className="w-full md:w-auto">
          <Link href="/user/setting/update-email-mobile">
            <Button variant="outline" className="w-full md:w-auto">
              Update Email / Phone Number
            </Button>
          </Link>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField name="nameAsNid" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter full name as per NID" className="rounded-lg shadow-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField name="nationalIdNumber" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>NID Number <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your NID number" className="rounded-lg shadow-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField name="gender" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Gender <span className="text-red-500">*</span></FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <FormField name="dateOfBirth" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                    className="rounded-lg shadow-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <FormField name="address" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter your address" className="rounded-lg min-h-[100px] shadow-sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="city" control={form.control} render={({ field }) => (
            <FormItem className="max-w-xs">
              <FormLabel>City <span className="text-red-500">*</span></FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="dhaka">Dhaka</SelectItem>
                  <SelectItem value="gazipur">Gazipur</SelectItem>
                  <SelectItem value="chittagong">Chittagong</SelectItem>
                  <SelectItem value="khulna">Khulna</SelectItem>
                  <SelectItem value="rajshahi">Rajshahi</SelectItem>
                  <SelectItem value="sylhet">Sylhet</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
