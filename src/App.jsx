import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Homepage from './components/Homepage'
import Articles from './components/Articles'
import SingleArticle from './components/SingleArticle'
import './App.css'

function App() {

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path ='/' element={<Homepage/>}> </Route>
        <Route path ='/articles' element={<Articles/>}> </Route>
        <Route path ='/articles/:article_id' element={<SingleArticle/>}> </Route>
      </Routes>
    </div>
  )
}

export default App
