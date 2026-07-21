"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  Phone,
  MapPin,
  User,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  MoreHorizontal,
  Award as IdCard,
  Calendar,
  Activity,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface UserData {
  id: string
  userId: string
  name: string
  email: string
  phone: string
  password: string
  pin: string
  pinExpiry: string
  verificationToken: string | null
  resetPasswordToken: string | null
  resetPasswordExpiry: string | null
  role: string
  emailVerified: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
  lastLogin: string
  profile: {
    id: string
    nameAsNid: string
    nationalIdNumber: string
    gender: string
    dateOfBirth: string
    avatar: string
    address: string
    city: string
    userId: string
  }
}

interface UserDetailsPageProps {
  userData: UserData
}

export function UserDetailsView({ userData }: UserDetailsPageProps) {

  const formatDate = (dateString: string) => {
    return new Date(dateString)?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      ?.map((n) => n[0])
      ?.join("")
      ?.toUpperCase()
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "USER":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "SUPER_ADMIN":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="container mx-auto p-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-balance">User Details</h1>
          <p className="text-muted-foreground mt-1">Manage user information and settings</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* User Overview Card */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${userData?.profile?.avatar}`} alt={userData?.name} />
              <AvatarFallback className="text-lg">{getInitials(userData?.name)}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-semibold">{userData?.name}</h2>
                <Badge className={getRoleColor(userData?.role)}>{userData?.role}</Badge>
                {userData?.isActive ? (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-red-600 border-red-600">
                    <XCircle className="mr-1 h-3 w-3" />
                    Inactive
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{userData?.email}</span>
                  {userData?.emailVerified && <CheckCircle className="h-3 w-3 text-green-600" />}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{userData?.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {userData?.profile?.address}, {userData?.profile?.city}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Last login: {formatDate(userData?.lastLogin)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p className="font-medium">{userData?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">User ID</label>
                    <p className="font-mono text-sm">{userData?.userId}</p>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Gender</label>
                    <p className="font-medium">{userData?.profile?.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                    <p className="font-medium">{formatDate(userData?.profile?.dateOfBirth)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IdCard className="h-5 w-5" />
                  Identity Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name as per NID</label>
                  <p className="font-medium">{userData?.profile?.nameAsNid}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">National ID Number</label>
                  <p className="font-mono text-sm">{userData?.profile?.nationalIdNumber}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Address</label>
                  <p className="font-medium">{userData?.profile?.address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">City</label>
                  <p className="font-medium">{userData?.profile?.city}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Account Status</span>
                  {userData?.isActive ? (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-red-600 border-red-600">
                      <XCircle className="mr-1 h-3 w-3" />
                      Inactive
                    </Badge>
                  )}
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Email Verification</span>
                  {userData?.emailVerified ? (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-orange-600 border-orange-600">
                      <Clock className="mr-1 h-3 w-3" />
                      Pending
                    </Badge>
                  )}
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Role</label>
                  <p className="font-medium">{userData?.role}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Account Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Account Created</label>
                  <p className="font-medium">{formatDate(userData?.createdAt)}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                  <p className="font-medium">{formatDate(userData?.updatedAt)}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Login</label>
                  <p className="font-medium">{formatDate(userData?.lastLogin)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Password Hash</label>
                  <p className="font-mono text-xs text-muted-foreground break-all">
                    {userData?.password?.substring(0, 20)}?.?.?.
                  </p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">PIN</label>
                    <p className="font-mono">{userData?.pin}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">PIN Expiry</label>
                    <p className="text-sm">{formatDate(userData?.pinExpiry)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Token Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Verification Token</label>
                  <p className="text-sm">{userData?.verificationToken || "None"}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Reset Password Token</label>
                  <p className="text-sm">{userData?.resetPasswordToken || "None"}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Reset Password Expiry</label>
                  <p className="text-sm">
                    {userData?.resetPasswordExpiry ? formatDate(userData?.resetPasswordExpiry) : "None"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>User activity and system interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Last Login</p>
                    <p className="text-sm text-muted-foreground">{formatDate(userData?.lastLogin)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Profile Updated</p>
                    <p className="text-sm text-muted-foreground">{formatDate(userData?.updatedAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Account Created</p>
                    <p className="text-sm text-muted-foreground">{formatDate(userData?.createdAt)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
