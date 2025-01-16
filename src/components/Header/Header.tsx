import { FC } from 'react'
import { Link } from 'react-router-dom'

import { HeaderProps } from '../../services/types/types'

import styles from './Header.module.scss'

const Header: FC<HeaderProps> = ({ isAuthenticated, logout }) => {
  return (
    <header className={styles.header}>
      <Link to="/">Realworld Blog</Link>
      <nav>
        <ul className={styles.ulHeader}>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/" className={styles.createArticle}>
                  Create article
                </Link>
              </li>
              <li>
                <Link to="/" className={styles.profile}>
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={logout} className={styles.logOut}>
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/sign-in" className={styles.signIn}>
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/sign-up" className={styles.signUp}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
