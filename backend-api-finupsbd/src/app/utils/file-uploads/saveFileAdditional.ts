// utils/saveFileLoanApplication.ts

import fs from 'fs';
import path from 'path';
import util from 'util';

const writeFile = util.promisify(fs.writeFile);

export const saveFileAdditional = async (
  buffer: Buffer,
  originalName: string,
  applicationId: string,
): Promise<string> => {
  // NEW: define the per-application folder
  const appFolder = path.join(process.cwd(), 'uploads/AdditionalFiles', applicationId);

  // Ensure application folder exists
  if (!fs.existsSync(appFolder)) {
    fs.mkdirSync(appFolder, { recursive: true });
  }

  const timestamp = Date.now();
  const safeName = originalName.replace(/[^a-z0-9.\-_]/gi, '_'); // sanitize
  const filename = `${applicationId}-${timestamp}-${safeName}`;
  const fullPath = path.join(appFolder, filename);

  await writeFile(fullPath, buffer);

  // Return relative public URL
  return `/uploads/AdditionalFiles/${applicationId}/${filename}`;
};
