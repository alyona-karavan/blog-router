import { FC } from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/">Realworld Blog</Link>
      <nav>
        <ul className={styles.ulHeader}>
          <li>
            <Link to="/signin" className={styles.signIn}>
              Sign In
            </Link>
          </li>
          <li>
            <Link to="/signup" className={styles.signUp}>
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default Header
