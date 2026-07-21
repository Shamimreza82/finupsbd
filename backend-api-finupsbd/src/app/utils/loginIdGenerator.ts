export function generateLoginId() {
  const loginId = Math.floor(100000000 + Math.random() * 900000000).toString();
  return loginId;
}
