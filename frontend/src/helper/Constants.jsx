export   const DATABASE_ORIGIN = process.env.DATABASE_ORIGIN;
export const  ENDPOINTS={
    addProducts:`${DATABASE_ORIGIN}/admin/add-products`,
    login: `${DATABASE_ORIGIN}/login`,
    products:  `${DATABASE_ORIGIN}/products`,
    register:`${DATABASE_ORIGIN}/register`,
}