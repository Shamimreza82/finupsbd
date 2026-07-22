"use client";

import { useState } from "react";
import {
  Building,
  Calendar,
  Check,
  Copy,
  CreditCard,
  Eye,
  EyeOff,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Shield,
  User,
  BadgeCheck,
  Heart,
  Clock,
  MapPinned,
  Smartphone,
  IdCard,
  Cake,
  VenetianMask,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";
import { useUserInfo } from "@/hooks/useUserInfo";
import ProfileSkeleton from "@/components/loading/ProfileSkeleton";

interface ProfileField {
  label: string;
  value: string | null;
  icon: React.ElementType;
  sensitive?: boolean;
  verified?: boolean;
  copyable?: boolean;
}

interface FieldGroup {
  title: string;
  icon: React.ElementType;
  color: string;
  fields: ProfileField[];
}

const fieldColors: Record<string, string> = {
  "Full Name": "text-sky-600",
  "Registered Mobile Number": "text-emerald-600",
  "Email Address": "text-blue-600",
  Gender: "text-purple-600",
  "Date of Birth": "text-rose-600",
  "National ID Number (NID)": "text-amber-600",
  Address: "text-teal-600",
  City: "text-indigo-600",
};

export default function UserProfile() {
  const [hideSensitiveInfo, setHideSensitiveInfo] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { user, isLoading, error } = useUserInfo();

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (isLoading) return <ProfileSkeleton />;

  if (error) {
    return (
      <Card className="mx-auto w-full max-w-2xl border-destructive/30 shadow-lg rounded-2xl">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="p-4 bg-destructive/10 rounded-full mb-4">
            <Shield className="h-10 w-10 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold">Error Loading Profile</h3>
          <p className="mt-1 text-sm text-muted-foreground text-center max-w-xs">{error}</p>
          <Button className="mt-6" onClick={() => window.location.reload()} variant="destructive">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const fieldGroups: FieldGroup[] = [
    {
      title: "Personal Information",
      icon: User,
      color: "from-sky-50 to-blue-50 border-sky-200",
      fields: [
        { label: "Full Name", value: user?.profile?.nameAsNid, icon: IdCard, copyable: true },
        { label: "Gender", value: user?.profile?.gender, icon: VenetianMask, sensitive: true },
        { label: "Date of Birth", value: formatDate(user?.profile?.dateOfBirth, "Full date"), icon: Cake, sensitive: true, copyable: true },
        { label: "National ID Number (NID)", value: user?.profile?.nationalIdNumber, icon: CreditCard, sensitive: true, verified: true, copyable: true },
      ],
    },
    {
      title: "Contact Information",
      icon: Mail,
      color: "from-emerald-50 to-green-50 border-emerald-200",
      fields: [
        { label: "Registered Mobile Number", value: user?.phone, icon: Smartphone, sensitive: true, verified: true, copyable: true },
        { label: "Email Address", value: user?.email, icon: Mail, verified: true, copyable: true },
      ],
    },
    {
      title: "Address",
      icon: MapPinned,
      color: "from-violet-50 to-purple-50 border-violet-200",
      fields: [
        { label: "Address", value: user?.profile?.address, icon: MapPin, sensitive: true, copyable: true },
        { label: "City", value: user?.profile?.city, icon: Building, sensitive: true },
      ],
    },
  ];

  const renderField = (field: ProfileField) => (
    <div
      key={field.label}
      className="group flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-200 hover:bg-muted/40 hover:shadow-sm"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className={`p-1.5 rounded-md bg-background shadow-sm shrink-0 ${fieldColors[field.label] || "text-primary"}`}>
          <field.icon className="h-3.5 w-3.5" />
        </div>
        <span className="text-xs font-medium text-muted-foreground">{field.label}</span>
        {field.verified && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <BadgeCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                Verified
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0 min-w-0 max-w-[55%] sm:max-w-[60%]">
        <span className="text-sm font-semibold truncate">
          {field.sensitive && hideSensitiveInfo
            ? "••••••••••••"
            : field.value || <span className="text-muted-300 italic font-normal">Not provided</span>}
        </span>

        {field.copyable && field.value && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-all duration-200 shrink-0"
                  onClick={() => copyToClipboard(field.value as string, field.label)}
                >
                  {copiedField === field.label ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-muted-foreground hover:text-primary transition-colors" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                {copiedField === field.label ? "Copied!" : "Copy"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );

  const visibleFieldsCount = fieldGroups
    .flatMap((g) => g.fields)
    .filter((f) => !f.sensitive || !hideSensitiveInfo).length;
  const totalFields = fieldGroups.flatMap((g) => g.fields).length;
  const completionPercent = Math.round(
    (fieldGroups
      .flatMap((g) => g.fields)
      .filter((f) => f.value && f.value !== "Not provided").length /
      totalFields) *
      100
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-top-2 duration-700">
      {/* Profile Hero Header */}
      <Card className="overflow-hidden border-0 shadow-lg rounded-2xl">
        <div className="relative">
          <div className="h-32 sm:h-40 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <CardContent className="relative -mt-16 sm:-mt-20 px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <Avatar className="h-28 w-28 sm:h-32 sm:w-32 ring-4 ring-background shadow-xl">
              <AvatarImage
                src={user?.profile?.avatar ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${user.profile.avatar}` : ""}
                alt="Profile"
              />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-2xl sm:text-3xl font-bold text-primary-foreground shadow-inner">
                {user?.name
                  ?.split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2) || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0 pt-2 sm:pt-0 sm:pb-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{user?.name}</h1>
              <p className="text-sm text-muted-foreground mt-0.5">{user?.email}</p>
            </div>

            <div className="flex gap-2 sm:pb-1 justify-center sm:justify-end">
              <Link href="/user/update-profile">
                <Button
                  variant="default"
                  size="sm"
                  className="gap-1.5 shadow-lg shadow-primary/25"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Edit Profile</span>
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="sm"
                className="gap-1.5"
                onClick={() => setHideSensitiveInfo(!hideSensitiveInfo)}
              >
                {hideSensitiveInfo ? (
                  <Eye className="h-3.5 w-3.5" />
                ) : (
                  <EyeOff className="h-3.5 w-3.5" />
                )}
                <span className="hidden sm:inline">{hideSensitiveInfo ? "Show" : "Hide"} Info</span>
              </Button>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div className="flex items-center gap-2.5 p-3 bg-muted/30 rounded-xl border border-border/50">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Heart className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Profile</p>
                <p className="text-sm font-semibold">{completionPercent}% complete</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 bg-muted/30 rounded-xl border border-border/50">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <BadgeCheck className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Verified</p>
                <p className="text-sm font-semibold">Yes</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 bg-muted/30 rounded-xl border border-border/50">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Member Since</p>
                <p className="text-sm font-semibold">
                  {new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 bg-muted/30 rounded-xl border border-border/50">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Shield className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Fields</p>
                <p className="text-sm font-semibold">{visibleFieldsCount} / {totalFields}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Grouped Cards */}
      {fieldGroups.map((group) => (
        <Card
          key={group.title}
          className="border-border/40 shadow-sm rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md"
        >
          <div className={`flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r ${group.color}`}>
            <div className="p-1.5 bg-background/80 rounded-md shadow-sm">
              <group.icon className="h-4 w-4 text-foreground/70" />
            </div>
            <h2 className="text-sm font-semibold">{group.title}</h2>
          </div>
          <Separator />
          <div className="py-1.5">
            {group.fields.map(renderField)}
          </div>
        </Card>
      ))}

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1 py-2">
        <p className="text-xs text-muted-foreground">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
        <Button variant="link" size="sm" className="text-xs h-auto p-0 text-muted-foreground hover:text-primary transition-colors">
          Request Data Update
        </Button>
      </div>
    </div>
  );
}
