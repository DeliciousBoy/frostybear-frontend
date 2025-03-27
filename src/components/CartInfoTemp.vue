<template>
  <div class="relative inline-block">
    <!-- ไอคอนตะกร้าสินค้า -->
    <font-awesome-icon 
      :icon="['fas', 'cart-shopping']" 
      class="text-gray-600 hover:text-indigo-600 text-2xl cursor-pointer transition-colors"
      @click="cartId && $router.push(`/cartshow/${cartId}`)"
    />
    
    <!-- จำนวนสินค้า (แสดงเมื่อมีสินค้า) -->
    <span 
      v-if="cartId && qty > 0"
      class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
    >
      {{ qty }}
    </span>
  </div>
</template>

<script>
// import { ref, onMounted, onUnmounted } from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
axios.defaults.withCredentials = true;
import { EventBus } from "../event-bus";
import { library } from '@fortawesome/fontawesome-svg-core'

// const cartItems = ref([])
// const cartTotal = ref(0)

// const fetchCartData = async () => {
//   try {
//     const response = await axios.get('http://localhost:3000/carts/getcart', {
//       withCredentials: true
//     })
//     if (response.data.success) {
//       cartItems.value = response.data.cartItems
//       cartTotal.value = response.data.total
//     }
//   } catch (err) {
//     console.error('Error fetching cart:', err)
//   }
// }

export default {
  name: "CartInfoTemp",
    components: {
    FontAwesomeIcon
  },
  data() {
    return {
      cartId: null,
      qty: 0,
      money: 0,
      id: null,
    };
  },
  async created() {
    // ตัวอย่างการกำหนดค่า icon (ควรทำใน main.js หรือไฟล์ตั้งค่า FontAwesome)
    library.add(faCartShopping);
    await this.loadPersistentCart();
  },
  async mounted() {
    //เริ่มใช้ Component ก็ให้ส่งสัญญานให้แสดงผล
    //  fetchCartData()
    // ฟังทุกเหตุการณ์ที่เกี่ยวข้อง
    EventBus.on("cartdtlOK", (data) => {
      this.sumCart(data.id);
    });

    EventBus.on("cart_updated", async () => {
      await this.fetchCurrentCart();
    });

    EventBus.on("cart_deleted", () => {
      this.clearCart();
    });

    EventBus.on("checkout_completed", () => {
      this.clearCart();
    });

    EventBus.on("memlogout", () => {
      this.clearCart();
    });
  },
  methods: {
      async loadPersistentCart() {
      try {
        // ตรวจสอบว่ามีตะกร้าที่ยังไม่ยืนยันของลูกค้าหรือไม่
        const response = await axios.get('http://localhost:3000/carts/current', {
          withCredentials: true
        });
        
        if (response.data.cartId) {
          this.sumCart(response.data.cartId);
        }
      } catch (err) {
        console.error('Error loading persistent cart:', err);
      }
    },
    async sumCart(cid) {
      console.log(`sumCart${cid}`);
      await axios
        .get(`http://localhost:3000/carts/sumcart/${cid}`)
        .then((res) => {
          console.log("SumCart" + res.data);
          this.cartId = res.data.id;
          this.qty = res.data.qty;
          this.money = res.data.money;
          console.log("ResultCART!", this.cartId);
        })
        .catch((err) => {
          console.error(err);
          this.clearCart();
        });
    },
    clearCart() {
      console.log("Clear Cart");
      this.cartId = null;
      this.qty = 0;
      this.money = 0;
    },
    async fetchCurrentCart() {
    try {
        const response = await axios.get('http://localhost:3000/carts/current', {
        withCredentials: true
        });
        
        if (response.data.cartId) {
        this.sumCart(response.data.cartId);
        } else {
        this.clearCart();
        }
    } catch (err) {
        console.error('Error fetching current cart:', err);
        this.clearCart();
    }
    },
    onUnmounted() {
      // ทำความสะอาด event listeners
      EventBus.off("cartdtlOK");
      EventBus.off("cart_updated");
      EventBus.off("cart_deleted");
      EventBus.off("checkout_completed");
      EventBus.off("memlogout");
    },
  },
};
</script>

<style scoped>
/* Animation สำหรับเมื่อมีสินค้าเพิ่ม */
span {
  transition: all 0.3s ease;
  transform: scale(1);
}

span:hover {
  transform: scale(1.1);
}
</style>