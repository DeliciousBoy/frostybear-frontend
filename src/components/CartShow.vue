<template>
  <div class="max-w-8xl mx-auto p-6 animate__animated animate__fadeIn">
    <div v-if="username == cusId">
      <div v-for="(ct, index) in cart" :key="index" class="mt-5">
        <div class="bg-pink-100 p-5 rounded-2xl shadow-lg border border-pink-300">
          <div>
            <h4 class="text-2xl font-bold text-pink-700">
              🍨 คำสั่งซื้อเลขที่ {{ ct.cartId }}
            </h4>
            <h5 class="mt-2 text-gray-600">สั่งซื้อวันที่ {{ formattedDate(ct.cartDate) }}</h5>
            <div class="text-red-600 text-right font-semibold text-lg">
              จำนวนสินค้า {{ ct.sqty }} ชิ้น, ยอดเงิน {{ (ct.sprice ?? 0).toLocaleString() }} บาท
            </div>
            <hr class="my-4 border-pink-300" />
            
            <div class="flex justify-between items-center">
              <template v-if="!ct.cartCf">
                <button
                  class="bg-red-400 text-white px-5 py-2 rounded-xl shadow-md hover:bg-red-500 transition"
                  @click="deleteCart"
                >
                  ลบตะกร้า
                </button>
                <button
                  class="bg-blue-400 text-white px-5 py-2 rounded-xl shadow-md hover:bg-blue-500 transition"
                  @click="confirmCart"
                >
                  ยืนยันสั่งซื้อ
                </button>
              </template>
              <div v-else class="w-full bg-green-200 text-green-800 p-3 rounded-xl text-center font-semibold">
                ยืนยันคำสั่งซื้อแล้ว
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ตารางสินค้า -->
  <div class="overflow-x-auto">
    <table class="w-full mt-6 border-collapse border border-gray-300 text-left bg-white shadow-lg rounded-xl overflow-hidden">
      <thead>
        <tr class="bg-pink-200 text-pink-800">
          <th class="p-4 w-1/12">#</th>
          <th class="p-3 w-3/12 text-left">สินค้า</th>
          <th class="p-3 w-2/12 text-left">ราคาต่อหน่วย</th>
          <th class="p-3 w-2/12 text-center">จำนวน</th>
          <th class="p-4 w-2/12 text-center">เป็นเงิน</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ctd, index) in cartDtl" :key="index" class="border-b border-gray-300 hover:bg-pink-50 transition">
          <td class="p-4 w-1/12">{{ index + 1 }}</td>
          <td class="p-4 w-3/12 text-left">{{ ctd.product_name }}</td>
          <td class="p-4 w-2/12 text-left">{{ ctd.price.toLocaleString() }}</td>
          <td class="p-4 w-2/12 text-center">{{ ctd.qty }}</td>
          <td class="p-4 w-2/12 text-center">{{ (ctd.price * ctd.qty).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>

    </div>
    <div v-else class="bg-red-100 text-red-700 p-4 rounded-xl text-center mt-5">
      ไม่มีสินค้าในตระกร้า
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
import { EventBus } from "../event-bus";
import Cookies from "js-cookie"; //imporo js-cookie มาใช้งาน
import { jwtDecode } from "jwt-decode"; //ใช้แทน jsonwebtoken เพราะ jsonwebtoken ไม่เข้ากับ Vue.js
import { clearCache } from '../../src/services/cacheService'

export default {
  name: "CartShow",
  data() {
    return {
      cart: [], //รับข้อมูล Master
      cartDtl: [], //รับข้อมูล Detail
      cartId: null,
      username: null,
      decodedToken: null,
      cusId: null,
    };
  },
  async mounted() {
    // ตรวจสอบว่าเป็นเจ้าของตะกร้าหรือไม่
    this.getCookie();
    this.cartId = this.$route.params.cartId;
    await this.getCart();
    await this.getCartDtl();
  },
  methods: {
    // แปลงรูปแบบวันที่
    formattedDate(dateStr) {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // เดือนเริ่มต้นที่ 0, จึงต้อง +1
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    async getCart() {
      console.log("Get Cart");
      await axios
        .get(`http://localhost:3000/carts/getcart/${this.cartId}`)
        .then((res) => {
          console.log("Cart \n" + res.data);
          this.cart = res.data;
          this.cusId = res.data[0].cusId;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async getCartDtl() {
      console.log("Get CartCartDtl");
      await axios
        .get(`http://localhost:3000/carts/getcartdtl/${this.cartId}`)
        .then((res) => {
          console.log("CartDtl \n" + res.data);
          this.cartDtl = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async deleteCart() {
      if (!confirm("ยืนยันลบตะกร้าสินค้า?")) return;

      try {
        const response = await axios.delete(
          `http://localhost:3000/carts/${this.cartId}`
        );
        if (response.data.success) {
          alert("ลบตะกร้าสินค้าเรียบร้อยแล้ว");
          // ส่ง event ทั้ง 3 แบบเพื่อให้แน่ใจว่าทุกส่วนอัปเดต
          EventBus.emit("cart_updated");
          EventBus.emit("cart_deleted", { cartId: this.cartId });
          EventBus.emit("cartdtlOK", { id: null });
          clearCache()
          this.$router.push("/");
        }
      } catch (err) {
        console.error("Error deleting cart:", err);
        alert("เกิดข้อผิดพลาดในการลบตะกร้าสินค้า");
      }
    },

    async confirmCart() {
      if (!confirm("ยืนยันสั่งซื้อสินค้าในตะกร้านี้?")) return;

      try {
        const response = await axios.put(
          `http://localhost:3000/carts/confirm/${this.cartId}`
        );
        if (response.data.success) {
          alert("ยืนยันสั่งซื้อเรียบร้อยแล้ว");
          // ส่ง event ทั้งหมดที่เกี่ยวข้อง
          EventBus.emit("checkout_completed");
          EventBus.emit("cart_updated");
          EventBus.emit("cartdtlOK", { id: null });
          clearCache()
          this.$router.push("/history");
        }
      } catch (err) {
        console.error("Error confirming cart:", err);
        alert("เกิดข้อผิดพลาดในการยืนยันสั่งซื้อ");
      }
    },
    getCookie() {
      try {
        this.token = Cookies.get("token");
        this.decodedToken = jwtDecode(this.token);
        this.username = this.decodedToken.username;
      } catch (err) {
        console.error(`fail decode token ${err}`);
        this.decodedToken = null;
      }
    },
  },
};
</script>
<style></style>