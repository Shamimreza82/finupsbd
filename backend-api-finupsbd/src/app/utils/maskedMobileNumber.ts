function maskMobileNumber(number: string) {
  // Convert the number to a string (if not already)
  const str = number.toString();

  // Check if the number is valid and has at least 10 digits
  if (str.length < 10) {
    throw new Error('Invalid mobile number');
  }

  // Mask the middle part, leaving the country code and last two digits
  const masked = str.slice(0, 6) + '****' + str.slice(-2);

  return masked;
}

export default maskMobileNumber;
