export function generateSlug(title: string): string {
  return title
    .toLowerCase() // ছোট হাতের অক্ষরে
    .trim() // আগের/পিছনের space সরানো
    .replace(/[^\w\s-]/g, '') // special characters remove করা
    .replace(/\s+/g, '-') // space → dash
    .replace(/--+/g, '-'); // multiple dash → single dash
}
