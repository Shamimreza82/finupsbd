/* eslint-disable @typescript-eslint/no-explicit-any */
export function numberToBanglaWords(num: number): string {
  const units = ['', 'এক', 'দুই', 'তিন', 'চার', 'পাঁচ', 'ছয়', 'সাত', 'আট', 'নয়'];
  const tens = ['', 'দশ', 'বিশ', 'ত্রিশ', 'চল্লিশ', 'পঞ্চাশ', 'ষাট', 'সত্তর', 'আশি', 'নব্বই'];
  const teens = ['এগারো', 'বারো', 'তেরো', 'চৌদ্দ', 'পনেরো', 'ষোলো', 'সতেরো', 'আঠারো', 'উনিশ'];

  if (num === 0) return 'শূন্য';

  function twoDigit(n: any) {
    if (n < 10) return units[n];
    if (n === 10) return 'দশ';
    if (n > 10 && n < 20) return teens[n - 11];
    const ten = Math.floor(n / 10);
    const one = n % 10;
    return tens[ten] + (one ? ' ' + units[one] : '');
  }

  function threeDigit(n: any) {
    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    let result = '';
    if (hundred) result += units[hundred] + ' শত';
    if (rest) result += (result ? ' ' : '') + twoDigit(rest);
    return result;
  }

  let result = '';
  if (num >= 1000 && num < 100000) {
    const thousand = Math.floor(num / 1000);
    const rest = num % 1000;
    result += (thousand > 9 ? threeDigit(thousand) : units[thousand]) + ' হাজার';
    if (rest) result += ' ' + threeDigit(rest);
  } else if (num < 1000) {
    result = threeDigit(num);
  } else {
    result = num.toString(); // fallback for very large numbers
  }

  return result.trim() + ' টাকা মাত্র';
}
