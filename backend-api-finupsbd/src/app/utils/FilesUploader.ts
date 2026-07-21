import { v2 as cloudinary, UploadApiOptions, UploadApiResponse } from 'cloudinary';
import { ConfigFile } from '../../config';

cloudinary.config({
  cloud_name: ConfigFile.CLOUDINARY_CLOUD_NAME,
  api_key: ConfigFile.CLOUDINARY_API_KEY,
  api_secret: ConfigFile.CLOUDINARY_API_SECRET,
  secure: true, // always use HTTPS URLs
});

export function uploadBufferToCloudinary(
  buffer: Buffer,
  publicId?: string,
  options: Omit<UploadApiOptions, 'file'> = {},
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    // Merge in public_id if provided
    const uploadOptions: UploadApiOptions = {
      ...options,
      ...(publicId ? { public_id: publicId } : {}),
    };

    const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) return reject(error);
      if (!result) return reject(new Error('No result returned from Cloudinary.'));
      resolve(result);
    });

    // Write the Buffer into the stream. Once ended, Cloudinary will process it.
    uploadStream.end(buffer);
  });
}

// Example usage in an async handler:
export async function uploadBufferAsDataURI(
  buffer: Buffer,
  mimeType: string,
  publicId?: string,
  options: Omit<UploadApiOptions, 'file'> = {},
): Promise<UploadApiResponse> {
  // Convert to "data:<mimeType>;base64,<base64string>"
  const base64 = buffer.toString('base64');
  const dataUri = `data:${mimeType};base64,${base64}`;

  const uploadOptions: UploadApiOptions = {
    ...options,
    ...(publicId ? { public_id: publicId } : {}),
  };

  const result = await cloudinary.uploader.upload(dataUri, uploadOptions);
  return result;
}
