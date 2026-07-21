import crypto from 'crypto';
import { ConfigFile } from '../../config';

const algorithm = 'aes-256-cbc';

if (!ConfigFile.SECRET_KEY) {
  throw new Error('SECRET_KEY is missing in ConfigFile!');
}

if (!ConfigFile.HMAC_KEY) {
  throw new Error('HMAC_KEY is missing in ConfigFile!');
}

const key = Buffer.from(ConfigFile.SECRET_KEY!, 'hex'); // 32-byte key (256-bit)
const hmacKey = Buffer.from(ConfigFile.HMAC_KEY!, 'utf8'); // Any strong secret

export const encrypt = (text: string) => {
  const iv = crypto.randomBytes(16); // ✅ Must be 16 bytes
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const encryptedHex = encrypted.toString('hex');
  const ivHex = iv.toString('hex');

  const hmac = crypto.createHmac('sha256', hmacKey);
  hmac.update(ivHex + ':' + encryptedHex);
  const authTag = hmac.digest('hex');

  return `${ivHex}:${encryptedHex}:${authTag}`;
};

export const decrypt = (payload: string) => {
  const [ivHex, encryptedHex, authTag] = payload.split(':');

  const hmac = crypto.createHmac('sha256', hmacKey);
  hmac.update(`${ivHex}:${encryptedHex}`);
  const validHmac = hmac.digest('hex');

  if (validHmac !== authTag) throw new Error('Integrity check failed');

  const iv = Buffer.from(ivHex, 'hex');
  const encryptedText = Buffer.from(encryptedHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
