import React from 'react'
import SideNav from './SideNav'
import ProductList from './ProductsList'
import './Products.css'

const Products = ({ handleAmountChange, amount, setAmount }) => {
  return (
    <main className='products'>
      <SideNav />
      <ProductList handleAmountChange={handleAmountChange} amount={amount} setAmount={setAmount} />
    </main>
  )
}

export default Products