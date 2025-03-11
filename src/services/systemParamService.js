import axios from "axios";
import { getCache, setCache } from "./cacheService"; // สมมติว่าคุณมี cacheService ที่จัดการการเก็บข้อมูล

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"; // ปรับเส้นทางให้ถูกต้อง

// ฟังก์ชันสำหรับเรียกข้อมูล `brands`
async function getBrandsWithCache() {
    const cacheKey = "system_param_brands";
    let cachedData = getCache(cacheKey);

    if (cachedData) {
        console.log("Using cached data for brands");
        return cachedData;
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/systemparam`, {
            params: { byte_reference: "brands" }, // ส่งพารามิเตอร์ brands
        });

        setCache(cacheKey, response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching brands:", error);
        throw error;
    }
}

// ฟังก์ชันสำหรับเรียกข้อมูล `product_types`
async function getProductTypesWithCache() {
    const cacheKey = "system_param_product_types";
    let cachedData = getCache(cacheKey);

    if (cachedData) {
        console.log("Using cached data for product_types");
        return cachedData;
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/systemparam`, {
            params: { byte_reference: "product_types" }, // ส่งพารามิเตอร์ product_types
        });

        setCache(cacheKey, response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching product_types:", error);
        throw error;
    }
}

export { getBrandsWithCache, getProductTypesWithCache };
