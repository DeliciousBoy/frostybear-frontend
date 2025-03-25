<template>
  <!-- overlay ของ modal -->
  <div class="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center z-[9999]" @click.self="cancel">
    <!-- container ของ modal -->
    <div class="bg-white rounded-lg w-[400px] max-w-[90%] p-6 text-center relative">
      <!-- ไอคอนถังขยะ -->
      <div class="mb-2">
        <i class="fa fa-trash fa-3x text-red-600"></i>
      </div>
      <!-- หัวข้อ -->
      <h2 class="text-xl font-semibold mb-2">
        Are you sure you want to delete it?
      </h2>
      <!-- รายละเอียด -->
      <p class="text-gray-600 mb-6">
        You are about to permanently delete the following product: <strong>{{ DeleteData.name }}</strong>. This action cannot be undone.
      </p>
      <!-- ปุ่มต่าง ๆ -->
      <div class="flex justify-center gap-4">
        <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded" @click="confirmDelete">
          Delete
        </button>
        <button class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded" @click="cancel">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive,defineEmits } from 'vue'

// กำหนด event ที่จะส่งออกไปให้ Parent
const emits = defineEmits(['confirm', 'cancel'])

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const DeleteData = reactive({
  name: props.product.name,
  // price: props.product.price,
  // brand: props.product.brand_name,
  // product_type: props.product.product_type,
})



// ฟังก์ชันเมื่อกดปุ่ม Delete
function confirmDelete() {
  emits('confirm')
}

// ฟังก์ชันเมื่อกดปุ่ม Cancel หรือคลิกที่พื้นที่นอก modal
function cancel() {
  emits('cancel')
}
</script>
