"use client";

import { FileWithPreview } from "@/app/(withApplicationLayout)/user/loan-application/schemas/document-info-schema";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  FileText,
  ImageIcon,
  Info,
  Upload,
  X,
} from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";

interface FileUploadProps {
  value: FileWithPreview | null;
  onChange: (file: FileWithPreview | null) => void;
  accept: string;
  error?: string;
  fieldName?: string;
}

export function FileUpload({
  value,
  onChange,
  accept,
  error,
  fieldName = "File",
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string>("");
  const [storageWarning, setStorageWarning] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAcceptedTypes = (acceptString: string) => {
    return acceptString.split(",").map((type) => type.trim());
  };

  const getFileTypeMessage = (acceptString: string) => {
    const types = getAcceptedTypes(acceptString);
    const imageTypes = types.filter((type) => type.startsWith("image/"));
    const hasPDF = types.includes("application/pdf");

    if (imageTypes.length > 0 && hasPDF) {
      return "JPEG, JPG, PNG, WEBP, or PDF";
    } else if (imageTypes.length > 0) {
      return "JPEG, JPG, PNG, or WEBP";
    }
    return "supported";
  };

  const validateFile = (file: File): string | null => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // ✅ Updated to 5MB
    const acceptedTypes = getAcceptedTypes(accept);

    if (file.size > MAX_FILE_SIZE) {
      return `File size must be less than 5MB. Selected file is ${(file.size / 1024 / 1024).toFixed(2)}MB`;
    }

    if (!acceptedTypes.includes(file.type)) {
      return `Invalid file type. Please upload ${getFileTypeMessage(accept)} files only`;
    }

    return null;
  };

  const compressImage = (
    file: File,
    maxWidth = 1200,
    quality = 0.8
  ): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL(file.type, quality);
        resolve(compressedDataUrl);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const processFile = async (file: File) => {
    setValidationError("");
    setStorageWarning("");

    const validationResult = validateFile(file);
    if (validationResult) {
      setValidationError(validationResult);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    try {
      let dataUrl: string;

      if (file.type.startsWith("image/")) {
        dataUrl = await compressImage(file);
        const compressedSize = new Blob([dataUrl]).size;
        if (compressedSize > 1024 * 1024) {
          setStorageWarning("Large file detected. This may cause storage issues.");
        }
      } else {
        const reader = new FileReader();
        dataUrl = await new Promise<string>((resolve) => {
          reader.onload = (event) => {
            resolve(event.target?.result as string);
          };
          reader.readAsDataURL(file);
        });
      }

      const fileWithPreview: FileWithPreview = {
        name: file.name,
        type: file.type,
        size: file.size,
        dataUrl: dataUrl,
      };

      onChange(fileWithPreview);
    } catch (error) {
      console.error("Error processing file:", error);
      setValidationError("Error processing file. Please try again.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
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
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const removeFile = () => {
    onChange(null);
    setValidationError("");
    setStorageWarning("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isPDF = value?.type === "application/pdf";
  const displayError = validationError || error;

  return (
    <div className="space-y-2">
      {!value ? (
        <div
          className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
            isDragging
              ? "border-primary bg-primary/10"
              : displayError
              ? "border-destructive bg-destructive/5"
              : "border-muted-foreground/20 hover:border-primary/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
          <p className="text-sm font-medium">
            Drag and drop or <span className="text-primary">browse</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Supported formats: {getFileTypeMessage(accept).toUpperCase()}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Max size: 5MB</p>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="relative rounded-lg border p-4">
          <div className="flex items-center gap-3">
            {isPDF ? (
              <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted">
                <FileText className="h-8 w-8 text-primary" />
              </div>
            ) : (
              <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
                {value.type.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={value.dataUrl || "/placeholder.svg"}
                    alt={value.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-primary" />
                  </div>
                )}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{value.name}</p>
              <p className="text-xs text-muted-foreground">
                {(value.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={removeFile}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        </div>
      )}
      {displayError && (
        <div className="flex items-center gap-2 text-sm font-medium text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>{displayError}</span>
        </div>
      )}
      {storageWarning && (
        <div className="flex items-center gap-2 text-sm font-medium text-amber-600">
          <Info className="h-4 w-4" />
          <span>{storageWarning}</span>
        </div>
      )}
    </div>
  );
}
