// Define the UserGender enum. Adjust values as needed.

// Define the Profile interface
export interface TUserProfile {
  id: string;
  nameAsNid: string;
  nationalIdNumber: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  dateOfBirth: Date;
  avatar?: string; // Optional: URL to profile picture
  address?: string; // Optional address field
  city: string;
}
