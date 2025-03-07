import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export async function getAllProducts() {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data.products.map((product) => ({
      id: product.product_id,
      name: product.product_name,
      href: "#",
      price: `$${product.product_price}`,
      imageSrc: `data:image/png;base64,${product.product_image}`,
      imageAlt: product.product_name,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}