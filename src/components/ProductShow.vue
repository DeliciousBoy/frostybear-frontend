<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
    <div v-if="product" class="bg-white shadow-xl rounded-xl p-8 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center" style="
    margin-top: -100px;
">
      <!-- Product Image -->
      <div class="flex justify-center">
        <div class="bg-gray-50 shadow-md rounded-lg p-5 max-w-sm">
          <img 
            :src="getImageUrl(product.product_image)" 
            :alt="product.product_name" 
            class="w-full h-80 object-contain rounded-lg">
        </div>
      </div>
      
      <!-- Product Details -->
      <div>
        <h1 class="text-4xl font-bold text-gray-800">{{ product.product_name }}</h1>
        <p class="text-2xl text-pink-600 font-semibold my-2">{{ formatPrice(product.product_price) }}</p>
        <p class="text-gray-600 text-lg" v-if="product.brand">ยี่ห้อ: <span class="font-medium">{{ product.brand.brand_name }}</span></p>
        <p class="text-gray-600 text-lg" v-if="product.pdt">ประเภท: <span class="font-medium">{{ product.pdt.product_type_name }}</span></p>
        <p class="text-gray-700 mt-4">{{ product.product_detail || 'ไม่มีรายละเอียดเพิ่มเติม' }}</p>
        
        <div class="border-t border-gray-200 mt-5 pt-3">
          <p class="text-gray-500 text-sm">รหัสสินค้า: <span class="font-medium">{{ product.product_id }}</span></p>
        </div>
        
        <div class="mt-6 flex gap-4">
          <button @click.stop="animateCart(product)" :disabled="product.isBouncing"
            class="px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition-all">
            <font-awesome-icon :icon="cartIconClass" :class="{ 'fa-bounce': product.isBouncing }" />
            {{ product.isBouncing ? "กำลังเพิ่ม..." : "เพิ่มลงตะกร้า" }}
          </button>
          
          <button v-if="isAdmin" @click="editProduct(product.product_id)"
            class="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-all">
            <i class="bi bi-pencil-fill"></i> แก้ไขสินค้า
          </button>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-10">
      <div class="animate-spin rounded-full h-10 w-10 border-t-4 border-pink-500 mx-auto"></div>
      <p class="mt-3 text-gray-600">กำลังโหลดข้อมูลสินค้า...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { EventBus } from '../event-bus';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const route = useRoute();
const router = useRouter();
const product = ref(null);
const username = ref(null);
const cartId = ref(null);

const getImageUrl = (base64Data) => {
  if (!base64Data) return '/default-product.jpg';
  return base64Data.startsWith('data:image/') ? base64Data : `data:image/png;base64,${base64Data}`;
};

const formatPrice = (price) => price ? `฿${price.toLocaleString()}` : '฿0';

const getCookie = async () => {
  try {
    const token = Cookies.get('token');
    if (token) {
      const decoded = jwtDecode(token);
      username.value = decoded.username || decoded.cusId;
    }
  } catch (err) {
    console.error('Failed to decode token:', err);
  }
};

const chkCart = async () => {
  if (!username.value) return null;
  try {
    const response = await axios.post('http://localhost:3000/carts/chkcart', { username: username.value }, { withCredentials: true });
    return response.data.cartId || null;
  } catch (err) {
    console.error('Error checking cart:', err);
    return null;
  }
};

const addCart = async () => {
  try {
    const response = await axios.post('http://localhost:3000/carts/addcart', { cusId: username.value }, { withCredentials: true });
    return response.data.cartId || null;
  } catch (err) {
    console.error('Error creating cart:', err);
    return null;
  }
};

const addCartDtl = async (product) => {
  if (!product || !product.product_id || !product.product_price) {
    alert("ข้อมูลสินค้าไม่สมบูรณ์");
    return false;
  }

  const payload = {
    cartId: cartId.value,
    pdId: product.product_id,
    pdPrice: product.product_price,
    quantity: 1
  };

  try {
    const response = await axios.post('http://localhost:3000/carts/addcartdtl', payload, { withCredentials: true });
    if (response.data.success) {
      EventBus.emit('cartdtlOK', { id: payload.cartId });
      return true;
    }
    return false;
  } catch (err) {
    console.error("API Error:", err);
    return false;
  }
};

const animateCart = async (product) => {
  if (product.isBouncing) return;
  await getCookie();
  if (!username.value) {
    alert("กรุณาล็อกอินก่อนเพิ่มสินค้าในตะกร้า");
    return router.push('/login');
  }
  cartId.value = await chkCart();
  if (!cartId.value) {
    cartId.value = await addCart();
  }
  product.isBouncing = true;
  const success = await addCartDtl(product);
  setTimeout(() => { product.isBouncing = false; }, 1000);
};

const fetchProduct = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/products/${route.params.id}`);
    product.value = Array.isArray(response.data) ? response.data[0] : response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    router.push('/products');
  }
};

onMounted(async () => {
  await fetchProduct();
  await getCookie();
});
</script>