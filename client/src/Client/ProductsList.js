import React, { useEffect, useState } from 'react'
import './ProductList.css'
import ProductCard from './ProductCard'

const HomeProducts = ({ handleAmountChange, meatType, setMeatType }) => {
    const [noProductsCheck, setNoProductsCheck] = useState(false);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
<<<<<<< HEAD
                const baseUrl = process.env.REACT_APP_PRODUCTS_CALL_API;
                /* const baseUrl = 'https://expert-fortnight-7v7xpprp4g4fwxr4-3500.app.github.dev/products/' */
                console.log(baseUrl);
=======
                /* const baseUrl = 'http://localhost:3500/products/' */
                const baseUrl = 'https://expert-fortnight-7v7xpprp4g4fwxr4-3500.app.github.dev/products/'
>>>>>>> 4b1889594d2ae8a994a4f9ad5cdfd95be543a19e
                const url = baseUrl + meatType;
                console.log(url);

                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error('Network response was not ok')
                }

                if (res.status === 204) {
                    setNoProductsCheck(true);
                } else {
                    const productsData = await res.json();
                    setProducts(productsData);
                    setNoProductsCheck(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [meatType]);
    if (noProductsCheck) {
        return (
            <h2 style={{ textAlign: 'center', marginTop: '25vh' }}>Nema proizvoda!</h2>
        )
    } else {
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
    }
};

export default HomeProducts;