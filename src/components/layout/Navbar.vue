<template>
  <div class="bg-white animate__animated animate__fadeIn">
    <header class="absolute inset-x-0 top-0 z-50">
      <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <img class="h-15 w-auto" src="/img/logo.png" alt="" />
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = true">
            <Bars3Icon class="size-6" aria-hidden="true" />
          </button>
        </div>

        <!-- ในส่วนเมนูปกติ (Desktop) -->
        <div class="hidden lg:flex lg:gap-x-12">
          <router-link to="/" class="text-xl font-bold text-gray-900">Home</router-link>
          <router-link to="/shop" class="text-xl font-bold text-gray-900">Shop</router-link>
          <router-link v-if="decodedToken" to="/history" class="text-xl font-bold text-gray-900">History</router-link>
          <!-- Cart Info (only shown when logged in) -->
          <div v-if="decodedToken" class="hidden lg:flex items-center mx-4">
            <CartInfoTemp />
          </div>
        </div>

        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <router-link v-if="!decodedToken" to="/login" class="text-xl font-bold text-gray-900">Log in <span
                aria-hidden="true">&rarr;</span></router-link>
          <div v-else class="flex items-center gap-4">
           <router-link to="/profile"> <span class="text-xl font-bold text-gray-900">Welcome, {{ username }}</span> </router-link>
            <button @click="memlogout" class="text-xl font-bold text-gray-900">Logout</button>
          </div>
        </div>
      </nav>

      <!-- Mobile Menu -->
      <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-50" />
        <DialogPanel
          class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-11 w-auto" src="/img/logo.png" alt="" />
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="size-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">


             <!-- ในส่วนเมนูมือถือ (Mobile) -->
              <div class="space-y-2 py-6">
                <router-link to="/" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-bold text-gray-900 hover:bg-gray-50">Home</router-link>
                <router-link to="/shop" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-bold text-gray-900 hover:bg-gray-50">Shop</router-link>
                <router-link v-if="decodedToken" to="/history" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-bold text-gray-900 hover:bg-gray-50">History</router-link>
                <CartInfoTemp v-if="decodedToken" />
              </div>


              <div class="py-6">
                <router-link v-if="!decodedToken" to="/login" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-bold text-gray-900 hover:bg-gray-50">Log in</router-link>
                <div v-else class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-bold text-gray-900">
                   <router-link to="/profile"> <p>Welcome, {{ username }} </p></router-link>
                  <button @click="memlogout" class="text-base/7 font-bold text-gray-900 hover:bg-gray-50">Logout</button>
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>

    <div v-if="route.path === '/'">
      <div class="relative isolate px-6 pt-14 lg:px-8 animate__animated animate__fadeIn">
        <video autoplay loop muted class="absolute inset-0 w-full h-full object-cover -z-10">
          <source src="/video/Magnum.mp4" type="video/mp4" />
        </video>
        <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true">
          <div
            class="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
        </div>
        <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div class="text-center">
            <h1 class="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Welcome</h1>
            <p class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">The ice cream website is here.</p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
              <router-link to="/shop"
                class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get
                started</router-link>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true">
          <div
            class="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
        </div>
      </div>
    </div>

    <div v-else>
      <div class="mb-30"></div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';
import { EventBus } from "../../event-bus"
import CartInfoTemp from "../CartInfoTemp.vue"

const mobileMenuOpen = ref(false)
const route = useRoute()
const token = ref("")
const decodedToken = ref(null)
const username = ref(null)
const role = ref(null)
const login = ref(false)

const getCookie = () => {
  try {
    token.value = Cookies.get('token');
    if (token.value) {
      decodedToken.value = jwtDecode(token.value)
      console.log(`MainMenu-->${decodedToken.value}`)
      username.value = decodedToken.value.username
      role.value = decodedToken.value.role
    } else {
      decodedToken.value = null
    }
  } catch (err) {
    console.error(`fail decode token ${err}`)
    decodedToken.value = null
  }
}

const memlogout = async () => {
  const cf = window.confirm('ต้องการออกจากระบบ?')
  if (!cf) return
  
  try {
    // 1. Call logout API
    await axios.get(`http://localhost:3000/logout`, {
      withCredentials: true // Important for session cookies
    })
    
    // 2. Remove token from cookies
    Cookies.remove('token', { path: '/', domain: window.location.hostname })
    
    // 3. Reset all state variables
    token.value = ""
    decodedToken.value = null
    username.value = null
    login.value = false
    
    // 4. Emit logout event
    EventBus.emit('memlogout')
    
    // 5. Force full page reload to clear all states
    window.location.href = '/' 
    
  } catch (err) {
    console.error('Logout error:', err)
    alert('ออกจากระบบไม่สำเร็จ')
  }
}

const chkCart = async () => {
  if (!decodedToken.value) return
  
  console.log('chkCart')
  try {
    const response = await axios.post(`http://localhost:3000/carts/chkcart`, {
      username: username.value
    }, {
      withCredentials: true
    })
    
    let cartId = response.data.cartId
    if (cartId) {
      EventBus.emit('cartdtlOK', {id: cartId})
      console.log("Cart ID:", cartId)
    }
  } catch (err) {
    console.error('Cart check error:', err)
  }
}

onMounted( async () => {
  await getCookie();
  
    if (decodedToken.value) {
    // ดึงตะกร้าปัจจุบันเมื่อล็อกอิน
    await chkCart();
  }

  // ฟังทุกเหตุการณ์ที่เกี่ยวข้อง
  EventBus.on('login_ok', () => {
    getCookie();
    chkCart();
  });
  
  EventBus.on('cart_updated', chkCart);
  EventBus.on('cart_deleted', chkCart);
  EventBus.on('checkout_completed', chkCart);
});

onUnmounted(() => {
  // ทำความสะอาด event listeners
  EventBus.off('login_ok');
  EventBus.off('cart_updated');
  EventBus.off('cart_deleted');
  EventBus.off('checkout_completed');
});
</script>