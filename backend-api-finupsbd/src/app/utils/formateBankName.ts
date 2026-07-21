import { BankName } from '@prisma/client';

export function formatBankName(key: BankName): string {
  return key
    .split('_')
    .map((word) =>
      word.toLowerCase() === 'plc'
        ? 'plc'
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join(' ');
}
