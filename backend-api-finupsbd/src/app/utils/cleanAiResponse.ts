/* eslint-disable @typescript-eslint/no-explicit-any */
interface AiResult {
  loans: any[];
  message: string;
}

function cleanAiResponse(raw: string): AiResult {
  // 1. Trim whitespace and stray single-quotes
  let s = raw
    .trim()
    .replace(/^'+/, '') // remove leading single-quote(s)
    .replace(/'+$/, '') // remove trailing single-quote(s)
    .trim();

  // 2. Remove Markdown fences (``` or ```json) if present
  s = s.replace(/^```(?:json)?\s*/, '').replace(/```$/, '');

  // 3. Parse JSON
  let obj: AiResult;
  try {
    obj = JSON.parse(s);
  } catch (err) {
    console.error('Failed to parse AI response:', err);
    throw err;
  }

  // 4. Convert escaped "\\n" sequences into real newlines
  obj.message = obj.message.replace(/\\n/g, '\n');

  return obj;
}

export default cleanAiResponse;
