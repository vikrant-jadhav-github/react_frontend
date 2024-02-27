import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Shortneurl from './components/Shortenurl'
import Authentication from './components/Authentication'
import About from './components/About'
import Home from './components/Home'
import Viewurls from './components/Viewurls'
import OpenGate from './components/OpenGate'


function App() {
  return (
    <Routes>
      <Route path="" element={<Layout/>}>

        <Route index element={<Shortneurl/>} />
        <Route path="authentication" element={<Authentication/>} />
        <Route path="authentication/:login" element={<Authentication/>} />
        <Route path="about" element={<About/>} />

        <Route path="home" element={
          <OpenGate>
            <Home/>
          </OpenGate>
        }>
          <Route index element={<Shortneurl/>} />
          <Route path="viewurls" element={<Viewurls/>} />
          <Route path="about" element={<About/>} />
        </Route>
        
      </Route>
    </Routes>
  )
}

export default App
