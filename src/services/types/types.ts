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

export type TArticlesResponse = {
  articles: TArticle[]
  articlesCount: number
}

export type TArticlePutData = {
  title: string
  description: string
  body: string
  tagList: string[]
}

export type TArticlePut = {
  article: TArticlePutData
}

export type TSignUpForm = {
  username: string
  email: string
  password: string
  confirmPassword: string
  agreement: boolean
}

export type TSignUpData = {
  user: {
    username: string
    email: string
    password: string
  }
}

export type TSignInForm = {
  email: string
  password: string
}

export type TSignInData = {
  user: TSignInForm
}

export type TEditProfile = {
  username?: string
  email: string
  bio?: string
  image?: string | null
}

export type TEditProfileData = {
  user: TEditProfile
}

export type TUser = {
  email: string
  token: string
  username: string
  bio: string
  image: string | null
}

export type TUserSlice = {
  isAuthenticated: boolean
  user: TUser | null
}

export type TUserData = {
  user: TUserSlice
}

export type TPostArticle = {
  title: string
  description: string
  body: string
  tagList?: string[]
}

export type TPostArticleData = {
  article: TPostArticle
}
