// export   const DATABASE_ORIGIN = "https://ramya-2c4k.onrender.com/"
export const DATABASE_ORIGIN = "http://localhost:9090/"
export const ENDPOINTS = {
    login: `collections/login`,
    register: `collections/register`,
    resetpassword: `collections/reset-password`,
    updateProfile: `collections/account/update-profile`,
    
    products: `collections/products`,
    productsByCategory: (category) => `collections/products/category/${category.toLowerCase()}`,
    productDetails: (id) => `collections/products/details/${id}`,

    getProductColors:`collections/products/colors`,

    addProducts: `collections/admin/add-products`,
    updateProduct: (id) => `collections/admin/update-product/${id}`,
    deleteProduct: (id) => `collections/admin/delete-product/${id}`,

    placeOrder: `orders/place`,
    getAllOrder:`orders/all`,
    trackOrder: (orderId) => `orders/track/${orderId}`,
    cancelOrder: (orderId) => `orders/cancel/${orderId}`,
    getOrderById: (id) => `orders/${id}`,

    customerOrderHistory: (email) => `/orders/customer?email=${encodeURIComponent(email)}`,
    adminAllOrders: `orders/all`,
    adminUpdateOrderStatus: (orderId) => `orders/update-status/${orderId}`,

    allAddress:`address/all`,
    addAddress:`address/add`,
    updateAddress:`address/update`,
    deleteAddress:(id)=>`address/delete/${id}`
    
}