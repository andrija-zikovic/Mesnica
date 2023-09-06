import React from 'react'
import Hero from './Hero'
import ProductsList from './ProductsList'
import About from './About'
import './Home.css'

const Home = () => {
  return (
    <main className='home'>
      <Hero/>
      <h2 className='prducts-list__h2'>Top Sellers</h2 >
      <ProductsList/>
      <About/>
    </main>
  )
}

export default Home