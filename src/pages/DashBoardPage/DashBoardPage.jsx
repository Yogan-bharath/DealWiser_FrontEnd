import React from 'react'
import './DashBoardPage.css'
import  { useRef, useState ,useEffect} from "react";
import Navbar from '../../Components/Navbar/Navbar'
import SearchBar from '../../Components/SearchBar/SearchBar';
import ProductList from "../../Components/ProductList/ProductList";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import toast from 'react-hot-toast';
import Footer from '../../Components/Footer/Footer';
const DashBoardPage = () => {

const [bestDeals, setBestDeals] = useState([]);
const [recentProducts, setRecentProducts] = useState([]);

const [searchResults, setSearchResults] = useState([]);
const [isSearching, setIsSearching] = useState(false);

const handleSearch = async (query) => {

  if (!query.trim()) {
    setIsSearching(false);
    return;
  }

  const res = await axiosInstance.get(
    `/products/search?q=${query}`
  );

  setSearchResults(res.data);
  setIsSearching(true);
};
useEffect(() => {

  const fetchData = async () => {

    const dealsRes = await axiosInstance.get(
      "/products/best-deals"
    );

    const recentRes = await axiosInstance.get(
      "/products/recent"
    );

    setBestDeals(dealsRes.data);
    setRecentProducts(recentRes.data);

    // toast.success("successfully fetched data")
    console.log("deals",dealsRes);
    console.log(recentRes);
  };

  fetchData();

}, []);



const sliderRef = useRef(null)
const [index, setIndex] = useState(0)

const nextSlide = () => {

  const totalSlides =
    sliderRef.current.children.length

  const newIndex = (index + 1) % totalSlides

  setIndex(newIndex)

  sliderRef.current.style.transform =
    `translateX(-${newIndex * 100}%)`
}

const prevSlide = () => {

  const totalSlides =
    sliderRef.current.children.length

  const newIndex =
    (index - 1 + totalSlides) % totalSlides

  setIndex(newIndex)

  sliderRef.current.style.transform =
    `translateX(-${newIndex * 100}%)`
}

  return (
    <div>
        <div className='dashboard-navbar'>
        <Navbar/>
        
        <section className='slider'>
            <section className='list' ref={sliderRef}>

{bestDeals.map((product, i) => {

  const lowestPrice = product.stores?.reduce(
      (min, s) => s.price < min ? s.price : min,
      product.stores[0]?.price || 0
    );
  const highPrice =
    product.stores?.reduce(
      (max, s) => s.price > max ? s.price : max,
      product.stores[0]?.price || 0
    );

  return (

    <section className='single-product' key={product._id}>

      <div className='silder-product'>

        <div className='best-deal'>
          <div>
            ⭐
          </div>
          <p>#{i + 1} Best Deal</p>
        </div>

        <h1 className='product-name'>
          {product.name}
        </h1>

        <div className='price'>
          <p className='og-price'>
            ₹{highPrice}
          </p>
          <p className='sale-price'>
            ₹{lowestPrice}
          </p>

        </div>

        <div className='ecommerce'>

          <p className='available-label'>
            Available at
          </p>

          <div className='seller-tags'>

            {product.stores.map(store => (

              <span
                key={store._id}
                className='seller-tag'
              >
                {store.name}
              </span>

            ))}

          </div>

        </div>

        <a
          href={product.bestStore?.link}
          target="_blank"
          className='go-to'
        >
          Go to <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
        </a>

      </div>

      <div className='product-image'>

        <img src={product.image} />

      </div>

    </section>

  );

})}

</section>
            {/* next and prev buttons */}
            <div className='buttons'>
                <button id='prev' onClick={prevSlide}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                    </div>
                </button>
                <button id='next' onClick={nextSlide}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>
                </button>
            </div>
            {/*5 bots  */}

          <ul className="dots">

  {[...Array(5)].map((_, i) => (

    <li
      key={i}
      className={i === index ? "active" : ""}
    />

  ))}

</ul>
        </section>
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />
        <ProductList
          products={
            isSearching ? searchResults : recentProducts
          }
        />
      </div>
      <Footer/>
    </div>
  )
}

export default DashBoardPage