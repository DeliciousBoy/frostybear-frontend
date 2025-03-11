<template>
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
                        <th class="p-2 border-r">ลำดับ</th>
                        <th class="p-2 border-r">Name</th>
                        <th class="p-2 border-r">Title</th>
                        <th class="p-2 border-r">Status</th>
                        <th class="p-2 border-r">Role</th>
                        <th class="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- วนแสดงข้อมูลด้วย paginatedData -->
                    <tr v-for="(user, index) in paginatedData" :key="user.id" class="border-b hover:bg-gray-50">
                        <!-- คำนวณลำดับตามหน้า -->
                        <td class="p-2 border-r">
                            {{ (currentPage - 1) * perPage + index + 1 }}
                        </td>
                        <td class="p-2 border-r">{{ user.name }}</td>
                        <td class="p-2 border-r">{{ user.title }}</td>
                        <td class="p-2 border-r">{{ user.status }}</td>
                        <td class="p-2 border-r">{{ user.role }}</td>
                        <td class="p-2">
                            <button @click="editProduct(user)" class="text-blue-600 hover:underline">
                                Edit
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
                        class="bg-gray-200 px-3 py-1 rounded mr-2 disabled:opacity-50">
                        Prev
                    </button>
                    <button @click="nextPage" :disabled="currentPage === totalPages"
                        class="bg-gray-200 px-3 py-1 rounded disabled:opacity-50">
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="currentTab === 'Productadd'">
        <Addproduct />
    </div>
    <div v-else-if="currentTab === 'Productedit'">
        <Editproduct />
    </div>
    
</template>

<script setup>
import { ref, computed } from 'vue'
import Editproduct from './Editproduct.vue'
import Addproduct from './Addproduct.vue'

// สร้าง state และตัวแปรต่าง ๆ
const currentTab = ref('ProductTable')
const searchQuery = ref('')
const currentPage = ref(1)
const perPage = ref(10)

// ตัวอย่างข้อมูลผู้ใช้
const users = ref([
    {
        id: 1,
        name: 'Lindsay Walton',
        title: 'Front-end Developer',
        status: 'Active',
        role: 'Member',
    },
    {
        id: 2,
        name: 'Courtney Henry',
        title: 'Designer',
        status: 'Active',
        role: 'Admin',
    },
    {
        id: 3,
        name: 'Tom Cook',
        title: 'Director of Product',
        status: 'Active',
        role: 'Directives',
    },
    {
        id: 4,
        name: 'Whitney Francis',
        title: 'Copywriter',
        status: 'Program',
        role: 'Member',
    },
    {
        id: 5,
        name: 'Leonard Krasner',
        title: 'Senior Engineer',
        status: 'Active',
        role: 'Owner',
    },
    {
        id: 6,
        name: 'Floyd Miles',
        title: 'Principal Designer',
        status: 'Inactive',
        role: 'Member',
    },
    // เพิ่มข้อมูลให้มากกว่า 10 แถวเพื่อทดสอบ pagination
    {
        id: 7,
        name: 'John Doe',
        title: 'Backend Developer',
        status: 'Active',
        role: 'Member',
    },
    {
        id: 8,
        name: 'Jane Smith',
        title: 'Project Manager',
        status: 'Active',
        role: 'Admin',
    },
    {
        id: 9,
        name: 'Alice Brown',
        title: 'UI/UX Designer',
        status: 'Inactive',
        role: 'Member',
    },
    {
        id: 10,
        name: 'Bob Johnson',
        title: 'DevOps Engineer',
        status: 'Active',
        role: 'Member',
    },
    {
        id: 11,
        name: 'Emily Davis',
        title: 'QA Specialist',
        status: 'Active',
        role: 'Member',
    },
    {
        id: 12,
        name: 'Michael Green',
        title: 'Data Analyst',
        status: 'Active',
        role: 'Admin',
    },
])

// คำนวณข้อมูลที่ผ่านการค้นหา (Search)
const filteredData = computed(() => {
    if (!searchQuery.value) return users.value

    const search = searchQuery.value.toLowerCase()
    return users.value.filter((user) => {
        return (
            user.name.toLowerCase().includes(search) ||
            user.title.toLowerCase().includes(search) ||
            user.status.toLowerCase().includes(search) ||
            user.role.toLowerCase().includes(search)
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

function editProduct(user) {
    // alert(`แก้ไขข้อมูลของ: ${user.name}`)
    currentTab.value = 'Productedit'
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
</script>

<style scoped>
/* สามารถปรับแต่งสไตล์เพิ่มเติมได้ตามต้องการ */
</style>