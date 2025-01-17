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

export type SignInForm = {
  email: string
  password: string
}

export type UserData = {
  user: {
    username?: string
    email: string
    password: string
  }
}

export type TokenProps = {
  login: (token: string) => void
}

export type HeaderProps = {
  isAuthenticated: boolean
  logout: () => void
}
