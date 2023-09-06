import React from 'react'
import SideNav from './SideNav'
import ProductList from './ProductsList'
import './Products.css'

const Products = () => {
  return (
    <main className='products'>
      <SideNav />
      <ProductList />
    </main>
  )
}

export default Products