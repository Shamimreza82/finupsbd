export const maskEmailAddress = (email: string) => {
  // Split the email into username and domain
  // // const [username, domain] = email.split('@');
  // console.log(domain);
  // // Check if the email format is valid
  // if (!username || !domain || !domain.includes('.')) {
  //   throw new Error('Invalid email address');
  // }

  // // Mask the username based on its length
  // let maskedUsername;
  // if (username.length <= 2) {
  //   // For very short usernames, keep the first character and mask the rest
  //   maskedUsername = username[0] + '*';
  // } else if (username.length <= 4) {
  //   // For short usernames, mask all but the first and last character
  //   maskedUsername = username[0] + '*' + username.slice(-1);
  // } else {
  //   // For longer usernames, keep the first and last two characters visible
  //   maskedUsername = username.slice(0, 2) + '****' + username.slice(-2);
  // }

  // // Reconstruct the masked email
  // const maskedEmail = `${maskedUsername}@ gmail.com`;
};
