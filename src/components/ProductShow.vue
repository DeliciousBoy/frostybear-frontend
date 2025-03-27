<template>
  <div class="container mt-5">
    <div v-if="product" class="row">
      <!-- ส่วนแสดงรูปภาพ -->
      <div class="col-md-6 col-sm-12">
        <div class="card mx-auto mb-3" style="width: 18rem">
          <img 
            :src="getImageUrl(product.product_image)" 
            :alt="product.product_name"
            class="img-fluid rounded shadow-sm"
            style="max-height: 300px; object-fit: contain;"
          >
        </div>
      </div>
      
      <!-- ส่วนแสดงรายละเอียด -->
      <div class="col-md-6 col-sm-12">
        <table class="table">
          <tbody>
            <tr class="table-secondary">
              <th>รหัสสินค้า</th>
              <td>{{ product.product_id }}</td>
            </tr>
            <tr>
              <th>ชื่อสินค้า</th>
              <td>{{ product.product_name }}</td>
            </tr>
            <tr>
              <th>ราคา</th>
              <td>{{ formatPrice(product.product_price) }}</td>
            </tr>
            <tr v-if="product.brand">
              <th>ยี่ห้อ</th>
              <td>{{ product.brand.brand_name }}</td>
            </tr>
            <tr v-if="product.pdt">
              <th>ประเภทสินค้า</th>
              <td>{{ product.pdt.product_type_name }}</td>
            </tr>
            <tr>
              <th>รายละเอียด</th>
              <td>{{ product.product_detail || 'ไม่มีรายละเอียดเพิ่มเติม' }}</td>
            </tr>
          </tbody>
        </table>
        
                    <button class="btn btn-white-600" @click.stop="animateCart(product)"
                            :disabled="product.isBouncing">
                            <font-awesome-icon :icon="cartIconClass" :class="{ 'fa-bounce': product.isBouncing }" />
                            {{ product.isBouncing ? "Adding..." : "Add to Cart" }}
                          </button>
        
        <button 
          v-if="isAdmin"
          class="btn btn-warning float-end"
          @click="editProduct(product.product_id)"
        >
          <i class="bi bi-pencil-fill lead"></i> แก้ไข
        </button>
      </div>
    </div>
    
    <div v-else class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3">กำลังโหลดข้อมูลสินค้า...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { EventBus } from '../event-bus'; // ตรวจสอบ path ให้ถูกต้อง
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const cartId = ref(null);
const username = ref(null);

const route = useRoute()
const router = useRouter()
const product = ref(null)

// ฟังก์ชันแปลง Base64 เป็น URL รูปภาพ
const getImageUrl = (base64Data) => {
  if (!base64Data) return '/default-product.jpg';
  
  // ตรวจสอบว่ามี prefix อยู่แล้วหรือไม่
  if (base64Data.startsWith('data:image/')) {
    return base64Data;
  }
  
  // ถ้าไม่มี prefix ให้เพิ่ม (สมมุติว่าเป็น PNG)
  return `data:image/png;base64,${base64Data}`;
}

// ฟังก์ชันจัดรูปแบบราคา
const formatPrice = (price) => {
  if (!price) return '฿0'
  return `฿${price.toLocaleString()}`
}
// ฟังก์ชันตรวจสอบการล็อกอิน
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

// ฟังก์ชันตรวจสอบตะกร้า
const chkCart = async () => {
  if (!username.value) return null;
  
  try {
    const response = await axios.post('http://localhost:3000/carts/chkcart', {
      username: username.value
    }, { withCredentials: true });
    
    return response.data.cartId || null;
  } catch (err) {
    console.error('Error checking cart:', err);
    return null;
  }
};

// ฟังก์ชันสร้างตะกร้า
const addCart = async () => {
  try {
    const response = await axios.post('http://localhost:3000/carts/addcart', {
      cusId: username.value
    }, { withCredentials: true });
    
    return response.data.cartId || null;
  } catch (err) {
    console.error('Error creating cart:', err);
    return null;
  }
};

// ฟังก์ชันเพิ่มสินค้าในตะกร้า
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
    const response = await axios.post(
      'http://localhost:3000/carts/addcartdtl', 
      payload,
      { withCredentials: true }
    );

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

// ฟังก์ชันสำหรับอนิเมชั่นตะกร้า
const animateCart = async (product) => {
  if (product.isBouncing) return;
  
  await getCookie();
  if (!username.value) {
    alert("กรุณาล็อกอินก่อนเพิ่มสินค้าในตะกร้า");
    return router.push('/login');
  }
  
  // ตรวจสอบหรือสร้างตะกร้า
  cartId.value = await chkCart();
  if (!cartId.value) {
    cartId.value = await addCart();
  }
  
  product.isBouncing = true;
  const success = await addCartDtl(product);
  setTimeout(() => {
    product.isBouncing = false;
  }, 1000);
};

// ดึงข้อมูลสินค้า
const fetchProduct = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/products/${route.params.id}`);
    
    if (Array.isArray(response.data)) {
      product.value = response.data[0];
    } else {
      product.value = response.data;
    }
    
    console.log("Product data:", product.value);
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

<style scoped>
.card {
  border: none;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.table {
  width: 100%;
  margin-bottom: 1rem;
}

.table th {
  width: 30%;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>