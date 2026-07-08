import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Star, ShieldCheck, Truck, RotateCcw, Sun, Moon, ArrowLeft } from 'lucide-react';
import '../style/page/productDetail.css';
import { useParams } from 'react-router-dom';
import NavBar from '../components/page/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/ProductSlice';


export default function ProductDetailPage({ onGoBack, onBuyNow }) {
  const { c, id } = useParams();
  const dispatch = useDispatch();
  const product=useSelector((state)=>state.product.products).filter((p)=>p.productId===id)[0];
  const [theme, setTheme] = useState('light');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Space Gray');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleQuantityChange = (type) => {
    if (type === 'inc') setQuantity(prev => prev + 1);
    if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
  };

  return (
    <>
      <NavBar />
      <div className="account-container">
        {/* Header Banner */}
        {/* <div className="account-header-main">
          <button className="back-btn-text" onClick={onGoBack}>
            <ArrowLeft className="nav-icon" /> <span>Back to Catalog</span>
          </button>
          <div className="header-actions">
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'light' ? <Moon className="nav-icon" /> : <Sun className="nav-icon" />}
            </button>
          </div>
        </div> */}
        <div className="product-layout grid-2-col section-fade">
          {/* Left Grid Row: Image Gallery system */}
          <div className="product-media-gallery">
            <div className="main-preview-card">
              
              <img src={product.images[0]} alt={product.title} className="gallery-primary-img" />
              <button
                className={`wishlist-floating-btn ${isWishlisted ? 'liked' : ''}`}
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label="Add to Wishlist"
              >
                <Heart className="wishlist-icon" />
              </button>
            </div>
            <div className="thumbnails-wrapper-row">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`thumb-card-btn ${activeImage === idx ? 'selected' : ''}`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Grid Row: Informational Details and CTAs */}
          <div className="product-details-content">
            <span className="product-badge-accent">Trending</span>
            <h1 className="product-main-title">{product.name}</h1>
            <p className="product-tagline-text">{product.tagline}</p>

            {/* Ratings Overview */}
            <div className="ratings-summary-row">
              <div className="rating-pill">
                <Star className="star-icon-filled" />
                <span>{product.rating}</span>
              </div>
              <span className="small-text reviews-count">{product.reviewsCount} Ratings & Verified Reviews</span>
            </div>

            {/* Pricing Box Panel */}
            <div className="price-structure-card">
              <span className="price-tag-large">${product.price}</span>
              <span className="original-price-strike">${product.originalPrice}</span>
              <span className="discount-tag-percent">{product.discount}</span>
            </div>

            {/* Variant Variant Selection 1: Color */}
            <div className="variant-selection-section">
              <label className="form-label">Color: <span className="selected-meta-txt">{selectedColor}</span></label>
              <div className="color-swatch-flex">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`color-chip-btn ${selectedColor === color ? 'active' : ''}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Variant Selection 2: Size */}
            <div className="variant-selection-section">
              <label className="form-label">Size: <span className="selected-meta-txt">{selectedSize}</span></label>
              <div className="size-selector-row">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`size-square-btn ${selectedSize === size ? 'active' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Step Incrementer Quantity Selector */}
            <div className="variant-selection-section quantity-block-wrapper">
              <label className="form-label">Quantity</label>
              <div className="stepper-control-box">
                <button onClick={() => handleQuantityChange('dec')} className="stepper-trigger-btn">-</button>
                <span className="stepper-value-text">{quantity}</span>
                <button onClick={() => handleQuantityChange('inc')} className="stepper-trigger-btn">+</button>
              </div>
            </div>

            {/* Primary Action Button Cluster */}
            <div className="product-actions-btn-group">
              <button
                onClick={() => dispatch(addToCart({ ...product, quantity, selectedColor, selectedSize }))}
                className="secondary-outline-btn action-cta-flex"
              >
                <ShoppingCart className="nav-icon" />
                <span>Add to Cart</span>
              </button>
              

              <button
                onClick={() => onBuyNow({ ...product, quantity, selectedColor, selectedSize })}
                className="primary-btn action-cta-flex"
              >
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
