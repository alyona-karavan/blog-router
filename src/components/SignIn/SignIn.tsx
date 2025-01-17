import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { loginUser } from '../../services/api/user'
import ErrorComponent from '../ErrorComponent'
import { SignInForm, TokenProps } from '../../services/types/types'

import styles from './SignIn.module.scss'

const SignIn: FC<TokenProps> = ({ login }) => {
  const [error, setError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>()

  const navigate = useNavigate()

  const onSubmit = async (data: SignInForm) => {
    const userData = {
      user: {
        email: data.email,
        password: data.password,
      },
    }
    try {
      const response = await loginUser(userData)
      login(response.user.token)
      navigate('/')
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  if (error) return <ErrorComponent />

  return (
    <div className={styles.container}>
      <p className={styles.title}>Sign In</p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputsContainer}>
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
        </div>
        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
      <p className={styles.alreadyHaveAccount}>
        Don&apos;t have an account?
        <Link to="/sign-up" className={styles.link}>
          Sign Up
        </Link>
        .
      </p>
    </div>
  )
}

export default SignIn
