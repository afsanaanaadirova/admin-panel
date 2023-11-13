export const endpoints = {
    posts: (query: string = "") => `/posts${query}`,
    post: (id: number) => `/posts/${id}`,
    products: (query: string = "") => `products/${query}`,
    product: (id: number) => `/products/${id}`,
    categories: (query: string = "") => `categories/${query}`,
    filterPriceProducts: (query:string ="") => `/products?_sort=price&_order=${query}`,
    productsFilterCategory: (query:string ="") => `/products?category=${query}`,
}

