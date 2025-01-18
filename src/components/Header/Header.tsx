import { FC } from 'react'
import { Link } from 'react-router-dom'

import { HeaderProps } from '../../services/types/types'

import styles from './Header.module.scss'

const Header: FC<HeaderProps> = ({ isAuthenticated, logout, user }) => {
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
              <li className={styles.profile}>
                <Link to="/profile" className={styles.profileLink}>
                  <span className={styles.username}>
                    {user?.username && user.username.length > 10 ? `${user.username.slice(0, 10)}...` : user?.username}
                  </span>
                  {user?.image && <img src={user.image} alt="User Photo" className={styles.photo} />}
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
