import { useEffect } from 'react'

import Header      from './components/Header'
import Hero        from './components/Hero'
import About       from './components/About'
import Skills      from './components/Skills'
import Projects    from './components/Projects'
import Learning    from './components/Learning'
import Experiences from './components/Experiences'
import Contact     from './components/Contact'
import Footer      from './components/Footer'

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Learning />
      <Experiences />
      <Contact />
      <Footer />
    </>
  )
}
