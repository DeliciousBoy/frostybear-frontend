<template>
<div
    class="absolute h-screen w-screen bg-neutral-950 items-center px-5 py-24 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
  >
    <div class="glass-morphism max-w-sm rounded-lg overflow shadow-lg mx-auto">
      <div class="p-6">
        <h4 class="text-2xl text-white  mb-6 flex justify-center">
          Change Password
        </h4>

        <form @submit.prevent="submitForm">
          <div class="mb-5">
            <input
              v-model="username"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline border-gray-400/20"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div class="mb-5">
            <input
              v-model="password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline border-gray-400/20"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div class="mb-5">
            <input
              v-model="password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline border-gray-400/20"
              id="confirm_password"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div class="flex items-center justify-center">
            <button
              class="w-[350px] bg-black h-[40px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
              type="submit"
            >
              Reset Password
            </button>
          </div>
        </form>
        
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
