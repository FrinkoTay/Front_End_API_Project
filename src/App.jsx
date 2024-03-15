import { Routes, Route } from 'react-router-dom'
import { Fragment, useState } from 'react'
import NavBar from './components/NavBar'
import Homepage from './components/Homepage'
import Articles from './components/Articles'
import SingleArticle from './components/SingleArticle'
import ArticleComments from './components/ArticleComments'
import UrlError from './components/UrlError'
import UserContext from './contexts/User'
import './App.css'

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState('jessjelly')

  return (
    <UserContext.Provider value={userLoggedIn}>
      <NavBar/>
      <Routes>
        <Route path ='/' element={<Homepage/>}> </Route>
        <Route path ='/articles' element={<Articles/>}> </Route>
        <Route path ='/articles/topics/:topic' element={<Articles/>}> </Route>
        <Route path ='/articles/:article_id' element={<Fragment> <SingleArticle/> <ArticleComments/> </Fragment>}> </Route>
        <Route path ='*' element={<UrlError/>}> </Route>
      </Routes>
    </UserContext.Provider>
  )
}

export default App
