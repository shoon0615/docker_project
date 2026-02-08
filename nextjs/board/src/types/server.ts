export interface User {
  id: string
  name: string
  age: number
}
export interface Post {
  id: string
  createdAt: string
  title: string
  content: string
  userId: string
  user?: User
}
export interface Comment {
  id: string
  createdAt: string
  comment: string
  userId: string
  postId: string
  user?: User
  post?: Post
}