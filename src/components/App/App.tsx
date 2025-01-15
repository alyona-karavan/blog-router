import { FC } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from '../Header'
import Articles from '../Articles'
import Article from '../Article'
import SignIn from '../SignIn'
import SignUp from '../SignUp'

const App: FC = () => {
  return (
    <Router>
      <Header />
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
