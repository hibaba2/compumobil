import React, { useState, useEffect } from "react";
import { getProducts } from "../services/fakestoreservice"; 
import Loading from "./loading"; 
import Error from "./error"; 
import ProductComponent from "./product"; 


interface Product {
    image: string;
    title: string;
    price: number;
    description: string;
    category: string;
    rating: {
        rate: number;
        count: number;
    };
}



const ProductsList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        setLoading(true);
        getProducts()
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log('Error:', error);
                setError(true);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    var sortedProducts: any[] = [];

    sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === "asc") {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });

    return (
        <div>
            <button onClick={toggleSortOrder}>
                {sortOrder === "asc" ? "De mayor a menor" : "De menor a mayor"}
            </button>
            <ul>
                {sortedProducts.map((product) => (
                    <ProductComponent
                        key={product.id}
                        image={product.image}
                        title={product.title}
                        price={product.price}
                        description={product.description}
                        category={product.category}
                        rating={product.rating}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ProductsList;
