import axios from "axios";
import { getCache, setCache } from "./cacheService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// ฟังก์ชันดึงข้อมูลโดยใช้ Cache
async function fetchWithCache(url) {
  const cachedData = getCache(url);
  if (cachedData) {
    console.log(`Fetching from cache: ${url}`);
    return cachedData;
  }

  try {
    const response = await axios.get(url);
    const products = response.data.products.map((product) => ({
      id: product.product_id,
      name: product.product_name,
      href: "#",
      price: `$${product.product_price}`,
      imageSrc: `data:image/png;base64,${product.product_image}`,
      imageAlt: product.product_name,
    }));

    setCache(url, products); // บันทึกลง Cache
    return products;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return [];
  }
}

// API GET ที่ใช้ Cache
export function getAllProducts() {
  return fetchWithCache(`${API_BASE_URL}/products`);
}

export function getTrendProduct() {
  return fetchWithCache(`${API_BASE_URL}/trends/products`);
}

// ตัวอย่างถ้าเป็น API Method POST จะไม่เก็บ Cache
// export async function createProduct(data) {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/products`, data);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating product:", error);
//     return null;
//   }
// }