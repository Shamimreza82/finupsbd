type UploadedFile = {
  lastModified: number; // Unix timestamp in milliseconds
  lastModifiedDate: Date;
  name: string;
  size: number; // in bytes
  type: string; // e.g., "image/png"
  webkitRelativePath: string;
};



export type GuarantorInfo = UploadedFile[]


