<template>
    <div class="mx-auto p-5 bg-base-200 rounded-md shadow">
        <div v-if="currentTab === 'ProductTable'">
            <div class="container mx-auto p-4">
                <!-- ส่วนหัว: Search Bar + ปุ่ม Add -->
                <div class="flex justify-between items-center mb-4">
                    <!-- Search Bar -->
                    <div>
                        <input v-model="searchQuery" type="text" placeholder="Search..."
                            class="border border-gray-300 rounded px-3 py-2" />
                    </div>

                    <!-- ปุ่ม Add -->
                    <div>
                        <button @click="addProduct" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                            Add
                        </button>
                    </div>
                </div>

                <!-- ตาราง -->
                <table class="min-w-full border">
                    <thead>
                        <tr class="bg-gray-100 border-b">
                            <th class="p-2 border-r">Number</th>
                            <th class="p-2 border-r">Product Image</th>
                            <th class="p-2 border-r">Product Name</th>
                            <th class="p-2 border-r">Product Detail</th>
                            <th class="p-2 border-r">Product Price</th>
                            <th class="p-2 border-r">Brand</th>
                            <th class="p-2 border-r">Product Type</th>
                            <th class="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- วนแสดงข้อมูลด้วย paginatedData -->
                        <tr v-for="(product, index) in paginatedData" :key="product.id"
                            class="border-b hover:bg-gray-50">
                            <!-- คำนวณลำดับตามหน้า -->
                            <td class="p-2 border-r">
                                {{ (currentPage - 1) * perPage + index + 1 }}
                            </td>
                            <th class="p-2 border-r">
                                <div class="flex justify-center items-center">
                                    <img :src="product.imageSrc" alt="Product"
                                        class="w-16 h-16 object-cover rounded bg-gray-200 group-hover:opacity-75" />
                                </div>
                            </th>
                            <td class="p-2 border-r">{{ product.name }}</td>
                            <td class="p-2 border-r">{{ product.detail }}</td>
                            <td class="p-2 border-r">{{ product.price }}</td>
                            <td class="p-2 border-r">{{ product.brand_name }}</td>
                            <td class="p-2 border-r">{{ product.product_type }}</td>
                            <td class="p-2 flex justify-center gap-2">
                                <button @click="selectProduct(product)"
                                    class="w-15 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out shadow-sm focus:outline-none">
                                    Edit
                                </button>
                                <button @click="openConfirmDelete(product)"
                                    class="w-15 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200 ease-in-out shadow-sm focus:outline-none">
                                    Delete
                                </button>
                            </td>

                        </tr>
                    </tbody>
                </table>

                <!-- ตัวแบ่งหน้า -->
                <div class="mt-4 flex justify-between items-center">
                    <p>
                        Page {{ currentPage }} of {{ totalPages }}
                    </p>
                    <div>
                        <button @click="prevPage" :disabled="currentPage === 1"
                            class="bg-gray-200 px-5 py-2 rounded mr-2 disabled:opacity-50">
                            Prev
                        </button>
                        <button @click="nextPage" :disabled="currentPage === totalPages"
                            class="bg-gray-200 px-5 py-2 rounded disabled:opacity-50">
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <!-- Confirm Delete Popup -->
            <Confirmdeletepopup v-if="showConfirmPopup" :product="selectedProduct" @confirm="handleConfirmDelete" @cancel="handleCancelDelete" />
        </div>


        <div v-else-if="currentTab === 'Productadd'">
            <Addproduct @closeForm="onCloseForm" @update="fetchProducts" />
        </div>
        <div v-else-if="currentTab === 'Productedit'">
            <Editproduct v-if="
                selectedProduct" :product="selectedProduct" @closeForm="onCloseForm" @update="fetchProducts" />
        </div>
    </div>
</template>

<script setup>
import Editproduct from './Editproduct.vue'
import Addproduct from './Addproduct.vue'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import Confirmdeletepopup from './Confirmdeletepopup.vue'
import { getAllProducts } from '../services/productService'


// สร้าง state และตัวแปรต่าง ๆ
const currentTab = ref('ProductTable')
const searchQuery = ref('')
const currentPage = ref(1)
const perPage = ref(5)

const products = ref([]);
const selectedProduct = ref(null)

const showConfirmPopup = ref(false)   // ควบคุมการแสดง popup
const productToDelete = ref(null)     // เก็บ product id ที่ต้องการลบ

onMounted(async () => {
    fetchProducts()
})

async function fetchProducts() {
    products.value = await getAllProducts({}, true);
    // เพิ่มฟิลด์ isBouncing ให้กับแต่ละสินค้า
    products.value.forEach(product => {
        product.isBouncing = false
    })
}


// คำนวณข้อมูลที่ผ่านการค้นหา (Search)
const filteredData = computed(() => {
    if (!searchQuery.value) return products.value

    const search = searchQuery.value.toLowerCase()
    return products.value.filter((product) => {
        return (
            product.name.toLowerCase().includes(search) ||
            product.detail.toLowerCase().includes(search) ||
            product.price.toLowerCase().includes(search) ||
            product.product_type.toLowerCase().includes(search) ||
            product.brand_name.toLowerCase().includes(search)
        )
    })
})

// คำนวณจำนวนหน้าทั้งหมด
const totalPages = computed(() => {
    return Math.ceil(filteredData.value.length / perPage.value)
})

// คำนวณข้อมูลที่จะแสดงในหน้าปัจจุบัน
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * perPage.value
    const end = start + perPage.value
    return filteredData.value.slice(start, end)
})

// ฟังก์ชัน
function addProduct() {
    currentTab.value = 'Productadd'
}

function selectProduct(product) {
    currentTab.value = 'Productedit'
    selectedProduct.value = { ...product }
}

// เมื่อกดปุ่ม Delete ให้เก็บ product id และเปิด popup
function openConfirmDelete(product) {
    selectedProduct.value = { ...product }
    console.log("Open confirm popup for product:", product.id)
    productToDelete.value = product.id
    showConfirmPopup.value = true
}

async function handleConfirmDelete() {
    if (productToDelete.value) {
        try {
            const response = await axios.delete(`http://localhost:3000/products/${productToDelete.value}`);
            await fetchProducts() // รีเฟรชข้อมูลหลังลบ
        } catch (error) {
            console.error('Error deleting product:', error)
        }
    }
    // ปิด popup และเคลียร์ productToDelete
    showConfirmPopup.value = false
    productToDelete.value = null
}

function handleCancelDelete() {
    showConfirmPopup.value = false
    productToDelete.value = null
}



function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

// ฟังก์ชันที่รับ event จาก EditProduct
function onCloseForm() {
    currentTab.value = 'ProductTable'
}
</script>

<style scoped></style>