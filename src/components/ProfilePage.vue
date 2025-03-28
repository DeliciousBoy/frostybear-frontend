<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="w-64 bg-white border-r">
      <nav class="py-4">
        <!-- ปุ่มแท็บ Profile -->
        <button @click="currentTab = 'profile'" :class="[
          'block w-full text-left px-6 py-2',
          currentTab === 'profile'
            ? 'font-medium text-2xl text-gray-700 bg-gray-100'
            : 'text-xl text-gray-700 hover:bg-gray-50'
        ]">
          Profile
        </button>
        <!-- ปุ่มแท็บ Change Password -->
        <button @click="currentTab = 'changePassword'" :class="[
          'block w-full text-left px-6 py-2',
          currentTab === 'changePassword'
            ? 'font-medium text-2xl  text-gray-700 bg-gray-100'
            : 'text-xl text-gray-700 hover:bg-gray-50'
        ]">
          Change Password
        </button>
        <button @click="currentTab = 'ProductManagement'" :class="[
          'block w-full text-left px-6 py-2',
          currentTab === 'ProductManagement'
            ? 'font-medium text-2xl  text-gray-700 bg-gray-100'
            : 'text-xl text-gray-700 hover:bg-gray-50'
        ]">
          Product Management
        </button>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-8">
      <!-- Profile Tab -->
      <div v-if="currentTab === 'profile'">
        <Profile />
      </div>

      <!-- Change Password Tab -->
      <div v-else-if="currentTab === 'changePassword'">
        <Changepassword />
      </div>
      <!-- Change Password Tab -->
      <div v-else-if="currentTab === 'ProductManagement'">
        <ProductManage />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProductManage from "@/components/ProductManage.vue";
import Profile from "@/components/Profile.vue";
import Changepassword from "@/components/Changepassword.vue";

// ตัวแปรควบคุมแท็บปัจจุบัน
const currentTab = ref('profile')

</script>

<style scoped>
/* ไม่จำเป็นต้องเพิ่ม CSS เพิ่มเติม หากใช้ Tailwind CSS */
</style>
