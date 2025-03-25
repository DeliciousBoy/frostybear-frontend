<template>
  <div
    class="absolute h-screen w-screen bg-neutral-950 items-center px-5 py-24 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
  >
    <div class="glass-morphism max-w-sm rounded-lg overflow shadow-lg mx-auto">
      <div class="p-6">
        <h4 class="text-2xl text-white mb-2 flex justify-center">
          Welcome Back
        </h4>
        <p class="text-white mb-6 flex justify-center">
          Please sign in to your account
        </p>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <input
              v-model="username"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline border-gray-400/20"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div class="mb-6">
            <input
              v-model="password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline border-gray-400/20"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div class="content"></div>
          <div class="flex items-center justify-between">
            <div class="flex items-center cursor-pointer gap-2">
              <label class="checkBox">
                <input id="ch1" type="checkbox" />
                <div class="transition"></div>
              </label>
              <div class="text-gray-500 hover:text-gray-400 text-sm">
                Terms and Conditions
              </div>
            </div>
            <router-link
              class="text-sm font-display font-semibold text-gray-500 hover:text-gray-400 cursor-pointer"
              to="/login/change-password"
              >Forgot Password</router-link
            >
          </div>
          <div class="flex items-center justify-center">
            <button
              class="w-[350px] bg-black h-[40px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <div class="mt-4 text-center text-white">
          Don't have an account?
          <router-link
            to="/login/register"
            class="text-blue-500 hover:text-blue-700"
          >
            Sign Up</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
// import 'vue-toast-notification/dist/theme-sugar.css';

axios.defaults.withCredentials = true;

const username = ref(null);
const password = ref(null);
const loginStatus = ref(null);
const token = ref(null);
const decodedToken = ref(null);
const $toast = useToast();

const submitForm = async () => {
  const member = {
    username: username.value,
    password: password.value,
  };
  try {
    const response = await axios.post("http://localhost:3000/login", member);
    loginStatus.value = response.data.loginStatus;
    if (loginStatus.value) {
      $toast.success("Login successful!");
    } else {
      $toast.error("Login failed. Please try again.");
    }
  } catch (error) {
    console.log(error);
    $toast.error("An error occurred. Please try again.");
  }
};

const getCookie = () => {
  try {
    token.value = Cookies.get("token");
    decodedToken.value = jwtDecode(token.value);
    if (decodedToken.value != null) {
      $toast.success("Token retrieved successfully!");
    }
  } catch (error) {
    console.error(`Failed to get token ${error}`);
  }
};

const checkCart = async () => {
  try {
    const resonse = await axios.post(
      "http://localhost:3000/cart",
      member
    );
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
.clear {
  clear: both;
}

.checkBox {
  display: block;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0);
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 0px 0px 2px #fff;
}

.checkBox div {
  width: 60px;
  height: 60px;
  background-color: #fff;
  top: -52px;
  left: -52px;
  position: absolute;
  transform: rotateZ(45deg);
  z-index: 100;
}

.checkBox input[type="checkbox"]:checked + div {
  left: -10px;
  top: -10px;
}

.checkBox input[type="checkbox"] {
  position: absolute;
  left: 50px;
  visibility: hidden;
}

.transition {
  transition: 300ms ease;
}
</style>
