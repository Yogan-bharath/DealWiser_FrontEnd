import { useRef, useState } from "react";
import axiosInstance from "../../api/axios";
import "./AddProductPage.css";
import Navbar from "../../Components/Navbar/Navbar";
import toast from "react-hot-toast";

export default function AddProductPage() {

  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [name, setName] = useState("");

  const [stores, setStores] = useState([
    { name: "", price: "" }
  ]);

  const [bestLink, setBestLink] = useState("");

  const handleImageSelect = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    const imagePreview = URL.createObjectURL(file);
    setPreview(imagePreview);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const addStore = () => {
    setStores([...stores, { name: "", price: "" }]);
  };

  const updateStore = (index, field, value) => {

    const updated = [...stores];
    updated[index][field] = value;

    setStores(updated);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("image", image);
    formData.append("name", name);

    formData.append(
      "stores",
      JSON.stringify(stores)
    );

    formData.append(
      "bestStore",
      JSON.stringify({ link: bestLink })
    );

    await axiosInstance.post("/admin/product", formData);

    toast.success("Product added successfully")

    setPreview(null);
    setImage(null);
    setName("");
    setStores([{ name: "", price: "" }]);
    setBestLink("");
  };

  return (
    <div className="add-product-wrapper">
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit} className="product-form">

        {/* Upload Box */}

        <div
          className="upload-box"
          onClick={handleUploadClick}
        >
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="preview-image"
            />
          ) : (
            <>
              <p>Upload image</p>
              <span>Supports JPG, PNG</span>
            </>
          )}

          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={handleImageSelect}
          />
        </div>

        {/* Product Name */}

        <input
          className="input-field"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Stores */}

        <h3>Retailer Prices</h3>

        {stores.map((store, i) => (
          <div key={i} className="store-row">

            <input
              className="input-field"
              placeholder="Store name"
              value={store.name}
              onChange={(e) =>
                updateStore(i, "name", e.target.value)
              }
            />

            <input
              className="input-field"
              placeholder="Price"
              value={store.price}
              onChange={(e) =>
                updateStore(i, "price", e.target.value)
              }
            />

          </div>
        ))}

        <button
          type="button"
          className="secondary-btn"
          onClick={addStore}
        >
          Add Store
        </button>

        {/* Best Deal Link */}

        <input
          className="input-field"
          placeholder="Best Deal Store Link"
          value={bestLink}
          onChange={(e) => setBestLink(e.target.value)}
        />

        {/* Submit */}

        <button className="submit-btn">
          Add Product →
        </button>

      </form>

    </div>
  );
}