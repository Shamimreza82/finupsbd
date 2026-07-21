"use client"

import { useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Eye, Download, FileText, FileImage, Search } from "lucide-react"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

type Document = {
  id: string
  originalName: string
  mimeType: string
  url: string
  uploadedAt: string
}

export function DocumentTable({ documents, searchTerm, onSearchChange, isDarkMode }: {
  documents: Document[]
  searchTerm: string
  onSearchChange: (value: string) => void
  isDarkMode: boolean
}) {
  const filtered = useMemo(
    () => documents.filter((doc) =>
      doc.originalName.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [documents, searchTerm]
  )

  return (
    <>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    {doc.mimeType.includes("pdf") ? (
                      <FileText className="w-4 h-4 text-blue-600" />
                    ) : (
                      <FileImage className="w-4 h-4 text-green-400" />
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {doc.originalName}
                    </p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {doc.mimeType}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{doc.mimeType}</Badge>
              </TableCell>
              <TableCell>{formatDate(doc.uploadedAt, "DD-MM-YYYY")}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{doc.originalName}</DialogTitle>
                      </DialogHeader>
                      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        {doc.mimeType.includes("image") ? (
                          <Image
                            height={300}
                            width={300}
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${doc.url}`}
                            alt={doc.originalName}
                            className="max-w-full max-h-full object-contain w-auto h-auto"
                          />
                        ) : doc.mimeType.includes("pdf") ? (
                          <iframe
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${doc.url}`}
                            className="w-full h-full rounded-lg"
                            title={doc.originalName}
                          />
                        ) : (
                          <p className="text-gray-500">Document preview not available</p>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${doc.url}`}
                      target="_blank"
                      download={doc.originalName}
                      rel="noreferrer"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
