import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useLocation } from 'react-router-dom';

function ProductList() {
  const location = useLocation();
  const { category } = location.state || {}; // Get category from navigation state

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:7000/api/client/productsbycategory");
        if (data.success && Array.isArray(data.categories)) {
          const categoryData = data.categories.find(cat => cat.category === category);
          if (categoryData) {
            setProducts(categoryData.products);
          } else {
            setProducts([]);
          }
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };

    if (category) {
      fetchCategoryProducts();
    }
  }, [category]);

  return (
    <div>
      <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-800 my-8">
        🎂 {category ? `${category} Products` : 'Birthday Wish List'}
      </h1>

      <div className="container border bg-white border-none m-auto !my-8 py-8">
        <div className="items flex gap-5 flex-wrap justify-center">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="productItem bg-white mb-4 rounded overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="imgWrapper w-full h-[300px] sm:h-[280px] overflow-hidden pb-2">
                  <img
                    src={product?.images?.[0]?.url || "/default-image.jpg"}
                    alt={product?.images?.[0]?.altText || product?.title}
                    className="w-full h-full object-cover duration-300 group-hover:scale-105 transition-all"
                  />
                </div>

                <div className="info pb-4 px-2 text-center">
                  <h3 className="text-gray-700 !text-[13px] md:text-base font-semibold p-1">
                    {product.title}
                  </h3>
                  <h2 className="text-gray-900 !text-[14px] md:text-lg font-semibold">
                    ₹{product.price}
                  </h2>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No products found for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
