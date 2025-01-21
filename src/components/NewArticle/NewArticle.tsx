import { useState, FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { CreateArticle } from '../../services/types/types'
import ErrorComponent from '../ErrorComponent'
import { CreateAnArticle } from '../../services/api/articles'

import styles from './NewArticle.module.scss'

const NewArticle: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateArticle>()

  const [tags, setTags] = useState<string[]>([''])
  const filteredTags = tags.filter((tag) => tag !== '')

  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  const onSubmit = async (data: CreateArticle) => {
    const articleData = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: filteredTags,
      },
    }
    try {
      const response = await CreateAnArticle(articleData)
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

  if (error) return <ErrorComponent />

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.title}>Create new article</p>
        <div className={styles.inputsContainer}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Title</label>
            <input
              className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
              placeholder="Title"
              {...register('title', { required: true })}
            />
            {errors.title && <span className={styles.errorSpan}>This field is required</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Short Description</label>
            <input
              className={`${styles.input} ${errors.description ? styles.inputError : ''}`}
              placeholder="Short Description"
              {...register('description', { required: true })}
            />
            {errors.description && <span className={styles.errorSpan}>This field is required</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Text</label>
            <textarea
              className={`${styles.input} ${styles.text} ${errors.body ? styles.inputError : ''}`}
              placeholder="Text"
              {...register('body', { required: true })}
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
    </div>
  )
}

export default NewArticle
