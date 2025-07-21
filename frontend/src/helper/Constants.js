export   const DATABASE_ORIGIN = process.env.REACT_APP_DATABASE_ORIGIN;
export const  ENDPOINTS={
    addProducts:`${DATABASE_ORIGIN}/collections/admin/add-products`,
    login: `${DATABASE_ORIGIN}/collections/login`,
    products:  `${DATABASE_ORIGIN}/collections/products`,
    register:`${DATABASE_ORIGIN}/collections/register`,
}