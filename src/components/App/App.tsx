import { FC } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import Header from '../Header'
import Articles from '../Articles'
import Article from '../Article'
import SignIn from '../SignIn'
import SignUp from '../SignUp'
import NotFound from '../NotFound'

const App: FC = () => {
  const { isAuthenticated, login, logout } = useAuth()

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} logout={logout} />
      <main>
        <Routes>
          <Route path="/sign-in" element={<SignIn login={login} />} />
          <Route path="/sign-up" element={<SignUp login={login} />} />
          <Route path="/" element={<Articles />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
