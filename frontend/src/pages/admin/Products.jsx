import { useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../../components/homePage/NavBar";
import Footer from "../../components/homePage/Footer";
import "../../styles/homepage/products.css";
import axios from "axios";

function Products() {
  const { token, user, isLoggedIn, role } = useSelector((state) => state.auth);


  const [productsData, setProductsData] = useState({
    productId: "",
    category: "",
    color: "",
    gender: "",
    imageLink: "",
    name: "",
    pocket: "",
    price: "",
    rating: "",
  });

  const handleProductsChange = (e) => {
    setProductsData({ ...productsData, [e.target.name]: e.target.value });
  };
  const handleProductsForm = (e) => {
    e.preventDefault();
    try {
      axios.post(
        "http://localhost:9090/collections/admin/add-products",
        productsData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setProductsData({
        productId: "",
        category: "",
        color: "",
        gender: "",
        imageLink: "",
        name: "",
        pocket: "",
        price: "",
        rating: "",
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <NavBar />
      <div className="products-form">
        <form onSubmit={handleProductsForm} className="product">
          <h1 className="text-3xl">Add Product</h1>
          <div className="input-section">
            <div className="left">
              <div className="label-input name">
                <label htmlFor="name">name</label>
                <input
                  type="text"
                  id="name"
                  value={productsData.name}
                  name="name"
                  placeholder="Enter product name"
                  onChange={handleProductsChange}
                />
              </div>
              <div className="label-input category">
                <label htmlFor="category">catergory</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Enter catergory ( Ecoflex Or Classic )"
                  value={productsData.category}
                  onChange={handleProductsChange}
                />
              </div>
              <div className="label-input color">
                <label htmlFor="color">color</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  placeholder="Enter color"
                  value={productsData.color}
                  onChange={handleProductsChange}
                />
              </div>
              <div className="label-input gender">
                <label htmlFor="gender">gender</label>
                <input
                  type="gender"
                  name="gender"
                  id="gender"
                  placeholder="Enter gender"
                  value={productsData.gender}
                  onChange={handleProductsChange}
                />
              </div>
              <div className="label-input pocket">
                <label htmlFor="pocket">pocket</label>
                <input
                  type="text"
                  id="pocket"
                  value={productsData.pocket}
                  name="pocket"
                  placeholder="Enter your pocket"
                  onChange={handleProductsChange}
                />
              </div>
              <div className="label-input price">
                <label htmlFor="price">price</label>
                <input
                  type="text"
                  id="price"
                  value={productsData.price}
                  name="price"
                  placeholder="Enter price"
                  onChange={handleProductsChange}
                />
              </div>
              <div className="label-input rating">
                <label htmlFor="rating">rating</label>
                <input
                  type="text"
                  id="rating"
                  value={productsData.rating}
                  name="rating"
                  placeholder="Enter rating"
                  onChange={handleProductsChange}
                />
              </div>
            </div>
            <div className="right">
              <div className="label-input imagelink">
                <label htmlFor="imagelink">Select Image</label>
                <input
                  type="file"
                  id="imagelink"
                  name="imagelink"
                  // autocomplete="new-imagelink"
                  placeholder="Enter your imageLink"
                  value={productsData.imageLink}
                  onChange={handleProductsChange}
                />
              </div>
              <button className="register-btn" type="submit">
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Products;
