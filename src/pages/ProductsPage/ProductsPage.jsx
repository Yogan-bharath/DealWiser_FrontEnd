import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./ProductsPage.css";

export default function ProductsPage() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const loadProducts = async () => {

    const res = await axiosInstance.get("/admin/products");

    setProducts(res.data.products);
  };

  const deleteProduct = async (id) => {

    await axiosInstance.delete(`/admin/product/${id}`);

    setProducts(products.filter(p => p._id !== id));
  };

  const toggleBestDeal = async (id) => {

    await axiosInstance.patch(`/admin/best-deal/${id}`);

    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="products-wrapper">

      <div className="products-header">

        <div>
          <h1>Products</h1>
          <p>
            Manage your inventory and curated deals across the platform.
          </p>
        </div>

        <button
          className="add-product-btn"
          onClick={() => navigate("/admin/add-product")}
        >
          Add New Item
        </button>

      </div>


      <div className="products-table">

        <div className="table-head">
          <span>Preview</span>
          <span>Product Details</span>
          <span>Featured State</span>
          <span>Actions</span>
        </div>


        {products.map(product => (

          <div className="table-row" key={product._id}>

            <div className="preview">
              <img src={product.image} alt={product.name} />
            </div>

            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.bestStore?.name || "Multiple Stores"}</p>
            </div>

            <div>

              <button
                className={
                  product.isBestDeal
                    ? "best-deal-active"
                    : "best-deal-btn"
                }
                onClick={() =>
                  toggleBestDeal(product._id)
                }
              >
                {product.isBestDeal
                  ? "✓ Best Deal"
                  : "Make Best Deal"}
              </button>

            </div>

            <div>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteProduct(product._id)
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}