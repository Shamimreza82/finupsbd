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
import { Separator } from "@/components/ui/separator";
import { updateUserProfile } from "@/services/UserData";
import { useUserInfo } from "@/hooks/useUserInfo";
import { userProfileSchema } from "./userProfileValidation";
import { useRouter } from "next/navigation";
import ProfileSkeleton from "@/components/loading/ProfileSkeleton";
import { Camera, X, ArrowLeft, User, ShieldCheck, MapPinned, Upload } from "lucide-react";

type UserProfileFormValues = z.infer<typeof userProfileSchema>;

export default function UserProfileUpdateForm() {
  const { user, isLoading: profileLoading } = useUserInfo();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [image, setImage] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const input = document.getElementById("profile-upload") as HTMLInputElement;
      if (input) {
        const dt = new DataTransfer();
        dt.items.add(files[0]);
        input.files = dt.files;
        handleImageChange({ target: { files: dt.files } } as any);
      }
    }
  };

  if (profileLoading) return <ProfileSkeleton />;

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      {/* Back */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="gap-2 -ml-2 mb-4 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Profile
      </Button>

      <Card className="border-border/40 shadow-lg rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/15 rounded-lg backdrop-blur-sm">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Edit Profile</h1>
              <p className="text-sm text-white/80">Update your personal information</p>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Photo Upload */}
          <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-border/40">
            <div
              className={`relative shrink-0 transition-all duration-200 ${
                isDragging ? "scale-105" : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div
                className={`h-24 w-24 rounded-full overflow-hidden ring-2 ring-offset-2 ring-offset-background transition-all duration-300 ${
                  isDragging
                    ? "ring-primary scale-105 shadow-lg shadow-primary/25"
                    : "ring-primary/20"
                }`}
              >
                {profileImage ? (
                  <Image
                    src={
                      profileImage?.startsWith("data:")
                        ? profileImage
                        : `${process.env.NEXT_PUBLIC_IMAGE_URL}${profileImage}`
                    }
                    alt="Profile"
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted/70 flex items-center justify-center">
                    <Camera className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                )}
              </div>

              <label
                htmlFor="profile-upload"
                className={`absolute -bottom-1 -right-1 p-2 rounded-full shadow-lg border-2 border-background cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? "bg-primary scale-110"
                    : "bg-primary hover:bg-primary/90 hover:scale-105"
                }`}
              >
                <Camera className="h-3.5 w-3.5 text-primary-foreground" />
              </label>

              {profileImage && (
                <button
                  type="button"
                  onClick={() => {
                    setProfileImage(null);
                    setImage(null);
                  }}
                  className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-1 shadow-md hover:bg-destructive/90 transition-all duration-200 hover:scale-110"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm font-semibold">Profile Photo</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                PNG or JPEG. Max 5MB. Drag & drop or click the camera icon.
              </p>
              <input
                id="profile-upload"
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleImageChange}
                aria-label="Upload profile image"
              />
              <div className="flex gap-2 mt-3 justify-center sm:justify-start">
                <label
                  htmlFor="profile-upload"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg shadow-sm hover:bg-primary/90 cursor-pointer transition-all duration-200 hover:shadow-md"
                >
                  <Upload className="h-3.5 w-3.5" />
                  Upload
                </label>
                <Link href="/user/setting/update-email-mobile">
                  <Button variant="outline" size="sm" className="text-xs">
                    Update Email / Phone
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
              {/* Personal Info Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-sky-100 dark:bg-sky-900/30 rounded-md">
                    <User className="h-4 w-4 text-sky-600" />
                  </div>
                  <h2 className="text-sm font-semibold">Personal Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    name="nameAsNid"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Full Name <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter full name as per NID" className="h-10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="nationalIdNumber"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          NID Number <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter your NID number" className="h-10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="gender"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Gender <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-10">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="MALE">Male</SelectItem>
                            <SelectItem value="FEMALE">Female</SelectItem>
                            <SelectItem value="OTHER">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="dateOfBirth"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Date of Birth <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                            onChange={(e) => field.onChange(new Date(e.target.value))}
                            className="h-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Address Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-violet-100 dark:bg-violet-900/30 rounded-md">
                    <MapPinned className="h-4 w-4 text-violet-600" />
                  </div>
                  <h2 className="text-sm font-semibold">Address</h2>
                </div>

                <div className="space-y-5">
                  <FormField
                    name="address"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Enter your full address"
                            className="min-h-[100px] resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="city"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="max-w-xs">
                        <FormLabel>
                          City <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-10">
                              <SelectValue placeholder="Select your city" />
                            </SelectTrigger>
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
                    )}
                  />
                </div>
              </div>

              {/* Verify Note */}
              <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 rounded-xl">
                <div className="p-1.5 bg-amber-100 dark:bg-amber-900/40 rounded-lg shrink-0">
                  <ShieldCheck className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-amber-800 dark:text-amber-300">
                    Information Accuracy
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                    Make sure your name and NID match your official documents. This information
                    will be used for verification purposes.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="h-10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-10 gap-2 shadow-lg shadow-primary/25"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
