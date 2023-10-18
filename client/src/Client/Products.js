import React, { useState } from 'react'
import SideNav from './SideNav'
import ProductList from './ProductsList'
import './Products.css'

const Products = ({ handleAmountChange, amount, setAmount }) => {
  const [meatType, setMeatType] = useState('');
  return (
    <main className='products'>
      <SideNav setMeatType={setMeatType}/>
      <ProductList handleAmountChange={handleAmountChange} amount={amount} setAmount={setAmount} meatType={meatType} setMeatType={setMeatType} host={''} />
    </main>
  )
}

export default Products