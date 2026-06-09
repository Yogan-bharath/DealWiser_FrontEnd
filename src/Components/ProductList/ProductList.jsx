import React from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";

const ProductList = ({ products }) => {

  console.log(products);
  const formattedProducts = products.map(p => ({
    id: p._id,
    productId: p._id,
    name: p.name,
    image: p.image,
    prices: p.stores,
    bestStore:p.bestStore
  }));
  return (
    <section className="product-section">

      <h2 className="section-title">
        Recent Discoveries
      </h2>

      <div className="product-grid">

        {formattedProducts.map(product => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </section>
  );
};

export default ProductList;