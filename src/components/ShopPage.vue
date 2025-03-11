<template>
  <div class="bg-white animate__animated animate__fadeIn">
    <div>
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="mobileFiltersOpen">
        <Dialog class="relative z-40 lg:hidden" @close="mobileFiltersOpen = false">
          <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
            enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
            leave-to="opacity-0">
            <div class="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div class="fixed inset-0 z-40 flex">
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
              enter-from="translate-x-full" enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
              leave-to="translate-x-full">
              <DialogPanel
                class="relative ml-auto flex size-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div class="flex items-center justify-between px-4">
                  <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                  <button type="button"
                    class="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    @click="mobileFiltersOpen = false">
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon class="size-6" aria-hidden="true" />
                  </button>
                </div>

                <!-- Filters -->
                <form class="mt-4 border-t border-gray-200">
                  <h3 class="sr-only">Categories</h3>
                <ul role="list" class="px-2 py-3 font-medium text-gray-900">
                    <li v-for="category in subCategories" :key="category.name">
                      <a href="#" @click.prevent="handleCategoryClick(category)" class="block px-2 py-3">
                        {{ category.name }} test
                      </a>
                    </li>
                  </ul>

                  <Disclosure as="div" v-for="section in filters" :key="section.id"
                    class="border-t border-gray-200 px-4 py-6" v-slot="{ open }">
                    <h3 class="-mx-2 -my-3 flow-root">
                      <DisclosureButton
                        class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span class="font-medium text-gray-900">{{ section.name }}</span>
                        <span class="ml-6 flex items-center">
                          <PlusIcon v-if="!open" class="size-5" aria-hidden="true" />
                          <MinusIcon v-else class="size-5" aria-hidden="true" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel class="pt-6">
                      <div class="space-y-6">
                      <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex gap-3">
                        <div class="flex h-5 shrink-0 items-center">
                          <input 
                            :id="`filter-${section.id}-${optionIdx}`" 
                            :name="`${section.id}[]`" 
                            :value="option.value" 
                            type="checkbox" 
                            :checked="option.checked" 
                            @change="handleFilterClick(option)"
                            class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" 
                          />
                          <label :for="`filter-${section.id}-${optionIdx}`" class="text-sm text-gray-600">
                            {{ option.label }}
                          </label>
                        </div>
                      </div>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>

      <main class="mx-auto w-screen px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn">
        <div class="flex items-baseline justify-between border-b border-gray-200 pt-5 pb-6">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900">FrostyBear Shop</h1>

          <div class="flex items-center">
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton
                  class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon class="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true" />
                </MenuButton>
              </div>

              <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 focus:outline-hidden">
                  <div class="py-1">
                    <MenuItem v-for="option in sortOptions" :key="option.name" v-slot="{ active }">
                    <a :href="option.href"
                      :class="[option.current ? 'font-medium text-gray-900' : 'text-gray-500', active ? 'bg-gray-100 outline-hidden' : '', 'block px-4 py-2 text-sm']">{{ option.name }}</a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

            <button type="button" class="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
              <span class="sr-only">View grid</span>
              <Squares2X2Icon class="size-5" aria-hidden="true" />
            </button>
            <button type="button" class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              @click="mobileFiltersOpen = true">
              <span class="sr-only">Filters</span>
              <FunnelIcon class="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" class="pt-6 pb-24">
          <h2 id="products-heading" class="sr-only">Products</h2>

          <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <!-- Filters -->
            <form class="hidden lg:block">
              <h3 class="sr-only">Categories</h3>
              <ul role="list" class="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                <li v-for="category in subCategories" :key="category.name">
                  <a href="#" @click.prevent="handleCategoryClick(category)">{{ category.name }}</a>
                </li>
              </ul>

              <Disclosure as="div" v-for="section in filters" :key="section.id" class="border-b border-gray-200 py-6"
                v-slot="{ open }">
                <h3 class="-my-3 flow-root">
                  <DisclosureButton
                    class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span class="font-medium text-gray-900">{{ section.name }}</span>
                    <span class="ml-6 flex items-center">
                      <PlusIcon v-if="!open" class="size-5" aria-hidden="true" />
                      <MinusIcon v-else class="size-5" aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel class="pt-6">
                  <div class="space-y-4">
                    <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex gap-3">
                      <div class="flex h-5 shrink-0 items-center">
                        <div class="group grid size-4 grid-cols-1">
                          <input 
                                :id="`filter-${section.id}-${optionIdx}`" 
                                :name="`${section.id}[]`" 
                                :value="option.value" 
                                type="checkbox" 
                                :checked="option.checked" 
                                @change="handleFilterClick(option)"
                                class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" 
                              />
                          <svg
                            class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                            viewBox="0 0 14 14" fill="none">
                            <path class="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" stroke-width="2"
                              stroke-linecap="round" stroke-linejoin="round" />
                            <path class="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" stroke-width="2"
                              stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </div>
                      </div>
                      <label :for="`filter-${section.id}-${optionIdx}`"
                        class="text-sm text-gray-600">{{ option.label }}</label>
                    </div>
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </form>

            <!-- Product grid -->
            <div class="lg:col-span-3">
              <!-- Your content -->
              <!-- <div class="mx-auto w-full px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8"> -->
              <div class="mx-auto w-fill py-16 sm:py-5">
                <!-- <h2 class="sr-only">Products</h2> -->

                <!-- <div
                  class="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
                  @click="handleEvent"> -->

                <div class="flex flex-wrap items-center justify-start gap-8 mt-10 mb-5 pl-[4.688rem]" @click="handleEvent">

                  <div v-for="(product, index) in products" :key="index"
                    class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <a href="#">
                      <img :src="product.imageSrc" alt="Product"
                        class="aspect-square w-full rounded-t-md bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
                      <div class="px-4 py-3 w-72">
                        <span class="text-gray-400 mr-3 uppercase text-xs"> {{ product.detail }}</span>
                        <p class="text-lg font-bold text-black truncate block capitalize">
                          {{ product.name }}
                        </p>
                        <div class="flex items-center">
                          <p class="text-lg font-semibold text-black cursor-auto my-3">
                            {{ product.price }}
                          </p>
                          <!-- <del>
                            <p class="text-sm text-gray-600 cursor-auto ml-2">
                              ${{ product.originalPrice }}
                            </p>
                          </del> -->
                          <div class="ml-auto">
                            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                              class="bi bi-bag-plus" viewBox="0 0 16 16">
                              <path fill-rule="evenodd"
                                d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                              <path
                                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                            </svg> -->

                            <button class="btn btn-white-600" @click="animateCart(product.id)">
                              <font-awesome-icon :icon="cartIconClass" :class="{ 'fa-bounce': product.isBouncing }" />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAllProducts } from '../services/productService'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { getBrandsWithCache, getProductTypesWithCache } from "../services/systemParamService";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/vue/20/solid'

const products = ref([])
const subCategories = ref([]) // เปลี่ยนเป็น ref เพื่อให้สามารถอัปเดตได้
const filters = ref([]) // เปลี่ยนเป็น ref เพื่อให้สามารถอัปเดตได้

onMounted(async () => {
  products.value = await getAllProducts()
  // เพิ่มฟิลด์ isBouncing ให้กับแต่ละสินค้า
  products.value.forEach(product => {
    product.isBouncing = false
  })

  // ดึงข้อมูลแบรนด์และประเภทสินค้า
  try {
    const brands = await getBrandsWithCache()
    const productTypes = await getProductTypesWithCache()

    // แปลงข้อมูลแบรนด์เป็น subCategories
    subCategories.value = brands.map(brand => ({
      name: brand.byte_name,
      href: `#${brand.byte_type}` // หรือ URL ที่คุณต้องการ
    }))

    // แปลงข้อมูลประเภทสินค้าเป็น filters
    filters.value = [
      {
        id: 'product-type',
        name: 'Product Type',
        options: productTypes.map(type => ({
          value: type.byte_type,
          label: type.byte_name,
          checked: false // กำหนดให้ไม่ถูกเลือกเริ่มต้น
        }))
      }
    ]
  } catch (error) {
    console.error("Error fetching data:", error)
  }
})

const handleEvent = (event) => {
  event.preventDefault(); // ป้องกันการทำงานของเหตุการณ์ที่เกิดขึ้น
  console.log('Button was clicked, but default action is prevented.');
}

const handleCategoryClick = async (category) => {
  console.log("Selected category:", category);
  try {
    const filteredProducts = await getAllProducts({ brand_name: category.name });
    console.log("Filtered products by brand:", filteredProducts); // เพิ่ม log เพื่อตรวจสอบ
    products.value = filteredProducts;
  } catch (error) {
    console.error("Error fetching products by brand:", error);
  }
};

const handleFilterClick = async (filter) => {
  console.log("Selected filter:", filter);

  // สลับสถานะ checked
  filter.checked = !filter.checked;

  try {
    // สร้าง array ของ product_type_name ที่ถูกเลือก
    const selectedFilters = filters.value[0].options
      .filter(option => option.checked)
      .map(option => option.label);

    let filteredProducts;
    if (selectedFilters.length > 0) {
      // ถ้ามี filter ที่ถูกเลือก ส่ง array ของ product_type_name ไปยัง API
      filteredProducts = await getAllProducts({ product_type_name: selectedFilters });
    } else {
      // ถ้าไม่มี filter ที่ถูกเลือก ส่ง null เพื่อดึงข้อมูลทั้งหมด
      filteredProducts = await getAllProducts({ product_type_name: null });
    }

    console.log("Filtered products by type:", filteredProducts); // เพิ่ม log เพื่อตรวจสอบ
    products.value = filteredProducts;
  } catch (error) {
    console.error("Error fetching products by type:", error);
  }
};

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

const cartIconClass = ref(faCartPlus);
const isBouncing = ref(false);
let isAnimating = false; // ตัวแปรสำหรับเช็คว่าอนิเมชั่นกำลังทำงานอยู่หรือไม่

const animateCart = (productId) => {
  if (isAnimating) return; // ถ้ามีการอนิเมชั่นอยู่แล้ว ให้ไม่ทำอะไร
  isAnimating = true; // เริ่มอนิเมชั่น
  
  const product = products.value.find(p => p.id === productId);
  
  if (product) {
    product.isBouncing = true;

    // ใช้ requestAnimationFrame เพื่อให้การเปลี่ยนแปลงใน DOM ลื่นไหลขึ้น
    requestAnimationFrame(() => {
      setTimeout(() => {
        product.isBouncing = false;
        isAnimating = false; // เสร็จสิ้นการอนิเมชั่น
      }, 1000);
    });
  }
}

const mobileFiltersOpen = ref(false)
</script>