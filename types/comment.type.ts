type CommentType = {
  id: number;
  body: string;
  userId: number;
  postId: number;
  commentImage: string;
  createdAt: string;
  updatedAt: string;
  user: UserType;
  post: PostType;
};
