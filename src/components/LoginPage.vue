<template>
  <div class="h-screen py-20 p-4 md:p-20 lg:p-32 bg-custom-gradient animate__animated animate__fadeIn">
    <div class="glass-morphism max-w-sm rounded-lg overflow-hidden shadow-lg mx-auto">
      <div class="p-6">
        <h2 class="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
        <p class="text-white mb-6">Please sign in to your account</p>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label class="block text-white font-bold mb-2" for="username">
              Username
            </label>
            <input v-model="username"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="username" type="text" placeholder="Username" />
          </div>
          <div class="mb-6">
            <label class="block text-white font-bold mb-2" for="password">
              Password
            </label>
            <input v-model="password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="password" type="password" placeholder="Password" />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Sign In
            </button>
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
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
  import {
    ref
  } from "vue";
  import {
    useRouter
  } from "vue-router";
  export default {
    name: "LoginPage",
    setup() {
      const username = ref("");
      const password = ref("");
      const router = useRouter();
      const submitForm = () => {
        if (username.value && password.value) {
          router.push("/");
        } else {
          alert("Please fill in both fields.");
        }
      };
      return {
        username,
        password,
        submitForm,
      };
    },
  };
</script>