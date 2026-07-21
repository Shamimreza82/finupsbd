/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, FileText, Calendar, Users, Building, Eye, Download } from "lucide-react"
import Image from "next/image"
import { GuarantorDocument, TGuarantorInfo } from "@/types/applicationTypes/guarantorInfoTypes"
import { downloadFile } from "@/lib/utils"

export default function GuarantorInfo({ data, type }: { data: TGuarantorInfo; type: 'personal' | 'business' }) {
  const [selectedImage, setSelectedImage] = useState<{
    url: string
    name: string
    id: string
  } | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleImageView = (doc: GuarantorDocument) => {
    setSelectedImage({
      url: doc.url,
      name: doc.originalName,
      id: doc.id,
    })
  }

  const sectionTitle = type === 'personal' ? 'Personal Information' : 'Business Information'

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {sectionTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                <p className="font-medium">{data.fullName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nationality</p>
                <Badge variant="secondary">{data.nationality}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(data.dateOfBirth)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">National ID</p>
                <p className="font-mono">{data.nationalIdNumber}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Father/Husband Name</p>
                <p>{data.fatherOrHusbandName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mother Name</p>
                <p>{data.motherName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Relation with Applicant</p>
                <Badge variant="outline" className="flex items-center gap-1 w-fit">
                  <Users className="h-3 w-3" />
                  {data.relationWithApplicant}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email Address</p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {data.emailAddress}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Mobile Number</p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {data.mobileNumber}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Present Address</p>
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                {data.presentAddress}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Permanent Address</p>
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                {data.permanentAddress}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Work Address</p>
              <p className="flex items-start gap-2">
                <Building className="h-4 w-4 mt-0.5" />
                {data.workAddress}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documents ({data.document.length})
          </CardTitle>
          <CardDescription>Uploaded documents and supporting materials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.document.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-4 space-y-3">
                <div className="aspect-video bg-muted rounded-md overflow-hidden relative group">
                  <Image
                    height={300}
                    width={300}
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${doc.url}`}
                    alt={doc.originalName}
                    className="w-full h-full object-cover cursor-pointer transition-transform hover:scale-105"
                    onClick={() => handleImageView(doc)}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary" onClick={() => handleImageView(doc)} className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => downloadFile(`${process.env.NEXT_PUBLIC_IMAGE_URL}${doc.url}`, doc.originalName)}
                      className="h-8 w-8 p-0"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedImage?.name}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => selectedImage && downloadFile(`${process.env.NEXT_PUBLIC_IMAGE_URL}${selectedImage.url}`, selectedImage.name)}
                className="ml-4"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-4">
            {selectedImage && (
              <div className="relative">
                <Image
                  height={300}
                  width={300}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${selectedImage.url}`}
                  alt={selectedImage.name}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
