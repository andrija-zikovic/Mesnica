import React from 'react'
import Hero from './Hero'
import ProductsList from './ProductsList'
import About from './About'
import './Home.css'

const Home = ({ handleAmountChange }) => {

  return (
    <main className='home'>
      <Hero />
      <h2 className='prducts-list__h2'>Top Sellers</h2 >
      <ProductsList handleAmountChange={handleAmountChange} meatType={''} host={'home'} />
      <About />
    </main>
  )

}

export default Home