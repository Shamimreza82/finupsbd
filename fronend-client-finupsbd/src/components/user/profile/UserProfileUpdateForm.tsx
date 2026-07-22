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
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { updateUserProfile } from "@/services/UserData";
import { useUserInfo } from "@/hooks/useUserInfo";
import { userProfileSchema } from "./userProfileValidation";
import { useRouter } from "next/navigation";
import ProfileSkeleton from "@/components/loading/ProfileSkeleton";
import { Camera, X, ArrowLeft } from "lucide-react";

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
      if (!response.success) throw new Error(response.message || "Failed to update profile");
      toast.success("Profile updated successfully");
      router.push("/user/profile");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      toast.error(message);
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
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2 -ml-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <Card className="border-muted/30 shadow-sm rounded-xl">
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="h-20 w-20 rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                  {profileImage ? (
                    <Image
                      src={profileImage?.startsWith("data:") ? profileImage : `${process.env.NEXT_PUBLIC_IMAGE_URL}${profileImage}`}
                      alt="Profile"
                      width={120}
                      height={120}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Camera className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                {profileImage && (
                  <button
                    type="button"
                    onClick={() => {
                      setProfileImage(null);
                      setImage(null);
                    }}
                    className="absolute -top-1 -right-1 bg-background border border-border rounded-full p-1 shadow-sm hover:bg-muted transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
              <div>
                <p className="text-sm font-medium">Profile Photo</p>
                <p className="text-xs text-muted-foreground">PNG or JPEG (max 5MB)</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
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
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring cursor-pointer transition-colors"
              >
                <Camera className="h-4 w-4" />
                Change Photo
              </label>
              <Link href="/user/setting/update-email-mobile">
                <Button variant="outline" size="sm">
                  Update Email / Phone
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField name="nameAsNid" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter full name as per NID" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="nationalIdNumber" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>NID Number <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your NID number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="gender" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender <span className="text-destructive">*</span></FormLabel>
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
                    <FormLabel>Date of Birth <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                        onChange={(e) => field.onChange(new Date(e.target.value))}
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
                    <Textarea {...field} placeholder="Enter your address" className="min-h-[100px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="city" control={form.control} render={({ field }) => (
                <FormItem className="max-w-xs">
                  <FormLabel>City <span className="text-destructive">*</span></FormLabel>
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

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
