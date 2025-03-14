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
        <div class="mx-auto p-15 bg-base-200 rounded-md shadow">
          <h1 class="text-5xl font-semibold text-gray-800">Profile</h1>
          <p class="mt-1 text-xl text-gray-500">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div class="mt-6 space-y-4">
            <!-- Username -->
            <div class="flex items-center justify-between p-4 bg-white rounded shadow">
              <div v-if="!editingUsername">
                <div class="text-xl font-medium text-gray-900 mb-2">Username</div>
                <div class="text-3xl text-black-500">{{ username }}</div>
              </div>
              <div v-else class="flex flex-col">
                <label for="username" class="text-xl font-medium text-gray-900 mb-1">Username</label>
                <input id="username" v-model="tempUsername" type="text"
                  class="mt-1 block w-full border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 text-3xl" />
              </div>

              <!-- ปุ่ม Update / ✔ / ✖ สำหรับ Username -->
              <div>
                <button v-if="!editingUsername" class="text-2xl text-blue-600 hover:underline"
                  @click="startEditUsername">
                  Update
                </button>
                <div v-else class="flex items-center space-x-2">
                  <button class="text-2xl text-green-600 hover:underline" @click="confirmEditUsername">
                    ✔
                  </button>
                  <button class="text-2xl text-red-600 hover:underline" @click="cancelEditUsername">
                    ✖
                  </button>
                </div>
              </div>
            </div>

            <!-- Role -->
            <div class="items-center p-4 bg-white rounded shadow">
              <div class="text-xl font-medium text-gray-900 mb-2">Role</div>
              <div class="text-3xl text-black-500">{{ role }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Change Password Tab -->
      <div v-else-if="currentTab === 'changePassword'">
        <div class="mx-auto p-15 bg-base-200 rounded-md shadow">
          <h1 class="text-5xl font-semibold text-gray-800">Change Password</h1>
          <p class="mt-1 text-xl text-gray-500">
            Please enter your current password and a new one.
          </p>

          <form class="mt-6 space-y-4" @submit.prevent="updatePassword">
            <!-- Old Password Field -->
            <div class="bg-white p-4 rounded shadow">
              <label for="oldPassword" class="block text-2xl font-medium text-gray-700">
                Old Password
              </label>
              <div class="relative">
                <input :type="showOldPassword ? 'text' : 'password'" id="oldPassword" v-model="oldPassword"
                  class="mt-1 text-3xl block w-full border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                  required />
                <button type="button" @click="toggleOldPassword"
                  class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg v-if="!showOldPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" class="h-5 w-5 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="h-5 w-5 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.269-2.943-9.543-7a10.05 10.05 0 012.084-3.231M6.18 6.18A10.05 10.05 0 0112 5c4.478 0 8.269 2.943 9.543 7a10.05 10.05 0 01-4.32 5.19M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- New Password Field -->
            <div class="bg-white p-4 rounded shadow">
              <label for="newPassword" class="block text-2xl font-medium text-gray-700">
                New Password
              </label>
              <div class="relative">
                <input :type="showNewPassword ? 'text' : 'password'" id="newPassword" v-model="newPassword"
                  class="mt-1 text-3xl block w-full border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                  required />
                <button type="button" @click="toggleNewPassword"
                  class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg v-if="!showNewPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" class="h-5 w-5 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.478 0-8.268-2.943-9.543-7z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="h-5 w-5 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.269-2.943-9.543-7a10.05 10.05 0 012.084-3.231M6.18 6.18A10.05 10.05 0 0112 5c4.478 0 8.269 2.943 9.543 7a10.05 10.05 0 01-4.32 5.19M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Confirm New Password Field -->
            <div class="bg-white p-4 rounded shadow">
              <label for="confirmNewPassword" class="block text-2xl font-medium text-gray-700">
                Confirm New Password
              </label>
              <div class="relative">
                <input :type="showConfirmNewPassword ? 'text' : 'password'" id="confirmNewPassword"
                  v-model="confirmNewPassword"
                  class="mt-1 text-3xl block w-full border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                  required />
                <button type="button" @click="toggleConfirmNewPassword"
                  class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg v-if="!showConfirmNewPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" class="h-5 w-5 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.478 0-8.268-2.943-9.543-7z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="h-5 w-5 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.269-2.943-9.543-7a10.05 10.05 0 012.084-3.231M6.18 6.18A10.05 10.05 0 0112 5c4.478 0 8.269 2.943 9.543 7a10.05 10.05 0 01-4.32 5.19M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <button type="submit"
                class="px-4 py-2 mt-2 text-xl text-white bg-blue-600 rounded hover:bg-blue-700 float-right">
                Update Password
              </button>
            </div>
          </form>
        </div>
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

// ตัวแปรควบคุมแท็บปัจจุบัน
const currentTab = ref('profile')

// ข้อมูล Profile
const username = ref('Imget Cook')
const role = ref('Member')

// ตัวแปรและฟังก์ชันสำหรับแก้ไข Username
const editingUsername = ref(false)
const tempUsername = ref('')

function startEditUsername() {
  editingUsername.value = true
  tempUsername.value = username.value
}
function confirmEditUsername() {
  username.value = tempUsername.value
  editingUsername.value = false
}
function cancelEditUsername() {
  editingUsername.value = false
}

// ข้อมูลสำหรับเปลี่ยนรหัสผ่าน
const oldPassword = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')

// ตัวแปรสำหรับ toggle การแสดงผลรหัสผ่าน
const showOldPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmNewPassword = ref(false)

function toggleOldPassword() {
  showOldPassword.value = !showOldPassword.value
}
function toggleNewPassword() {
  showNewPassword.value = !showNewPassword.value
}
function toggleConfirmNewPassword() {
  showConfirmNewPassword.value = !showConfirmNewPassword.value
}

// ฟังก์ชันอัปเดตรหัสผ่าน
function updatePassword() {
  if (newPassword.value !== confirmNewPassword.value) {
    alert('New password does not match confirm password.')
    return
  }
  alert('Password updated successfully!')
  oldPassword.value = ''
  newPassword.value = ''
  confirmNewPassword.value = ''
}
</script>

<style scoped>
/* ไม่จำเป็นต้องเพิ่ม CSS เพิ่มเติม หากใช้ Tailwind CSS */
</style>
