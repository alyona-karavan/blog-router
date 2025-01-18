import { FC } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import Header from '../Header'
import Articles from '../Articles'
import Article from '../Article'
import SignIn from '../SignIn'
import SignUp from '../SignUp'
import Profile from '../Profile'
import NotFound from '../NotFound'
import Error500 from '../Error500/Error500'

const App: FC = () => {
  const { isAuthenticated, login, logout, user } = useAuth()

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} logout={logout} user={user} />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/sign-in" element={<SignIn login={login} />} />
        <Route path="/sign-up" element={<SignUp login={login} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<Article />} />
        <Route path="/error500" element={<Error500 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
