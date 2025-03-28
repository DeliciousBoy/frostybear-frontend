<template>
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
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" class="h-5 w-5 text-gray-500">
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
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" class="h-5 w-5 text-gray-500">
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
                        <svg v-if="!showConfirmNewPassword" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5 text-gray-500">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.478 0-8.268-2.943-9.543-7z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" class="h-5 w-5 text-gray-500">
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Cookies from 'js-cookie'
import bcrypt from "bcryptjs";
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'


// ข้อมูล Profile
const token = ref("")
const id = ref(null)
const decodedToken = ref(null)

// ข้อมูลสำหรับเปลี่ยนรหัสผ่าน
const oldPassword = ref(null)
const confirmoldPassword = ref(null)
const newPassword = ref(null)
const confirmNewPassword = ref(null)
const isMatch = ref(null)

// ตัวแปรสำหรับ toggle การแสดงผลรหัสผ่าน
const showOldPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmNewPassword = ref(false)

onMounted(async () => {
    await getCookie()
})

const getCookie = () => {
    try {
        token.value = Cookies.get('token')
        if (token.value) {
            decodedToken.value = jwtDecode(token.value)
            console.log(`MainMenu-->${decodedToken.value}`)
            id.value = decodedToken.value.id
            confirmoldPassword.value = decodedToken.value.password
        } else {
            decodedToken.value = null
        }
    } catch (err) {
        console.error(`fail decode token ${err}`)
        decodedToken.value = null
    }
}

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
async function updatePassword() {
    await hashPassword(oldPassword.value)
    if (!isMatch.value) {
        alert('Passwod incorrect.')
        return
    }
    if (newPassword.value !== confirmNewPassword.value) {
        alert('New password does not match confirm password.')
        return
    }
    const formData = {
        password: newPassword.value
    }
    await axios.put(`http://localhost:3000/putpassword/${id.value}`, formData)
    alert('Password updated successfully!')
    oldPassword.value = ''
    newPassword.value = ''
    confirmNewPassword.value = ''
}

async function hashPassword(password) {
    const validate = await bcrypt.compare(password, confirmoldPassword.value);
    isMatch.value = validate
}

</script>

<style></style>