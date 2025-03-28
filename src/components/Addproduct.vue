<template>
  <h2 class="text-xl font-semibold mb-4">Add Product</h2>

  <!-- ส่วนอัปโหลดรูปสินค้า -->
  <div class="form-control mb-4">
    <label class="label font-bold">Upload Product Image</label>
    <div class="flex items-center space-x-4">
      <!-- แสดงภาพตัวอย่าง ถ้ามี -->
      <div class="avatar">
        <div class="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
          <img v-if="previewImage" :src="previewImage" alt="Preview" />
          <div v-else class="flex items-center justify-center bg-gray-100 text-gray-500">
            No Image
          </div>
        </div>
      </div>

      <div>
        <input type="file" accept="image/*" @change="onFileChange"
          class="file-input file-input-bordered file-input-primary" />
        <p class="text-sm text-gray-500">
          SVG, PNG, JPG or GIF (MAX. 800x400px).
        </p>
      </div>
    </div>
  </div>

  <!-- ชื่อสินค้า -->
  <div class="form-control mb-4">
    <label class="label font-bold">Product Name</label>
    <input v-model="productName" type="text" placeholder="กรอกชื่อสินค้า" class="input input-bordered w-full" />
  </div>

  <!-- รายละเอียดสินค้า -->
  <div class="form-control mb-4">
    <label class="label font-bold">Description</label>
    <textarea v-model="productDescription" rows="3" placeholder="กรอกรายละเอียดสินค้า"
      class="textarea textarea-bordered w-full"></textarea>
  </div>

  <!-- ราคาสินค้า -->
  <div class="form-control mb-4">
    <label class="label font-bold">Price</label>
    <input v-model="productPrice" type="number" min="0" placeholder="0" class="input input-bordered w-full" />
  </div>

  <!-- Brand และ Product Type ให้อยู่แถวเดียวกัน -->
  <div class="grid grid-cols-2 gap-4 mb-4">
    <!-- แบรนด์สินค้า (Dropdown) -->
    <div class="form-control">
      <label class="label font-bold">Brand</label>
      <div class="dropdown dropdown-bottom w-full">
        <label tabindex="0" class="btn w-full flex justify-between items-center">
          <span>
            {{ selectedBrand ? selectedBrand.byte_name : 'Select Brand' }}
          </span>
          <!-- ลูกศรลงชิดขวา -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </label>
        <ul tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box w-full p-2 shadow-md max-h-60 overflow-auto">
          <li v-for="brand in brands" :key="brand.byte_name" @click="selectBrand(brand)">
            <a>{{ brand.byte_name }}</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- ประเภทสินค้า (Dropdown) -->
    <div class="form-control">
      <label class="label font-bold">Product Type</label>
      <div class="dropdown dropdown-bottom w-full">
        <label tabindex="0" class="btn w-full flex justify-between items-center">
          <span>
            {{ selectedProductType ? selectedProductType.byte_name : 'Select Product Type' }}
          </span>
          <!-- ลูกศรลงชิดขวา -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </label>
        <ul tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box w-full p-2 shadow-md max-h-60 overflow-auto">
          <li v-for="type in productTypes" :key="type.byte_name" @click="selectProductType(type)">
            <a>{{ type.byte_name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- ปุ่ม Submit -->
  <div class="flex justify-end mt-6">
    <div class="w-1/2 flex space-x-2">
      <button class="btn btn-error flex-1" @click="handleClose">
        Close
      </button>
      <button class="btn btn-primary flex-1" @click="submitForm">
        Confirm
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { getBrandsWithCache, getProductTypesWithCache } from '../services/systemParamService'
import { jwtDecode } from 'jwt-decode'

// ข้อมูลฟอร์ม
const productName = ref('')
const productDescription = ref('')
const productPrice = ref(0)
const selectedBrand = ref(null)
const selectedProductType = ref(null)
const username = ref(null) // เพิ่มตัวแปรเก็บ username

// เก็บไฟล์รูปสินค้า และรูป preview
const previewImage = ref(null)

// เก็บรายการแบรนด์และประเภทสินค้า
const brands = ref([])
const productTypes = ref([])

const emit = defineEmits(['closeForm', 'update'])

// ฟังก์ชันอ่านคุกกี้แบบตรงๆ
function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

// ดึงข้อมูลผู้ใช้จาก Token
function getUserFromToken() {
  try {
    const token = getCookie('token')
    if (!token) {
      console.error('No token found in cookies')
      return null
    }
    const decodedToken = jwtDecode(token)
    console.log("MY USERNAME:::!!!", decodedToken)
    return decodedToken.username
  } catch (err) {
    console.error(`Failed to decode token: ${err}`)
    return null
  }
}

// ดึงข้อมูลแบรนด์และประเภทสินค้าทันทีที่คอมโพเนนต์ถูก mount
onMounted(async () => {
  try {
    // ดึง username จาก token
    username.value = getUserFromToken()
    console.log(username.value)
    brands.value = await getBrandsWithCache()
    productTypes.value = await getProductTypesWithCache()
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

// จัดการไฟล์ที่ผู้ใช้เลือก
function onFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    // แสดงตัวอย่างรูป
    const reader = new FileReader()
    reader.onload = (event) => {
      previewImage.value = event.target.result
    }
    reader.readAsDataURL(file)
  }
}

// เลือกแบรนด์สินค้า
function selectBrand(brand) {
  selectedBrand.value = brand
  document.activeElement.blur()
}

// เลือกประเภทสินค้า
function selectProductType(type) {
  selectedProductType.value = type
  document.activeElement.blur()
}

// ฟังก์ชัน Submit Form
async function submitForm() {
  // ตรวจสอบว่ามี username หรือไม่
  if (!username.value) {
    alert('กรุณาเข้าสู่ระบบก่อนทำการเพิ่มสินค้า')
    return
  }

  // ตรวจสอบข้อมูลที่จำเป็น
  if (!productName.value) {
    alert('กรุณากรอกชื่อสินค้า')
    return
  }

  const formData = {
    product_image: previewImage.value,
    product_name: productName.value,
    product_detail: productDescription.value,
    product_price: productPrice.value,
    brand_id: selectedBrand.value?.byte_type || null,
    product_type: selectedProductType.value?.byte_type || null,
    create_by: username.value // ส่ง username ไปยัง API
  };

  try {
    // ส่งคำขอ POST ไปที่ API
    const response = await axios.post(`http://localhost:3000/products`, formData, {
      withCredentials: true // ส่งคุกกี้ไปกับ request
    });
    
    emit('update')
    emit('closeForm')
  } catch (error) {
    console.error('API error:', error);
    alert(`เกิดข้อผิดพลาด: ${error.response?.data?.error || error.message}`)
  }
}

function handleClose() {
  emit('closeForm')
}
</script>

<style scoped>
/* ตัวอย่างการปรับแต่งสไตล์เพิ่มเติม */
</style>