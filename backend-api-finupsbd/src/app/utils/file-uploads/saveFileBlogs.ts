import fs from 'fs';
import path from 'path';

export const saveFileBlogs = async (
  buffer: Buffer,
  originalName: string,
  folder: string,
  id?: string,
): Promise<string> => {
  // (e.g., /uploads/folder/)
  const uploadsDir = path.join(process.cwd(), 'uploads', folder, `${id}`);

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  let fileName = '';

  const ext = path.extname(originalName) || '';
  fileName = `${Date.now()}-${ext}`;

  const filePath = path.join(uploadsDir, fileName);
  await fs.promises.writeFile(filePath, buffer);

  return `/uploads/${folder}/${id}/${fileName}`;
};
