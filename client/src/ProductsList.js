import React, { useEffect, useState } from 'react'
import './ProductList.css'
import ProductCard from './ProductCard'

const HomeProducts = ({ handleAmountChange, meatType, setMeatType }) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseUrl = 'http://localhost:3500/products/'
                const url = baseUrl + meatType;

                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error('Network response was not ok')
                }

                const productsData = await res.json();
                setProducts(productsData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [meatType]);

    return (
        <>
            <section className='products-list'>
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        id={product._id}
                        src={product.imgSrc}
                        title={product.title}
                        price={product.price}
                        handleAmountChange={handleAmountChange}
                    />
                ))}
            </section>
        </>
    )
};

export default HomeProducts;