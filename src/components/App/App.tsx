import { FC } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Articles from '../Articles'
import Article from '../Article'
import SignIn from '../SignIn'
import SignUp from '../SignUp'

import styles from './App.module.scss'

const App: FC = () => {
  return (
    <Router>
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
      <main>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Articles />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<Article />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
