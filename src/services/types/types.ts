export type TArticle = {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favoritesCount: number
  author: {
    username: string
    bio: string
    image: string
    following: boolean
  }
}

export type ArticlesResponse = {
  articles: TArticle[]
  articlesCount: number
}

export type SignUpForm = {
  username: string
  email: string
  password: string
  confirmPassword: string
  agreement: boolean
}

export type SignUpData = {
  user: {
    username: string
    email: string
    password: string
  }
}

export type SignInForm = {
  email: string
  password: string
}

export type SignInData = {
  user: SignInForm
}

export type EditProfile = {
  username: string
  email: string
  bio: string
  image: string | null
}

export type EditProfileData = {
  user: EditProfile
}

export type User = {
  email: string
  token: string
  username: string
  bio: string
  image: string | null
}

export type TokenProps = {
  login: (token: string) => void
}

export type HeaderProps = {
  isAuthenticated: boolean
  logout: () => void
  user: User | null
}
