import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { fetchUserData } from '../../store/userSlice'
import Header from '../Header'
import Articles from '../Articles'
import Article from '../Article'
import SignIn from '../SignIn'
import SignUp from '../SignUp'
import Profile from '../Profile'
import NotFound from '../NotFound'
import Error500 from '../Error500/Error500'
import { AppDispatch } from '../../store'

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchUserData())
  }, [dispatch])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
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
