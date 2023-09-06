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
            },
            {
                "id": 5,
                "title": "Svinjska lopatica",
                "price": "10 € / kg",
                "src": "img/Svinjska-Lopatica600x400.jpg",
            },
            {
                "id": 6,
                "title": "Pileca prsa",
                "price": "10 € / kg",
                "src": "img/Pileca-Prsa600x400.jpg",
            },
            {
                "id": 7,
                "title": "Čevapčići",
                "price": "10 € / kg",
                "src": "img/Cevapi600x400.jpg",
            },
            {
                "id": 8,
                "title": "Pljeskavica",
                "price": "10 € / kg",
                "src": "img/Pljeskavica600x400.jpg",
            },
            {
                "id": 9,
                "title": "Svinjska lopatica",
                "price": "10 € / kg",
                "src": "img/Svinjska-Lopatica600x400.jpg",
            },
            {
                "id": 10,
                "title": "Pileca prsa",
                "price": "10 € / kg",
                "src": "img/Pileca-Prsa600x400.jpg",
            },
            {
                "id": 11,
                "title": "Čevapčići",
                "price": "10 € / kg",
                "src": "img/Cevapi600x400.jpg",
            },
            {
                "id": 12,
                "title": "Pljeskavica",
                "price": "10 € / kg",
                "src": "img/Pljeskavica600x400.jpg",
            },
            {
                "id": 13,
                "title": "Svinjska lopatica",
                "price": "10 € / kg",
                "src": "img/Svinjska-Lopatica600x400.jpg",
            },
            {
                "id": 14,
                "title": "Pileca prsa",
                "price": "10 € / kg",
                "src": "img/Pileca-Prsa600x400.jpg",
            },
            {
                "id": 15,
                "title": "Čevapčići",
                "price": "10 € / kg",
                "src": "img/Cevapi600x400.jpg",
            },
            {
                "id": 16,
                "title": "Pljeskavica",
                "price": "10 € / kg",
                "src": "img/Pljeskavica600x400.jpg",
            },
            {
                "id": 17,
                "title": "Svinjska lopatica",
                "price": "10 € / kg",
                "src": "img/Svinjska-Lopatica600x400.jpg",
            },
            {
                "id": 18,
                "title": "Pileca prsa",
                "price": "10 € / kg",
                "src": "img/Pileca-Prsa600x400.jpg",
            },
            {
                "id": 19,
                "title": "Čevapčići",
                "price": "10 € / kg",
                "src": "img/Cevapi600x400.jpg",
            },
            {
                "id": 20,
                "title": "Pljeskavica",
                "price": "10 € / kg",
                "src": "img/Pljeskavica600x400.jpg",
            },
            {
                "id": 21,
                "title": "Svinjska lopatica",
                "price": "10 € / kg",
                "src": "img/Svinjska-Lopatica600x400.jpg",
            },
            {
                "id": 22,
                "title": "Pileca prsa",
                "price": "10 € / kg",
                "src": "img/Pileca-Prsa600x400.jpg",
            },
            {
                "id": 23,
                "title": "Čevapčići",
                "price": "10 € / kg",
                "src": "img/Cevapi600x400.jpg",
            },
            {
                "id": 24,
                "title": "Pljeskavica",
                "price": "10 € / kg",
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
                    />
                ))}
            </section>
        </>
    )
}

export default HomeProducts