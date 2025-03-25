<template>
  <h2 class="text-xl font-semibold mb-4">Edit Product</h2>
  <!-- ส่วนอัปโหลดรูปสินค้า -->
  <div class="form-control mb-4">
    <label class="label font-bold">Upload Product Image</label>
    <div class="flex items-center space-x-4">
      <!-- แสดงภาพตัวอย่าง ถ้ามี -->
      <div class="avatar">
        <div class="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
          <img v-if="editData.image" :src="editData.image" alt="Preview" />
          <div v-else class="flex items-center justify-center bg-gray-100 text-gray-500">
            No Image
          </div>
        </div>
      </div>

      <div>
        <input type="file" accept="image/*" @change="onFileChange"
          class="file-input file-input-bordered file-input-primary" />
      </div>
    </div>
  </div>

  <!-- ชื่อสินค้า -->
  <div class="form-control mb-4">
    <label class="label font-bold">Product Name</label>
    <input v-model="editData.name" type="text" placeholder="กรอกชื่อสินค้า" class="input input-bordered w-full" />
  </div>

  <!-- รายละเอียดสินค้า -->
  <div class="form-control mb-4">
    <label class="label font-bold">Description</label>
    <textarea v-model="editData.detail" rows="3" placeholder="กรอกรายละเอียดสินค้า"
      class="textarea textarea-bordered w-full"></textarea>
  </div>

  <!-- ราคาสินค้า -->
  <div class="form-control mb-4">
    <label class="label font-bold">Price</label>
    <input v-model="editData.price" type="number" min="0" placeholder="0" class="input input-bordered w-full" />
  </div>

  <!-- Brand และ Product Type ให้อยู่แถวเดียวกัน -->
  <div class="grid grid-cols-2 gap-4 mb-4">
    <!-- แบรนด์สินค้า (Dropdown) -->
    <div class="form-control">
      <label class="label font-bold">Brand</label>
      <div class="dropdown dropdown-bottom w-full">
        <label tabindex="0" class="btn w-full flex justify-between items-center">
          <span>
            {{ selectedBrand ? selectedBrand.byte_name : editData.brand }}
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
            {{ selectedProductType ? selectedProductType.byte_name : editData.product_type }}
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
import { ref, onMounted, reactive, watch } from 'vue'
import axios from "axios";
import { getBrandsWithCache, getProductTypesWithCache } from '../services/systemParamService'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const editData = reactive({
  id: props.product.id,
  image: props.product.imageSrc,
  name: props.product.name,
  price: props.product.price,
  detail: props.product.detail,
  brand: props.product.brand_name,
  product_type: props.product.product_type,
})
// ข้อมูล dropdown ที่ถูกเลือก
const selectedBrand = ref(null)
const selectedProductType = ref(null)

// เก็บรายการแบรนด์และประเภทสินค้า
const brands = ref([])
const productTypes = ref([])

const emit = defineEmits(['closeForm', 'update'])

// ดึงข้อมูลแบรนด์และประเภทสินค้าทันทีที่คอมโพเนนต์ถูก mount
onMounted(async () => {
  try {
    brands.value = await getBrandsWithCache()
    productTypes.value = await getProductTypesWithCache()
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  watch(
    () => editData.product_type,
    (newProductTypeCode) => {
      // ถ้าไม่ได้เลือก หรือเป็นค่าว่าง
      if (!newProductTypeCode) {
        selectedProductType.value = null
        return
      }
      // ค้นหา brand object จาก brands โดยเทียบกับ byte_type
      selectedProductType.value = productTypes.value.find(
        (p) => p.byte_name === newProductTypeCode
      ) || null
    },
    { immediate: true } // ให้ทำครั้งแรกทันที (ตั้งค่าเริ่มต้น)
  )
  watch(
    () => editData.brand,
    (newBrandCode) => {
      // ถ้าไม่ได้เลือก หรือเป็นค่าว่าง
      if (!newBrandCode) {
        selectedBrand.value = null
        return
      }
      // ค้นหา brand object จาก brands โดยเทียบกับ byte_type
      selectedBrand.value = brands.value.find(
        (b) => b.byte_name === newBrandCode
      ) || null
    },
    { immediate: true } // ให้ทำครั้งแรกทันที (ตั้งค่าเริ่มต้น)
  )
})

// จัดการไฟล์ที่ผู้ใช้เลือก
function onFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    // ใช้ FileReader เพื่ออ่านไฟล์รูปเป็น Base64
    const reader = new FileReader()
    reader.onload = (event) => {
      // เมื่ออ่านไฟล์เสร็จ ให้เอาผลลัพธ์ (Base64) เก็บใน editData.image
      editData.image = event.target.result
      // event.target.result จะเป็น string ลักษณะ "data:image/png;base64,iVBORw0K..."
    }
    reader.readAsDataURL(file) // สั่งอ่านไฟล์เป็น Base64
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
  // เตรียมข้อมูลที่จะส่ง
  const formData = {
    product_id: editData.id,
    product_image: editData.image,
    product_name: editData.name,
    product_detail: editData.detail,
    product_price: editData.price,
    brand_id: selectedBrand.value.byte_type,
    product_type: selectedProductType.value.byte_type,
  };


  try {
    // ส่งคำขอ PUT ไปที่ API โดยใช้ editData.id เป็นส่วนของ URL
    const response = await axios.put(`http://localhost:3000/products/${editData.id}`, formData);
    emit('update')
    emit('closeForm')
  } catch (error) {
    console.error('API error:', error);
  }

}


function handleClose() {
  emit('closeForm')
}

</script>

<style scoped>
/* ตัวอย่างการปรับแต่งสไตล์เพิ่มเติม */
</style>
