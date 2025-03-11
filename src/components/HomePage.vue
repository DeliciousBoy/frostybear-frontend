<template>
  <div class="bg-white animate__animated animate__fadeIn">

    <header class="bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Trending products</h1>
      </div>
    </header>

  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8">

      <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <a v-for="product in products" :key="product.id" :href="product.href" class="group">
          <img :src="product.imageSrc" :alt="product.imageAlt"
            class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
          <h3 class="mt-4 text-sm text-gray-700">{{ product.name }}</h3>
          <p class="mt-1 text-lg font-medium text-gray-900">{{ product.price }}</p>
        </a>
      </div>
    </div>
  </div>

      <!-- <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <div v-for="product in products" :key="product.id" class="group box relative">
          <div v-for="n in 8" :key="n" class="hover-point"></div>
          <div class="box-contents">
            <img :src="product.imageSrc" :alt="product.imageAlt"
              class="aspect-square w-full rounded-lg bg-gray-200 object-cover xl:aspect-7/8" />
          </div>

          <h3 class="mt-4 text-sm text-gray-700 z-10 relative">{{ product.name }}</h3>
          <p class="mt-1 text-lg font-medium text-gray-900 z-10 relative">{{ product.price }}</p>
        </div>
      </div>
    </div>
  </div> -->
  
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getTrendProduct } from "../services/productService";

const products = ref([]);

onMounted(async () => {
  products.value = await getTrendProduct();
});
</script>

<style scoped>
.box {
  position: relative;
  width: 100%;
  height: 300px;
}
.box-contents {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: .5s ease;
}
.hover-point {
  position: absolute;
  z-index: 2;
  width: calc(100% / 3);
  height: calc(100% / 3);
}
.hover-point:nth-child(1) { top: 0; left: 0; }
.hover-point:nth-child(2) { top: 0; left: calc(100% / 3); }
.hover-point:nth-child(3) { top: 0; right: 0; }
.hover-point:nth-child(4) { top: calc(100% / 3); left: 0; }
.hover-point:nth-child(5) { top: calc(100% / 3); right: 0; }
.hover-point:nth-child(6) { bottom: 0; left: 0; }
.hover-point:nth-child(7) { bottom: 0; left: calc(100% / 3); }
.hover-point:nth-child(8) { bottom: 0; right: 0; }

.hover-point:nth-child(1):hover ~ .box-contents {
  transform: perspective(1000px) rotateX(10deg) rotateY(-10deg);
}
.hover-point:nth-child(2):hover ~ .box-contents {
  transform: perspective(1000px) rotateX(10deg);
}
.hover-point:nth-child(3):hover ~ .box-contents {
  transform: perspective(1000px) rotateX(10deg) rotateY(10deg);
}
.hover-point:nth-child(4):hover ~ .box-contents {
  transform: perspective(1000px) rotateY(-10deg);
}
.hover-point:nth-child(5):hover ~ .box-contents {
  transform: perspective(1000px) rotateY(10deg);
}
.hover-point:nth-child(6):hover ~ .box-contents {
  transform: perspective(1000px) rotateX(-10deg) rotateY(-10deg);
}
.hover-point:nth-child(7):hover ~ .box-contents {
  transform: perspective(1000px) rotateX(-10deg);
}
.hover-point:nth-child(8):hover ~ .box-contents {
  transform: perspective(1000px) rotateX(-10deg) rotateY(10deg);
}
</style>