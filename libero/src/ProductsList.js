import React from 'react'
import './ProductList.css'
import ProductCard from './ProductCard'

const HomeProducts = ({ handleAmountChange}) => {
    const products = {
        "produts": [
            {
                "id": 1,
                "title": "Svinjska lopatica",
                "price": 9.99,
                "src": "img/Svinjska-Lopatica600x400.jpg",
            },
            {
                "id": 2,
                "title": "Pileca prsa",
                "price": 6.99,
                "src": "img/Pileca-Prsa600x400.jpg",
            },
            {
                "id": 3,
                "title": "Čevapčići",
                "price": 7.99,
                "src": "img/Cevapi600x400.jpg",
            },
            {
                "id": 4,
                "title": "Pljeskavica",
                "price": 7.99,
                "src": "img/Pljeskavica600x400.jpg",
            }
        ]
    }

    
    return (
        <>
            <section className='products-list'>
                {products.produts.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        src={product.src}
                        title={product.title}
                        price={product.price}
                        handleAmountChange={handleAmountChange} 
                    />
                ))}
            </section>
        </>
    )
}

export default HomeProducts