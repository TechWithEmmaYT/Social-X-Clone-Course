type UserType = {
  id: number;
  name: string | null;
  username: string | null;
  bio: string | null;
  email: string;
  dateOfBirth: Date | null;
  emailVerified: Date | null;
  coverImage: string | null;
  profileImage: string | null;
  createdAt: Date;
  updatedAt: Date;
  followingIds: number[];
  hasNotification: boolean | null;
  isVerified?: boolean;
  followersCount?: number;
  subscription: {
    plan: string;
  } | null;
};
