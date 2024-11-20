// here import all states and export them as a single array
import { CategoryState } from "./category/category.state"
import { PostState } from "./posts/post.state"
import { UserAuthenticateState } from "./user-authentication/user-authentication.state"
export const AppState = [
  UserAuthenticateState,
  CategoryState,
  PostState
]