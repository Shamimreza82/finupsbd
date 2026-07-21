"use client"

import { useState } from "react"
import Image from "next/image"
import { Upload, X } from "lucide-react"

interface ImageUploaderMultipleProps {
  label?: string
  value?: string[]
  onChange?: (files: File[]) => void
}

export default function ImageUploaderMultiple({
  label = "Upload Images",
  onChange,
}: ImageUploaderMultipleProps) {
  const [images, setImages] = useState<{ file: File; preview: string }[]>([])

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const newFiles: { file: File; preview: string }[] = []
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onloadend = () => {
          newFiles.push({ file, preview: reader.result as string })
          // update state only after all files processed
          if (newFiles.length === files.length) {
            const updated = [...images, ...newFiles]
            setImages(updated)
            onChange?.(updated.map((f) => f.file))
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    handleFiles(e.dataTransfer.files)
  }

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index)
    setImages(updated)
    onChange?.(updated.map((f) => f.file))
  }

  return (
    <div className="space-y-4 border-t pt-6">
      <h3 className="text-sm font-semibold">{label}</h3>

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className="relative rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition-all hover:border-gray-400 hover:bg-gray-100"
      >
        <input
          type="file"
          id="multiImageUploader"
          accept="image/*"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
        />
        <label htmlFor="multiImageUploader" className="cursor-pointer">
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                Drag and drop or click to upload
              </p>
              <p className="text-xs text-gray-500">Upload multiple images</p>
            </div>
          </div>
        </label>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative group rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all"
            >
              <Image
                src={img.preview}
                alt={`Image ${index + 1}`}
                width={200}
                height={200}
                className="h-40 w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 rounded-full bg-red-500/80 p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
