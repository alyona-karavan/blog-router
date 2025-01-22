import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { login } from '../../store/userSlice'
import { TSignUpForm } from '../../services/types/types'
import { registerUser } from '../../services/api/user'
import ErrorComponent from '../ErrorComponent'

import styles from './SignUp.module.scss'

const SignUp: FC = () => {
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TSignUpForm>()

  const navigate = useNavigate()

  const onSubmit = async (data: TSignUpForm) => {
    const userData = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    }

    try {
      const response = await registerUser(userData)
      console.log('Registration successful:', response)
      if (response.user.token) {
        dispatch(login(response.user))
      } else {
        console.error('Token not found in response:', response)
      }
      navigate('/')
    } catch (err) {
      console.error(err)
      setError('Registration failed')
    }
  }

  if (error) return <ErrorComponent />

  return (
    <div className={styles.container}>
      <p className={styles.title}>Create new account</p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputsContainer}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Username</label>
            <input
              className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
              type="text"
              placeholder="Username"
              {...register('username', {
                required: true,
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
            <label className={styles.label}>Password</label>
            <input
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              type="password"
              placeholder="Password"
              {...register('password', {
                required: true,
                minLength: 6,
                maxLength: 40,
              })}
            />
            {errors.password && (
              <span className={styles.errorSpan}>Your password needs to be at least 6 characters.</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Repeat password</label>
            <input
              className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
              type="password"
              placeholder="Password"
              {...register('confirmPassword', {
                required: true,
                validate: (value) => value === watch('password') || 'Passwords must match',
              })}
            />
            {errors.confirmPassword && <span className={styles.errorSpan}>{errors.confirmPassword.message}</span>}
          </div>
        </div>
        <div className={styles.checkboxContainer}>
          <div className={styles.checkboxGroup}>
            <input className={styles.checkbox} type="checkbox" {...register('agreement', { required: true })} />
            <label className={styles.label}>I agree to the processing of my personal information</label>
          </div>
          {errors.agreement && <span className={styles.errorSpan}>This field is required</span>}
        </div>
        <button className={styles.button} type="submit">
          Create
        </button>
      </form>
      <p className={styles.alreadyHaveAccount}>
        Already have an account?
        <Link to="/sign-in" className={styles.link}>
          Sign In
        </Link>
        .
      </p>
    </div>
  )
}

export default SignUp
