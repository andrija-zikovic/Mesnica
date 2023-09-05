import React from 'react'
import './ProductList.css'
import ProductCard from './ProductCard'

const HomeProducts = () => {
    const products = {
        "produts": [
            {
                "id": 1,
                "title": "Svinjska lopatica",
                "price": "10 € / kg",
                "src": "img/Svinjska-Lopatica600x400.jpg",
            },
            {
                "id": 2,
                "title": "Pileca prsa",
                "price": "10 € / kg",
                "src": "img/Pileca-Prsa600x400.jpg",
            },
            {
                "id": 3,
                "title": "Čevapčići",
                "price": "10 € / kg",
                "src": "img/Cevapi600x400.jpg",
            },
            {
                "id": 4,
                "title": "Pljeskavica",
                "price": "10 € / kg",
                "src": "img/Pljeskavica600x400.jpg",
            }
        ]
    }
    return (
        <>
            <h2 className='prducts-list__h2'>Top Sellers</h2 >
            <section className='products-list'>
                {products.produts.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        src={product.src}
                        title={product.title}
                        price={product.price}
                    />
                ))}
            </section>
        </>
    )
}

export default HomeProducts