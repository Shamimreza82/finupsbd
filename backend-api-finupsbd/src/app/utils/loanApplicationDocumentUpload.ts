/* eslint-disable @typescript-eslint/no-explicit-any */

import cloudinary from './cloudinary';

function uploadBufferToCloudinary(
  fileBuffer: Buffer,
  filename: string,
  mimetype: string,
): Promise<any> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { public_id: filename, resource_type: 'auto' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    stream.end(fileBuffer);
  });
}

export default uploadBufferToCloudinary;
