/* eslint-disable indent */
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'

import Loading from '../Loading'
import ErrorComponent from '../ErrorComponent'
import { fetchArticleBySlug } from '../../services/api/articles'
import { TArticle, TUserData } from '../../services/types/types'

import styles from './Article.module.scss'

const Article = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const isAuthenticated = useSelector((state: TUserData) => state.user.isAuthenticated)
  const user = useSelector((state: TUserData) => state.user.user)
  const [currentArticle, setCurrentArticle] = useState<TArticle | null>(null)
  const { slug } = useParams()

  useEffect(() => {
    const loadArticle = async () => {
      setError(null)
      if (!slug) {
        setError('Slug is undefined')
        return
      }
      try {
        setLoading(true)
        const data = await fetchArticleBySlug(slug)
        if (data) {
          setCurrentArticle(data)
        } else {
          setError('Article not found')
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Error fetching article: ${err.message}`)
        } else {
          setError('An unknown error occurred while fetching the article')
        }
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [slug])

  if (loading) return <Loading />
  if (error) return <ErrorComponent />

  return (
    <section>
      {currentArticle && (
        <div className={styles.container}>
          <div className={styles.article}>
            <div className={styles.leftSide}>
              <div className={styles.titleLikes}>
                <p className={styles.title}>{currentArticle.title}</p>
                <img className={styles.heart} src="/assets/img/heart.svg" alt="like" />
                {currentArticle.favoritesCount !== 0 && (
                  <p className={styles.countLikes}>{currentArticle.favoritesCount}</p>
                )}
              </div>
              {currentArticle.tagList && currentArticle.tagList.length > 0 && (
                <p className={styles.tagList}>
                  {currentArticle.tagList.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </p>
              )}
              <p className={styles.description}>{currentArticle.description}</p>
            </div>

            <div>
              <div className={styles.rightSide}>
                <div className={styles.containerForAuthorDate}>
                  <p className={styles.author}>{currentArticle.author.username}</p>
                  {currentArticle.updatedAt ? (
                    <p className={styles.date}>
                      {new Date(currentArticle.updatedAt).toLocaleString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  ) : (
                    <p className={styles.date}>
                      {new Date(currentArticle.createdAt).toLocaleString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </div>
                <img src={currentArticle.author.image} alt="ProfilePhoto" className={styles.photo} />
              </div>

              {isAuthenticated &&
              currentArticle.author.username === user?.username &&
              currentArticle.author.bio === user?.bio &&
              currentArticle.author.image === user?.image ? (
                // eslint-disable-next-line indent
                <div className={styles.buttons}>
                  <Link to="">
                    <div className={`${styles.button} ${styles.delete}`}>Delete</div>
                  </Link>
                  <Link to={`/articles/${slug}/edit`}>
                    <div className={`${styles.button} ${styles.edit}`}>Edit</div>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
          <ReactMarkdown className={styles.body}>{currentArticle.body}</ReactMarkdown>
        </div>
      )}
    </section>
  )
}

export default Article
