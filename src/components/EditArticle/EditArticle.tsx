import { useState, FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { TArticlePutData } from '../../services/types/types'
import ErrorComponent from '../ErrorComponent'
import Loading from '../Loading'
import { putArticle, fetchArticleBySlug } from '../../services/api/articles'
import styles from '../NewArticle/NewArticle.module.scss'

const EditArticle: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TArticlePutData>()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentArticle, setCurrentArticle] = useState<TArticlePutData | null>(null)
  const [tags, setTags] = useState<string[]>([''])
  const filteredTags = tags.filter((tag) => tag !== '')

  const navigate = useNavigate()
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
          const articleData = {
            title: data.title,
            description: data.description,
            body: data.body,
            tagList: data.tagList,
          }
          setCurrentArticle(articleData)
          setTags(articleData.tagList.length === 0 ? [''] : articleData.tagList)
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

  const onSubmit = async (data: TArticlePutData) => {
    if (!slug) {
      setError('Slug is undefined')
      return
    }
    const articleData = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: filteredTags,
      },
    }
    try {
      const response = await putArticle(slug, articleData)
      if (response.article) {
        navigate('/')
      }
    } catch (err) {
      setError('Error')
    }
  }

  const addTag = () => {
    if (tags[tags.length - 1] !== '') {
      setTags([...tags, ''])
    }
  }

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index)
    setTags(newTags)
  }
  if (loading) return <Loading />
  if (error) return <ErrorComponent />

  return (
    <div className={styles.container}>
      {currentArticle && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <p className={styles.title}>Edit article</p>
          <div className={styles.inputsContainer}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Title</label>
              <input
                className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                value={currentArticle.title}
                {...register('title', { required: true })}
                onChange={(e) => setCurrentArticle({ ...currentArticle, title: e.target.value })}
              />
              {errors.title && <span className={styles.errorSpan}>This field is required</span>}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Short Description</label>
              <input
                className={`${styles.input} ${errors.description ? styles.inputError : ''}`}
                value={currentArticle.description}
                {...register('description', { required: true })}
                onChange={(e) => setCurrentArticle({ ...currentArticle, description: e.target.value })}
              />
              {errors.description && <span className={styles.errorSpan}>This field is required</span>}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Text</label>
              <textarea
                className={`${styles.input} ${styles.text} ${errors.body ? styles.inputError : ''}`}
                value={currentArticle.body}
                {...register('body', { required: true })}
                onChange={(e) => setCurrentArticle({ ...currentArticle, body: e.target.value })}
              />
              {errors.body && <span className={styles.errorSpan}>This field is required</span>}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Tags</label>
              {tags.map((tag, index) => (
                <div className={styles.tagLine} key={index}>
                  <div className={`${styles.input} ${styles.tag}`}>
                    <input
                      {...register(`tagList.${index}`)}
                      placeholder="Tag"
                      value={tag}
                      onChange={(e) => {
                        const newTags = [...tags]
                        newTags[index] = e.target.value
                        setTags(newTags)
                      }}
                    />
                  </div>
                  {tags.length > 1 && (
                    <button
                      className={`${styles.button} ${styles.delete}`}
                      type="button"
                      onClick={() => removeTag(index)}
                    >
                      Delete Tag
                    </button>
                  )}
                  {index === tags.length - 1 && (
                    <button className={`${styles.button} ${styles.add}`} type="button" onClick={() => addTag()}>
                      Add Tag
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button className={styles.buttonSubmit} type="submit">
            Send
          </button>
        </form>
      )}
    </div>
  )
}
export default EditArticle
