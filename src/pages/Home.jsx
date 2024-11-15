import React from 'react'
import Hero from '../component/Hero'
import About from '../component/About'
import Menu from '../component/Menu'
import Faq from '../component/Faq'
import Testimonial from '../component/Testimonial'

const Home = () => {
  return (
    <div>
      <About/>
      <Menu/>
      <Faq/>
      <Testimonial/>
    </div>
  )
}

export default Home
