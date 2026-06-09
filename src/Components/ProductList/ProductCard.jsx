import React from "react";
import "./ProductList.css";
import { useContext } from "react";
import { WishlistContext } from "../../Context/WishlistContext";

const ProductCard = ({ product }) => {
const {
  addToWishlist,
  removeFromWishlist,
  isInWishlist
} = useContext(WishlistContext);

const liked = isInWishlist(product.productId);
const bestPrice = Math.min(...product.prices.map(p => p.price));

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} />

        <div
        className="wishlist-btn"
          onClick={() =>
          liked
            ? removeFromWishlist(product.productId)
            : addToWishlist(product)
        }
      >
        {liked ? "💚" : "🤍"}
      </div>
      </div>

      <h3 className="product-title">{product.name}</h3>

      <div className="price-list">

        {product.prices.map((store, index) => (
          <div key={index} className="store-row">

            <span>{store.name}</span>

            <section>
                <span className={store.price === bestPrice ? "best-price" : ""}>
                 ₹{store.price.toFixed(2)}
                </span>

                {store.price === bestPrice && (
                  <span className="best-deal-tag">Best Deal</span>
                )}
            </section>
          </div>

        ))}

      </div>

      <a
        href={product.bestStore?.link || product.link}
        target="_blank"
        rel="noreferrer"
        className="go-to-btn"
      >
        Go to
        <span>↗</span>
      </a>

    </div>
  );
};

export default ProductCard;