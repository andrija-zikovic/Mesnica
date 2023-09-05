import React from 'react'
import Hero from './Hero'
import ProductsList from './ProductsList'
import About from './About'

const Home = () => {
  return (
    <main className='home'>
      <Hero/>
      <ProductsList/>
      <About/>
    </main>
  )
}

export default Home