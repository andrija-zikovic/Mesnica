import React, { useEffect, useState } from 'react'

const AdminProducts = () => {
    const [adminPro, setAdminPro] = useState([]);
    const [showImage, setShowImage] = useState([]); // Use an array to track image visibility for each row

    const handleClick = (index) => {
        const initialShowImage = Array(adminPro.length).fill(false);
        setShowImage(initialShowImage);
        // Toggle the visibility of the image for the clicked row
        const newShowImage = [...showImage]; // Create a copy of the array
        newShowImage[index] = !newShowImage[index]; // Toggle the value for the clicked row
        setShowImage(newShowImage); // Update the state
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
<<<<<<< HEAD
                const res = await fetch(process.env.REACT_APP_ADMIN_PRODUCTS_CALL_API)
                /* const res = await fetch("https://expert-fortnight-7v7xpprp4g4fwxr4-3500.app.github.dev/admin/products") */
=======
                /* const res = await fetch("http://localhost:3500/admin/products") */
                const res = await fetch("https://expert-fortnight-7v7xpprp4g4fwxr4-3500.app.github.dev/admin/products")
>>>>>>> 4b1889594d2ae8a994a4f9ad5cdfd95be543a19e
                if (!res.ok) {
                    throw new Error('Network response was not ok')
                } else {
                    const productsData = await res.json();
                    setAdminPro(productsData);
                }
            } catch (error) {
                console.error('Error Fetching data:', error);
            }
        };

        fetchData();
    }, [adminPro]);

    return (
        <div className="adminPro">
            <table className="adminPro__table">
                <thead className="adminPro__thead">
                    <tr>
                        <th>Num</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Meat</th>
                        <th>Price/kg</th>
                        <th>On Storage</th>
                        <th>IMG</th>
                    </tr>
                </thead>
                <tbody className="adminPro__tbody">
                    {adminPro.map((product, index) => (
                        <tr key={product._id}>
                            <td>{index + 1}</td>
                            <td className='tdScroll'>
                                <div className='scrollCon'>{product._id}</div>
                            </td>
                            <td>{product.title}</td>
                            <td>{product.meatType}</td>
                            <td>{product.price}</td>
                            <td>{product.onStorage}</td>
                            <td><button onClick={() => handleClick(index)}>Toggle Img</button>
                                {showImage[index] && (
                                    <img
                                        className='adminProImg'
                                        src={product.imgSrc}
                                        alt={product.name}
                                    />
                                )}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot className="adminPro__tfoot">
                    <tr>
                        <td colSpan={7}>Data</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default AdminProducts