<template>
  <div v-if="username == cusId">
    <div v-for="(ct, index) in cart" :key="index" class="mt-5">
      <div class="bg-gray-100 p-5 rounded-lg shadow-md">
        <div>
          <h4 class="text-xl font-semibold text-blue-600 opacity-75">
            คำสั่งซื้อเลขที่ {{ ct.cartId }}
          </h4>
          <h5 class="mt-2 text-gray-600">
            สั่งซื้อวันที่ {{ formattedDate(ct.cartDate) }}
          </h5>
          <div class="text-red-500 text-right font-medium">
            จำนวนสินค้า {{ ct.sqty }} ชิ้น, ยอดเงิน
            {{ (ct.sprice ?? 0).toLocaleString() }} บาท
          </div>
          <hr class="my-3 border-gray-300" />
          
          <!-- ส่วนที่แก้ไข: เงื่อนไขแสดงปุ่ม -->
          <div class="flex justify-between">
            <template v-if="!ct.cartCf">
              <button
                class="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                @click="deleteCart"
              >
                <i class="bi-cart-x-fill"></i> ลบตะกร้าสินค้า
              </button>
              <button
                class="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                @click="confirmCart"
              >
                <i class="bi-currency-dollar"></i> ยืนยันสั่งสินค้า
              </button>
            </template>
            <div v-else class="w-full bg-green-100 text-green-800 p-3 rounded-lg text-center">
              <i class="bi-check-circle-fill mr-2"></i> ยืนยันคำสั่งซื้อแล้ว
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ส่วน Detail Table (เดิม) -->
    <table class="w-full mt-3 border-collapse border border-gray-300 text-left">
      <thead>
        <tr class="bg-gray-200 text-gray-700">
          <th class="p-2"></th>
          <th class="p-2">สินค้า</th>
          <th class="p-2"></th>
          <th class="p-2 text-right">ราคาต่อหน่วย</th>
          <th class="p-2 text-center">จำนวน</th>
          <th class="p-2 text-right">เป็นเงิน</th>
          <th class="p-2"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(ctd, pdId) in cartDtl"
          :key="pdId"
          class="border-b border-gray-300"
        >
          <td class="p-2">{{ ctd.row_number }}</td>
          <td class="p-2">{{ ctd.pdId }}</td>
          <td class="p-2">{{ ctd.pdName }}</td>
          <td class="p-2 text-right">{{ ctd.price }}</td>
          <td class="p-2 text-center">{{ ctd.qty }}</td>
          <td class="p-2 text-right">
            {{ (ctd.price * ctd.qty ?? 0).toLocaleString() }}
          </td>
          <td class="p-2 text-center">
            <i class="bi-x-lg text-red-500 cursor-pointer"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <div class="bg-red-100 text-red-700 p-4 rounded-lg mt-5">
      คุณไม่มีสิทธิ์ดูรายการนี้
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
import { EventBus } from "../event-bus";
import Cookies from "js-cookie"; //imporo js-cookie มาใช้งาน
import { jwtDecode } from "jwt-decode"; //ใช้แทน jsonwebtoken เพราะ jsonwebtoken ไม่เข้ากับ Vue.js

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
          this.$router.push("/checkout");
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