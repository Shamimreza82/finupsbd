// src/utils/deleteFromCloudinary.ts

import cloudinary from './cloudinary';

export const deleteFromCloudinary = async (publicId: string): Promise<boolean> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok' || result.result === 'not found') {
      return true;
    } else {
      console.warn(`Cloudinary deletion not successful for publicId=${publicId}:`, result);
      return false;
    }
  } catch (error) {
    console.error(`Error deleting Cloudinary file [${publicId}]:`, error);
    return false;
  }
};
