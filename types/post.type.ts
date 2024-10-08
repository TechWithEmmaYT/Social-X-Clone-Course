type PostType = {
  id: number;
  body: string;
  userId: number;
  comments: [];
  likeIds: number[];
  postImage: string;
  createdAt: string;
  updatedAt: string;
  user: UserType;
};
