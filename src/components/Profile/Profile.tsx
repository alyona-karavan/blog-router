import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { updateCurrentUser } from '../../services/api/user'
import { EditProfile, UserData } from '../../services/types/types'
import { fetchUserData } from '../../store/userSlice'
import ErrorComponent from '../ErrorComponent'
import { AppDispatch } from '../../store'
import styles from '../SignIn/SignIn.module.scss'

const Profile = () => {
  const [error, setError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditProfile>()

  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: UserData) => state.user.user)

  useEffect(() => {
    if (user) {
      setValue('username', user.username)
      setValue('email', user.email)
      setValue('bio', user.bio)
      setValue('image', user.image)
    }
  }, [user, setValue])

  const navigate = useNavigate()

  const onSubmit = async (data: EditProfile) => {
    const userData = {
      user: {
        username: data.username,
        email: data.email,
        bio: data.bio,
        image: data.image || null,
      },
    }

    try {
      const response = await updateCurrentUser(userData)
      if (response.user) {
        console.log('Edited successful:', response)
        dispatch(fetchUserData())
        navigate('/')
      }
    } catch (err) {
      if (err instanceof Error) {
        if ('status' in err && err.status === 500) {
          console.log('Server error occurred:', err)
          setError('Server error, please try again later.')
          navigate('/error500')
        } else {
          setError('Edit failed')
        }
      }
    }
  }

  if (error) return <ErrorComponent />

  return (
    <div className={styles.container}>
      <p className={styles.title}>Edit Profile</p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputsContainer}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Username</label>
            <input
              className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
              type="text"
              placeholder="Username"
              {...register('username', {
                required: false,
                minLength: 3,
                maxLength: 20,
              })}
            />
            {errors.username && (
              <span className={styles.errorSpan}>Your username needs to be at least 3 characters</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email address</label>
            <input
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              type="email"
              placeholder="Email address"
              {...register('email', {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
            {errors.email && <span className={styles.errorSpan}>Enter a valid email address</span>}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Bio</label>
            <input
              className={`${styles.input} ${errors.bio ? styles.inputError : ''}`}
              type="text"
              placeholder="Add your bio (max 20 words)"
              {...register('bio', {
                required: false,
                validate: (value) => {
                  const wordCount = value ? value.trim().split(/\s+/).length : 0
                  return wordCount <= 20 || 'Bio must be 20 words or less'
                },
              })}
            />
            {errors.bio && <span className={styles.errorSpan}>{errors.bio.message}</span>}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Avatar image (url)</label>
            <input
              className={`${styles.input} ${errors.image ? styles.inputError : ''}`}
              type="text"
              placeholder="Avatar image"
              {...register('image', {
                required: false,
                pattern: {
                  value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i,
                  message: 'Enter a valid image URL',
                },
              })}
            />
            {errors.image && <span className={styles.errorSpan}>{errors.image.message}</span>}
          </div>
        </div>
        <button className={styles.button} type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

export default Profile
