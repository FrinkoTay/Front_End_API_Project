import { Routes, Route } from 'react-router-dom'
import { Fragment } from 'react'
import NavBar from './components/NavBar'
import Homepage from './components/Homepage'
import Articles from './components/Articles'
import SingleArticle from './components/SingleArticle'
import ArticleComments from './components/ArticleComments'
import './App.css'

function App() {

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path ='/' element={<Homepage/>}> </Route>
        <Route path ='/articles' element={<Articles/>}> </Route>
        <Route path ='/articles/:article_id' element={<Fragment> <SingleArticle/> <ArticleComments/> </Fragment>}> </Route>
      </Routes>
    </div>
  )
}

export default App
