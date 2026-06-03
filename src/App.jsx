import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'
import Report from './pages/Report'
import Intel from './pages/Intel'
import Advisory from './pages/Advisory'
import Client from './pages/Client'
import Content from './pages/Content'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/report"   element={<Report />} />
        <Route path="/intel"    element={<Intel />} />
        <Route path="/advisory" element={<Advisory />} />
        <Route path="/client"   element={<Client />} />
        <Route path="/content"  element={<Content />} />
      </Routes>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  )
}
