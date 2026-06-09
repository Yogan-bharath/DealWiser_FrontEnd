import { useContext } from "react";

import { WishlistContext }
from "../../Context/WishlistContext";

import ProductCard
from "../../Components/ProductList/ProductCard";
import Navbar from "../../Components/Navbar/Navbar";


export default function WishlistPage() {

  const { wishlist } =
    useContext(WishlistContext);
console.log(wishlist);

  return (

    <section className="product-section">
      <Navbar/>
      <h2 className="section-title">
        Your Wishlist
      </h2>

      <div className="product-grid">

        {wishlist.map(product => (

          <ProductCard
            key={product.productId}
            product={product}
          />

        ))}

      </div>

    </section>

  );

}