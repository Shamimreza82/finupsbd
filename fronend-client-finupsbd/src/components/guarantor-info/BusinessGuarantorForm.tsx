"use client"

import React, { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Camera, Loader2, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Image from "next/image"
import { toast } from "sonner"
import { GuarantorFormData, guarantorSchema } from "./schema"
import { useRouter } from "next/navigation"



const nationalities = [
    "Bangladeshi",
]


const relations = [
    "Father",
    "Mother",
    "Spouse",
    "Brother",
    "Sister",
    "Son",
    "Daughter",
    "Friend",
    "Colleague",
    "Business Partner",
    "Other",
]

export default function BusinessGuarantorForm({ applicationId, id }: { applicationId: string, id: string }) {



    const [photoPreview, setPhotoPreview] = useState<string | null>(null)
    const [nidFrontPreview, setNidFrontPreview] = useState<string | null>(null)
    const [nidBackPreview, setNidBackPreview] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    // Each supporting document is kept as { file, preview }
    const [supportingDocs, setSupportingDocs] = useState<{ file: File; preview: string }[]>([])

    const photoInputRef = useRef<HTMLInputElement>(null)
    const cameraInputRef = useRef<HTMLInputElement>(null)

    // NID Front refs (for "take photo" vs. "upload")
    const nidFrontCaptureRef = useRef<HTMLInputElement>(null)
    const nidFrontUploadRef = useRef<HTMLInputElement>(null)

    // NID Back refs (for "take photo" vs. "upload")
    const nidBackCaptureRef = useRef<HTMLInputElement>(null)
    const nidBackUploadRef = useRef<HTMLInputElement>(null)

    const supportingDocInputRef = useRef<HTMLInputElement>(null)

    const [allFiles, setAllFiles] = useState<File[]>([])

    const form = useForm<GuarantorFormData>({
        resolver: zodResolver(guarantorSchema),
        // defaultValues: {
        //     fullName: "Shamim Reza",
        //     fatherOrHusbandName: "Shadsfdsfdsf",
        //     motherName: "sdfdsfdsfdsf",
        //     nationality: "Bangladeshi",
        //     nationalIdNumber: "46632541414",
        //     mobileNumber: "+8801910479167",
        //     emailAddress: "shamimrezaone@gmail.com",
        //     relationWithApplicant: "Brother",
        //     presentAddress: "sfdsfsdfsdf",
        //     permanentAddress: "dsfsdfsdfsdf",
        //     workAddress: "dsfdsfsdfsdf",
        // },
    })

    // Helper for single-file fields
    const handleSingleFileUpload = (file: File, setPreview: (preview: string | null) => void, fieldName: keyof GuarantorFormData) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const result = e.target?.result as string
            setPreview(result)
            form.setValue(fieldName, file as any)
        }
        reader.readAsDataURL(file)
    }

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            handleSingleFileUpload(file, setPhotoPreview, "photo")
        }
    }

    // NID Front handlers
    const handleNidFrontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            handleSingleFileUpload(file, setNidFrontPreview, "nidFront")
        }

    }

    // NID Back handlers
    const handleNidBackUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            handleSingleFileUpload(file, setNidBackPreview, "nidBack")
        }
    }

    // For multiple supporting documents:
    const handleSupportingDocsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (!files) return
        const newDocs: { file: File; preview: string }[] = []
        Array.from(files).forEach((file) => {
            const reader = new FileReader()
            reader.onload = (ev) => {
                const result = ev.target?.result as string
                newDocs.push({ file, preview: result })
                // Once all have a preview, merge into state
                if (newDocs.length === files.length) {
                    setSupportingDocs((prev) => {
                        const updated = [...prev, ...newDocs]
                        // Update RHF value to array of File objects
                        form.setValue(
                            "supportingDocument",
                            updated.map((d) => d.file) as any
                        )
                        return updated
                    })
                }
            }
            reader.readAsDataURL(file)

        })
    }

    const removeSingleFile = (
        setPreview: (preview: string | null) => void,
        fieldName: keyof GuarantorFormData
    ) => {
        setPreview(null)
        form.setValue(fieldName, undefined)
    }

    // Remove one supporting document by index
    const removeSupportingDocAt = (index: number) => {
        setSupportingDocs((prev) => {
            const updated = prev.filter((_, i) => i !== index)
            form.setValue(
                "supportingDocument",
                updated.map((d) => d.file) as any
            )
            return updated
        })
    }





    const onSubmit = async (data: GuarantorFormData) => {
        const { photo, nidBack, nidFront, supportingDocument, ...textData } = data

        setIsLoading(true)
        const formData = new FormData()
        formData.append("data", JSON.stringify(textData))
        const files = []

        files.push(photo)
        files.push(nidBack)
        files.push(nidFront)

        supportingDocument?.forEach(d => files.push(d))





        if (Array.isArray(files)) {
            files.forEach((file: File) => {
                formData.append("files", file)
            })
        }

       if (applicationId) {
            formData.append("applicationId", applicationId)
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/application/applicant-guarator-info-business?id=${id}`, {
                method: "POST",
                body: formData
            })
            const result = await res.json()
            if (result.success) {
                toast.success(result.message || "guarantor form update successfully")
                setIsLoading(false)
                router.push("/")
            } else {
                if (result?.error?.code === "P2002") {
                    setIsLoading(false)
                    return toast.error("You have already fill up this from")
                }
                toast.error(result.message || "Server error please try again!")
                setIsLoading(false)
            }
            if (!result.success) {
                toast.error(result.message || "Server error please try again!")
                setIsLoading(false)
            }


        } catch (error) {
            toast.error("Server error please try again!")
            setIsLoading(false)
        }

    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-600">Business Guarantor</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Row 1: Full Name & Father's/Husband's Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Full Name (as per National ID) <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter full name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fatherOrHusbandName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Father's/Husband's Name <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter father's/husband's name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Row 2: Mother's Name & Date of Birth */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="motherName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Mother's Name <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter mother's name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dateOfBirth"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Date of Birth <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                                onChange={(e) => {
                                                    const selectedDate = e.target.value; // "2025-06-14"
                                                    const isoDate = new Date(selectedDate + 'T00:00:00Z').toISOString(); // "2025-06-14T00:00:00.000Z"
                                                    field.onChange(isoDate);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Row 3: Nationality & NID Number */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="nationality"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Nationality <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select nationality" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {nationalities.map((nat) => (
                                                    <SelectItem key={nat} value={nat}>
                                                        {nat}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="nationalIdNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            National ID Number (NID) <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter NID number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Row 4: Mobile & Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="mobileNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Mobile Number <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="+880" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="emailAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter email address" type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Row 5: Relation with Applicant */}
                        <FormField
                            control={form.control}
                            name="relationWithApplicant"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                        Relation with Applicant <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select relation" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {relations.map((rel) => (
                                                <SelectItem key={rel} value={rel}>
                                                    {rel}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Address Fields */}
                        <FormField
                            control={form.control}
                            name="presentAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                        Present Address <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter present address" className="min-h-[80px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="permanentAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                        Permanent & Mailing Address <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter permanent & mailing address"
                                            className="min-h-[80px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="workAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                        Work Address <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter work address" className="min-h-[80px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Photo Upload */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Photo</Label>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => cameraInputRef.current?.click()}
                                    className="flex items-center gap-2"
                                >
                                    <Camera className="h-4 w-4" />
                                    Take Photo
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => photoInputRef.current?.click()}
                                    className="flex items-center gap-2"
                                >
                                    <Upload className="h-4 w-4" />
                                    Upload Photo
                                </Button>
                            </div>
                            <input
                                ref={cameraInputRef}
                                type="file"
                                accept="image/*"
                                capture="user"
                                onChange={handlePhotoUpload}
                                className="hidden"
                            />
                            <FormMessage />
                            <input
                                ref={photoInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                className="hidden"
                            />
                            <FormMessage />
                            {photoPreview && (
                                <div className="relative inline-block">
                                    <Image
                                        height={300}
                                        width={300}
                                        src={photoPreview || "/placeholder.svg"}
                                        alt="Photo preview"
                                        className="w-32 h-32 object-cover rounded-lg border"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                        onClick={() => removeSingleFile(setPhotoPreview, "photo")}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* NID Front Side – Take Photo or Upload */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">NID Front Side</Label>
                            <div className="flex gap-2">
                                {/* Take Photo button */}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => nidFrontCaptureRef.current?.click()}
                                    className="flex items-center gap-2"
                                >
                                    <Camera className="h-4 w-4" />
                                    Take Photo
                                </Button>

                                {/* Upload button */}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => nidFrontUploadRef.current?.click()}
                                    className="flex items-center gap-2"
                                >
                                    <Upload className="h-4 w-4" />
                                    Upload File
                                </Button>
                            </div>

                            {/* Hidden input for "take photo" (opens camera) */}
                            <input
                                ref={nidFrontCaptureRef}
                                type="file"
                                accept="image/*,.pdf"
                                capture="environment"
                                onChange={handleNidFrontUpload}
                                className="hidden"
                            />

                            {/* Hidden input for "upload" (file picker) */}
                            <input
                                ref={nidFrontUploadRef}
                                type="file"
                                accept="image/*,.pdf"
                                onChange={handleNidFrontUpload}
                                className="hidden"
                            />

                            {nidFrontPreview && (
                                <div className="relative inline-block">
                                    <Image
                                        height={300}
                                        width={300}
                                        src={nidFrontPreview || "/placeholder.svg"}
                                        alt="NID front preview"
                                        className="w-32 h-32 object-cover rounded-lg border"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                        onClick={() => removeSingleFile(setNidFrontPreview, "nidFront")}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* NID Back Side – Take Photo or Upload */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">NID Back Side</Label>
                            <div className="flex gap-2">
                                {/* Take Photo button */}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => nidBackCaptureRef.current?.click()}
                                    className="flex items-center gap-2"
                                >
                                    <Camera className="h-4 w-4" />
                                    Take Photo
                                </Button>

                                {/* Upload button */}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => nidBackUploadRef.current?.click()}
                                    className="flex items-center gap-2"
                                >
                                    <Upload className="h-4 w-4" />
                                    Upload File
                                </Button>
                            </div>

                            {/* Hidden input for "take photo" (opens camera) */}
                            <input
                                ref={nidBackCaptureRef}
                                type="file"
                                accept="image/*,.pdf"
                                capture="environment"
                                onChange={handleNidBackUpload}
                                className="hidden"
                            />

                            {/* Hidden input for "upload" (file picker) */}
                            <input
                                ref={nidBackUploadRef}
                                type="file"
                                accept="image/*,.pdf"
                                onChange={handleNidBackUpload}
                                className="hidden"
                            />

                            {nidBackPreview && (
                                <div className="relative inline-block">
                                    <Image
                                        height={300}
                                        width={300}
                                        src={nidBackPreview || "/placeholder.svg"}
                                        alt="NID back preview"
                                        className="w-32 h-32 object-cover rounded-lg border"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                        onClick={() => removeSingleFile(setNidBackPreview, "nidBack")}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Supporting Documents (multiple, preview, remove individually) */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">
                                Supporting Documents (select multiple)
                            </Label>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => supportingDocInputRef.current?.click()}
                                className="flex items-center gap-2"
                            >
                                <Upload className="h-4 w-4" />
                                Upload Documents
                            </Button>
                            <input
                                ref={supportingDocInputRef}
                                type="file"
                                accept="image/*,.pdf,.doc,.docx"
                                multiple
                                onChange={handleSupportingDocsUpload}
                                className="hidden"
                            />

                            {supportingDocs.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {supportingDocs.map((doc, idx) => (
                                        <div key={idx} className="relative inline-block">
                                            <Image
                                                height={300}
                                                width={300}
                                                src={doc.preview}
                                                alt={`Supporting doc ${idx + 1}`}
                                                className="w-32 h-32 object-cover rounded-lg border"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 bg-red-600"
                                                onClick={() => removeSupportingDocAt(idx)}
                                            >
                                                <X className="h-3 w-3 text-white" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center"
                            aria-busy={isLoading}
                            aria-label={isLoading ? "Submitting…" : "Submit"}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                                    Submitting…
                                </>
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
