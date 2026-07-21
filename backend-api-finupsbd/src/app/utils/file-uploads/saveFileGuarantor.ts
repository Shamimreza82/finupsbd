import fs from 'fs';
import path from 'path';

/**
 * Save any file (image, pdf, etc.) to a dynamic subfolder based on ID and return relative path.
 * @param buffer - File buffer
 * @param originalName - Original file name
 * @param folder - Root folder name inside /uploads (e.g., "loanDocuments")
 * @param id - Unique identifier to create a subfolder (e.g., applicationId or userId)
 * @returns string - Relative path to store in database
 */

export const saveFileGuarantor = async (
  buffer: Buffer,
  originalName: string,
  folder: string,
  subFolder: string,
  id: string | number,
): Promise<string> => {
  // Create directory path: /uploads/<folder>/<id>/
  const uploadsDir = path.join(process.cwd(), 'uploads', folder, subFolder, `${id}`);

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const ext = path.extname(originalName) || '';
  const fileName = `${Date.now()}${ext}`;
  const filePath = path.join(uploadsDir, fileName);

  await fs.promises.writeFile(filePath, buffer);

  // Return relative path like: /uploads/loanDocuments/12345/1720576278923.pdf
  return `/uploads/${folder}/${subFolder}/${id}/${fileName}`;
};
