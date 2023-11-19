export const endpoints = {
    products: (query: string = '') => `products?${query}`,
    product: (id: number) => `/products/${id}`,
    categories: (query: string = "") => `categories/${query}`,
    category: (id: number) => `/categories/${id}`,
}

