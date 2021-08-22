interface Post {
  id: number;
  title: string;
  body: string;
}

export interface CreatePostRequest {
  title: string;
  body: string;
  userId: number;
}

export default Post;
