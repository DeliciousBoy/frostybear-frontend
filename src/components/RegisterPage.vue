<template>
  <div
    class="animate__animated animate__fadeIn absolute h-screen w-screen bg-neutral-950 items-center px-5 py-24 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
  >
    <div class="glass-morphism max-w-sm rounded-lg overflow shadow-lg mx-auto">
      <div class="p-6">
        <h4 class="text-2xl text-white mb-6 flex justify-center">
          Create an Account
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
              Sign Up
            </button>
          </div>
        </form>
        <p v-if="registration==true" class="alert alert-success mt-3">registration success</p>
        <p v-if="registration==false" class="alert alert-danger mt-3">registration failed {{message}}</p>
        <div class="mt-4 text-center text-white">
          Have an account?
          <router-link
            to="/login"
            class="text-blue-500 hover:text-blue-700"
          >
            Sign In</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'Register',
  data(){
    return {
      username: null,
      password: null,
      registration: null,
      message: null
    }
  },
  methods: {
    async submitForm(){
      let member = {
        username:this.username,
        password:this.password
      }
      try{
        const response = await axios.post('http://localhost:3000/register', member)
        this.registration = response.data.registration
        this.message = response.data.message
      }
      catch(error){
        console.log(error)
      }
    }
  }
}
</script>