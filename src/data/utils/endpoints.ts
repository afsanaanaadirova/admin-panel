export const endpoints = {
    posts: (query: string = "") => `/posts${query}`,
    post: (id: number) => `/posts/${id}`,
    products: (query: string = '') => `products?${query}`,
    product: (id: number) => `/products/${id}`,
    categories: (query: string = "") => `categories/${query}`,
    category: (id: number) => `/categories/${id}`,
    // category: (id: number) => `/categories/${id}?_expand=product`,
}

