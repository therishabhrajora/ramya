import React, { useEffect, useState } from 'react';
import { User, ShoppingBag, ShoppingCart, MapPin, Settings, LogOut, ChevronRight, Menu, Pen, Delete } from 'lucide-react';
import '../style/profile/accountPage.css';
import NavBar from '../components/page/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, clearCart } from '../slices/ProductSlice';
import { deleteAddress, addAddress } from '../slices/AddressSlice';
import { logout } from '../slices/AuthSlice';
import apiClient from '../app/AppClient';
import { ENDPOINTS } from '../services/Constants';

export default function AccountPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("profile"));
  
  
  
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const cartItems = useSelector((state) => state.product.cartProducts);
  const addresses = useSelector((state) => state.address.addresses);


  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const tax = Math.round(subtotal * 0.06);
  const delivery = 0;
  const shipping = 7;
  const total = subtotal + tax + delivery;

  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return toast.success("You are not login, Please login first");
    }


    navigate("/collections/checkout", {
      state: {
        summary: {
          products: cartItems,
          subtotal: subtotal,
          tax: tax,
          total: total,
          shipping: shipping
        }
      }
    });
  }

  const handleUpdate = (addr) => {
    navigate(`/address`, { state: { address: addr } });
  }
  const handleDelete = async (addr) => {
    dispatch(deleteAddress(addr));
    await apiClient.delete(ENDPOINTS.deleteAddress(addr.id));
  }



  // Mock Data
  const orders = [
    { id: '#ORD-9482', date: 'Feb 15, 2026', total: '$129.00', status: 'Delivered' },
    { id: '#ORD-8371', date: 'Jan 10, 2026', total: '$45.50', status: 'Shipped' }
  ];

  const menuItems = [
    { id: 'profile', label: 'Profile Info', icon: User },
    { id: 'orders', label: 'Order History', icon: ShoppingBag },
    { id: 'cart', label: 'My Cart', icon: ShoppingCart },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  const handleTabSelect = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false); // Auto-close drawer on mobile selection
  };

  const logoutUser = () => {
    dispatch(logout())
    navigate("/logout")
  }




  return (
    <>
      <NavBar />
      <div className="account-container">
        {/* Header Banner with Responsive Mobile Toggle */}
        <div className="account-header-main">
          <h1 className="account-title">My Account</h1>
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <Menu />
          </button>
        </div>

        <div className="account-layout">
          {/* Sidebar Dropdown Container / Drawer overlay */}
          <div className={`account-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
              <div className="avatar-circle">{user.firstName.charAt(0).toUpperCase()}</div>
              <div>
                <h2 className="user-name">{user.firstName.toUpperCase() + user.lastName.toUpperCase()}</h2>
                <p className="user-role">{role.slice(5)}</p>
              </div>
            </div>

            <nav className="sidebar-nav">
              <ul className="profile-list">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.id}
                      onClick={() => handleTabSelect(item.id)}
                      className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
                    >
                      <div className="nav-btn-left">
                        <Icon className="nav-icon" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="arrow-icon" />
                    </li>
                  );
                })}
                <li className="logout-btn " onClick={logoutUser}>
                  <LogOut className="nav-icon" />
                  <span>Logout</span>
                </li>
              </ul>
            </nav>
          </div>

          {/* Dynamic Window Display panel */}
          <div className="account-content">

            {/* Profile Section */}
            {activeTab === 'profile' && (
              <div className="profile-tab-view">
                <h2 className="tab-title">Profile Information</h2>
                <div className="profile-grid">
                  <div className="info-box">
                    <p className="info-label">Full Name</p>
                    <p className="info-value">{user.firstName.toUpperCase() + " " + user.lastName.toUpperCase()}</p>
                  </div>
                  <div className="info-box">
                    <p className="info-label">Email Address</p>
                    <p className="info-value email">{user.email}</p>
                  </div>

                </div>
              </div>
            )}

            {/* Orders Section */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="tab-title">Order History</h2>
                <div className="list-stack">
                  {orders.map((order) => (
                    <div key={order.id} className="order-row">
                      <div className="row-left">
                        <p className="order-id">{order.id}</p>
                        <p className="small-text">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="bold-text">{order.total}</p>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cart Section */}
            {activeTab === 'cart' && (
              <div>
                <h2 className="tab-title">Your Cart</h2>
                <div>
                  <div className="list-stack">
                    {cartItems.map((product) => (
                      <li key={product.product_id} className="productItem">
                        <img src={product.image} alt={product.name} width="150px" />
                        <div className="productDetails">
                          <div className="productInfo">
                            <h3>{product.name}</h3>
                            <p>Price: ₹{product.price}</p>
                            <p>Color: {product.colors[0]}</p>
                            <p>Quantity: {product.quantity}</p>
                          </div>
                          <div
                            className="remove-btn"
                            onClick={() => dispatch(removeFromCart(product))}
                          >
                            <p>
                              <MdDeleteForever />
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </div>
                  <div>
                    {cartItems.length > 0 ? (
                      <div className="order-summary">
                        <h2>Order Summary</h2>

                        <div className="summary-item">
                          <span>Subtotal:</span>
                          <span>₹{subtotal}</span>
                        </div>
                        <div className="summary-item">
                          <span>Delivery:</span>
                          <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
                        </div>
                        <div className="summary-item">
                          <span>Tax:</span>
                          <span>₹{tax}</span>
                        </div>
                        <div className="summary-item total">
                          <span>Total:</span>
                          <span>₹{total}</span>
                        </div>

                        <div className="delivery-info">📦 Estimated Delivery: 3–5 Days</div>

                      </div>
                    ) : (
                      <div className='empty-cart'>
                        No item in cart
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="primary-btn checkout-btn">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}

            {/* Addresses Section */}
            {activeTab === 'addresses' && (
              <div>
                <div className="tab-header-row">
                  <h2 className="tab-title">Saved Addresses</h2>
                  <button onClick={() => navigate("/address")} className="text-link">+ Add New</button>
                </div>
                <div className="address-grid">

                  {addresses.length > 0 ? (addresses.map((addr) => (
                    <div key={addr.id} className="address-card">
                      
                      <Pen className="update-pen" onClick={() => handleUpdate(addr)} />
                      <Delete className="delete-pen" onClick={() => handleDelete(addr)} />
                      <span className="address-badge">{addr.fullName}</span>
                      <p className="address-street">{addr.street}</p>
                      <p className="small-text">{addr.city}</p>

                    </div>
                  ))) : (
                    <div className='not-found'>no address found</div>
                  )}
                </div>
              </div>
            )}

            {/* Settings Section */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="tab-title">Account Settings</h2>
                <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    <label className="form-label">Update Password</label>
                    <input type="password" placeholder="Current Password" className="form-input" />
                    <input type="password" placeholder="New Password" className="form-input" />
                  </div>
                  <button type="submit" className="dark-btn">
                    Save Changes
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
