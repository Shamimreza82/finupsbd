// import { prisma } from '../../app';

// const lastUser = async () => {
//   const id = await prisma.user.findFirst({
//     orderBy: {
//       createdAt: 'desc',
//     },
//     select: {
//       userId: true,
//     },
//   });
//   return id;
// };

// export async function generateUserId() {
//   let newUserId;
//   const  userId  = await lastUser();
//   if (userId?.userId) {
//     // Example: "250112001"
//       const prefix = userId?.userId?.slice(0, 6); // Extract prefix, e.g., "250112"
//       const sequence = parseInt(userId.userId.slice(6), 10); // Extract numeric part, e.g., "001"
//       const nextSequence = (sequence + 1).toString().padStart(3, '0'); // Increment and pad with zeros
//       newUserId = `${prefix}${nextSequence}`; // Combine prefix and new sequence
//   } else {
//     // If no users exist, start with the first ID
//     newUserId = generateUserIdToday(1);
//   }

//   return newUserId;
// }

export function generateUserIdToday(sequenceNumber: number) {
  const now = new Date();

  // Get the last two digits of the year
  const year = now.getFullYear().toString().slice(-2);

  // Month is 0-indexed, so add 1 and pad to two digits
  const month = ('0' + (now.getMonth() + 1)).slice(-2);

  // Get day of month and pad to two digits
  const day = ('0' + now.getDate()).slice(-2);

  // Pad the sequence number to 3 digits
  const sequence = ('00' + sequenceNumber).slice(-3);

  return year + month + day + sequence;
}

import { prisma } from '../../app';

// Get the last created user with a userId.
const lastUser = async () => {
  const user = await prisma.user.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      userId: true,
    },
  });
  return user;
};

// Function to generate the date prefix (YYMMDD)
export function generatePrefix() {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);
  return year + month + day;
}

// Function to generate a new userId based on today's date and sequence.
export async function generateUserId() {
  const todayPrefix = generatePrefix();
  let newUserId;
  const user = await lastUser();

  if (user?.userId) {
    const lastUserPrefix = user.userId.slice(0, 6); // Extract the prefix from the last userId.

    if (lastUserPrefix === todayPrefix) {
      // If the last user was created today, increment the sequence.
      const sequence = parseInt(user.userId.slice(6), 10);
      const nextSequence = (sequence + 1).toString().padStart(3, '0');
      newUserId = `${todayPrefix}${nextSequence}`;
    } else {
      // Last user is from a previous day, so reset the sequence.
      newUserId = `${todayPrefix}001`;
    }
  } else {
    // No users exist yet; start with sequence 001.
    newUserId = `${todayPrefix}001`;
  }

  return newUserId;
}
