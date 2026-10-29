import Header   from './components/Header'
import Hero     from './components/Hero'
import DataShowcase from './components/DataShowcase'
import About    from './components/About'
import Skills   from './components/Skills'
import Projects from './components/Projects'
import Parcours from './components/Parcours'
import Contact  from './components/Contact'
import Footer   from './components/Footer'
import Contours from './components/Contours'

export default function App() {
  return (
    <>
      <Contours />
      <Header />
      <main>
        <Hero />
        <DataShowcase />
        <About />
        <Skills />
        <Projects />
        <Parcours />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
