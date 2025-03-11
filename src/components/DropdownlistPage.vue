<template>
  <div class="flex justify-center animate__animated animate__fadeIn">
    <div class="row">
      <p class="flex justify-center">Drop down list example</p>
      <div class="dropdown">
        <!-- Dropdown สำหรับ Brands -->
        <div tabindex="0" role="button" class="btn m-1 w-50 bg-secondary text-white">Brands</div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <!-- ใช้ v-for เพื่อวนลูปแสดงข้อมูลแบรนด์ -->
          <li v-for="brand in brands" :key="brand.byte_name">
            <a>{{ brand.byte_name }}</a>
          </li>
        </ul>
      </div>

      <div class="dropdown">
        <!-- Dropdown สำหรับ Product Types -->
        <div tabindex="0" role="button" class="btn m-1 w-50 bg-secondary text-white">Product Types</div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <!-- ใช้ v-for เพื่อวนลูปแสดงข้อมูลประเภทสินค้า -->
          <li v-for="type in productTypes" :key="type.byte_name">
            <a>{{ type.byte_name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getBrandsWithCache, getProductTypesWithCache } from "../services/systemParamService"

// กำหนด ref สำหรับเก็บข้อมูลแบรนด์และประเภทสินค้า
const brands = ref([])
const productTypes = ref([])

onMounted(async () => {
  try {
    // ดึงข้อมูลแบรนด์และประเภทสินค้าจาก API โดยใช้ฟังก์ชันที่นำเข้า
    brands.value = await getBrandsWithCache()
    productTypes.value = await getProductTypesWithCache()
  } catch (error) {
    console.error("Error fetching data:", error)
  }
})
</script>

<style>
</style>