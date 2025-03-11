// src/services/cacheService.js
const cache = new Map();

// รายการ API ที่ต้องการให้ Cache
const cacheablePaths = ["/products", "/trends/products", '/systemparam'];

// ฟังก์ชันเช็คว่า URL ควรใช้ Cache หรือไม่
function isCacheable(url) {
  return cacheablePaths.some((path) => url.includes(path));
}

// ดึงข้อมูลจาก Cache
export function getCache(url) {
  return cache.get(url);
}

// บันทึกข้อมูลลง Cache
export function setCache(url, data) {
  if (isCacheable(url)) {
    cache.set(url, data);
  }
}

// ล้าง Cache ทั้งหมด
export function clearCache() {
  cache.clear();
}

// ล้าง Cache เฉพาะ URL
export function removeCache(url) {
  cache.delete(url);
}