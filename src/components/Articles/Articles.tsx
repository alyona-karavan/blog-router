import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { fetchArticles } from '../../services/api/articles'
import { TUserData, TStateLikeSlice, TArticle } from '../../services/types/types'
import { setArticles, fetchUserLike, setCurrentPage } from '../../store/likeSlice'
import { postLike, deleteLike } from '../../services/api/like'
import { AppDispatch } from '../../store'
import PaginationComponent from '../PaginationComponent'
import Loading from '../Loading'
import ErrorComponent from '../ErrorComponent'

import styles from './Articles.module.scss'

const Articles = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const isAuthenticated = useSelector((state: TUserData) => state.user.isAuthenticated)
  const articles = useSelector((state: TStateLikeSlice) => state.articles.articles)
  const total = useSelector((state: TStateLikeSlice) => state.articles.articlesCount)
  const currentPage = useSelector((state: TStateLikeSlice) => state.articles.currentPage)

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true)
        const response = await fetchArticles(currentPage)
        dispatch(setArticles(response))
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [currentPage, dispatch])

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString())
  }, [currentPage])

  const handleLikeClick = async (article: TArticle) => {
    if (isAuthenticated) {
      try {
        if (article.favorited) {
          const response = await deleteLike(article.slug)
          if (response.article) {
            dispatch(fetchUserLike(currentPage))
          }
        } else {
          await postLike(article.slug)
          dispatch(fetchUserLike(currentPage))
        }
        dispatch(setCurrentPage(currentPage))
      } catch (err) {
        setError('Invalid credentials')
      }
    }
  }

  if (loading) return <Loading />
  if (error) return <ErrorComponent />
  if (!articles || articles.length === 0) return <div>No articles found</div>

  return (
    <>
      <section className={styles.articles}>
        {articles && articles.length > 0 ? (
          articles.map((article) => (
            <section className={styles.article} key={article.slug}>
              <div className={styles.leftSide}>
                <div className={styles.titleLikes}>
                  <Link to={`/articles/${article.slug}`} key={article.slug} className={styles.title}>
                    {article.title}
                  </Link>
                  <img
                    className={styles.heart}
                    src={article.favorited && isAuthenticated ? '/assets/img/heart-red.svg' : '/assets/img/heart.svg'}
                    alt="like"
                    onClick={() => handleLikeClick(article)}
                  />
                  {article.favoritesCount !== 0 && <p className={styles.countLikes}>{article.favoritesCount}</p>}
                </div>
                {article.tagList && article.tagList.length > 0 && (
                  <p className={styles.tagList}>
                    {article.tagList.map((tag, index) => (
                      <span key={index} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </p>
                )}
                <p className={styles.description}>{article.description}</p>
              </div>
              <div className={styles.rightSide}>
                <div className={styles.containerForAuthorDate}>
                  <p className={styles.author}>{article.author.username}</p>
                  {article.updatedAt ? (
                    <p className={styles.date}>
                      {new Date(article.updatedAt).toLocaleString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  ) : (
                    <p className={styles.date}>
                      {new Date(article.createdAt).toLocaleString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </div>
                <img src={article.author.image} alt="Profile" className={styles.photo} />
              </div>
            </section>
          ))
        ) : (
          <div>No articles found</div>
        )}
      </section>
      <PaginationComponent current={currentPage} total={total} onChange={(page) => dispatch(setCurrentPage(page))} />
    </>
  )
}

export default Articles
