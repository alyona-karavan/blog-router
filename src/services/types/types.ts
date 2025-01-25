export type TArticle = {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
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

export type TLike = {
  article: TArticle
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

export type TlikeSlice = {
  articles: TArticle[] | undefined
}

export type TInitialLikeSlice = {
  articles: TArticle[]
  articlesCount: number
  currentPage: number
  currentArticle: TArticle | null
}

export type TStateLikeSlice = {
  articles: TInitialLikeSlice
}

export type TReduxLike = {
  articles: TArticlesResponse
}

export type TUserData = {
  user: TUserSlice
}

export type TLikeData = {
  articles: TlikeSlice
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

export type TPopConfirmProps = {
  slug: string
}
