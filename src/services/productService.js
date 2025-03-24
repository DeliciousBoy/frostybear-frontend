import axios from "axios";
import { getCache, setCache } from "./cacheService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// ฟังก์ชันดึงข้อมูลโดยใช้ Cache
// productService.js
async function fetchWithCache(url, params = {}, forceRefresh = false) {
  console.log("Fetching data from:", url);
  console.log("Sending params:", params);

  // สร้าง key สำหรับ Cache โดยรวม url และ params
  const cacheKey = `${url}-${JSON.stringify(params)}`;
  
  // ถ้าไม่ forceRefresh ให้ลองดึงจาก cache ก่อน
  if (!forceRefresh) {
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      console.log(`Fetching from cache: ${cacheKey}`);
      return cachedData;
    }
  }

  try {
    // ใช้ axios.get และส่ง params ผ่าน query string
    const response = await axios.get(url, { params });
    const products = response.data.products.map((product) => ({
      id: product.product_id,
      name: product.product_name,
      detail: product.product_detail,
      brand_name: product.brand.brand_name,
      product_type: product.pdt.product_type_name,
      href: "#",
      price: `${product.product_price}`,
      imageSrc: `data:image/png;base64,${product.product_image}`,
      imageAlt: product.product_name,
    }));

    // บันทึกข้อมูลลง cache เฉพาะเมื่อไม่ได้ force refresh
    setCache(cacheKey, products);
    return products;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return [];
  }
}

// API GET ที่ใช้ Cache พร้อมรองรับ forceRefresh
export async function getAllProducts(filters = {}, forceRefresh = false) {
  const url = `${API_BASE_URL}/products`;

  // ถ้า product_type_name เป็น array ว่างหรือ null ให้ลบ key ออกจาก filters
  if (
    filters.product_type_name === null ||
    (Array.isArray(filters.product_type_name) && filters.product_type_name.length === 0)
  ) {
    delete filters.product_type_name;
  }

  return fetchWithCache(url, filters, forceRefresh);
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