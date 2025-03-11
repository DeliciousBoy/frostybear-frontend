<template>
  <div class="h-screen py-20 p-4 md:p-20 lg:p-32 bg-custom-gradient">
    <div
      class="glass-morphism max-w-sm rounded-lg overflow-hidden shadow-lg mx-auto"
    >
      <div class="p-6">
        <h2 class="text-2xl font-bold text-white mb-2">Change your Password</h2>
        <p class="text-white mb-6">Please sign in to your account</p>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label class="block text-white font-bold mb-2" for="old_password">
                Old password
            </label>
            <input
              v-model="old_password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="old_password"
              type="text"
              placeholder="Old Password"
            />
          </div>
          <div class="mb-6">
            <label class="block text-white font-bold mb-2" for="new_password">
              New Password
            </label>
            <input
              v-model="new_password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="new_password"
              type="password"
              placeholder="New Password"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Change Password
            </button>
            <a
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>

        <!--ไปหน้า Register หรือหน้า Change password ปรับตรงนี้ได้เลย-->

        <!-- <div class="mt-4 text-center text-white">
          <router-link to="/login/register" class="text-blue-500">Register</router-link> |
          <router-link to="/login/change-password" class="text-blue-500">Change Password</router-link>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "ChangePasswordPage",
  setup() {
    const old_password = ref("");
    const new_password = ref("");
    const router = useRouter();

    const submitForm = () => {
      if (old_password.value && new_password.value) {
        // Handle password change logic here
        alert("Password changed successfully!");
        router.push("/login");
      } else {
        alert("Please fill in both fields.");
      }
    };

    return {
      old_password,
      new_password,
      submitForm,
    };
  },
};
</script>
