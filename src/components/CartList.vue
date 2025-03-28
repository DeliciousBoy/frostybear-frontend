<template>
  <div class="p-6 bg-gray-50 min-h-screen animate__animated animate__fadeIn">
    <div class="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
      <div class="bg-gradient-to-r from-pink-400 to-red-400 p-4 text-white text-lg font-semibold">
        🛒 ประวัติการสั่งซื้อของคุณ
      </div>
      
      <!-- เพิ่ม div ครอบตารางเพื่อให้ scroll ได้ -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse" style="min-width: 800px">
          <thead>
            <tr class="bg-gray-200 text-gray-700 text-sm uppercase">
              <th class="p-4 w-1/12 text-center">#</th>
              <th class="p-4 w-2/12 text-left">เลขที่คำสั่งซื้อ</th>
              <th class="p-4 w-3/12 text-left">วันที่สั่งซื้อ</th>
              <th class="p-4 w-2/12 text-center">จำนวน</th>
              <th class="p-4 w-3/12 text-end">ยอดเงิน</th>
              <!-- <th class="p-4 w-1/12 text-center">ลบ</th> -->
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(ct, cartId) in cart"
              :key="cartId"
              class="border-b border-gray-300 hover:bg-gray-100 transition-all duration-200"
            >
              <td class="p-4 text-center font-semibold text-gray-600">{{ ct.row_number }}</td>
              <td class="p-4">
                <router-link
                  :to="`/cartshow/${ct.cartId}`"
                  class="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  {{ ct.cartId }}
                </router-link>
              </td>
              <td class="p-4 text-gray-600">{{ formattedDate(ct.cartDate) }}</td>
              <td class="p-4 text-center text-gray-700 font-medium">{{ ct.sqty ?? 0 }}</td>
              <td class="p-4 text-end text-green-600 font-semibold">
                ฿{{ (ct.sprice ?? 0).toLocaleString() }}
              </td>
              <td class="p-4 text-center">
                <button class="text-red-500 hover:text-red-700 transition-all duration-200">
                  <i class="bi-x-lg text-xl"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true
import Cookies from 'js-cookie' //imporo js-cookie มาใช้งาน
import {jwtDecode} from 'jwt-decode'; //ใช้แทน jsonwebtoken เพราะ jsonwebtoken ไม่เข้ากับ Vue.js
export default {
    name:"CartList",
    data(){
        return{
            memEmail:null,
            decodedToken:null,
            cart:[] //รับข้อมูลตะกร้า
        }
    },
    async mounted(){
        await this.getCookie() //อ่านข้อมูลจาก Cookie
        await this.getCartList() //อ่านข้อมูล Cart
    },
    methods:{
        formattedDate(dateStr) {
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = String(date.getMonth()+ 1).padStart(2, '0'); // เดือนเริ่มต้นที่ 0, จึงต้อง +1
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        async getCartList() {
            let customer = {  id:this.memEmail }
            console.log('Get CartLIST')
            await axios.post(`http://localhost:3000/carts/getcartbycus`,customer)
                .then(res => {
                    console.log("Cart \n" + res.data)
                    this.cart = res.data
                    this.cusId = res.data[0].cusId
                })
                .catch(err => { console.error(err); });
        },
        getCookie() {
            try{
                this.token = Cookies.get('token');
                this.decodedToken = jwtDecode(this.token)
                this.memEmail=this.decodedToken.memEmail
            }catch(err){
                console.error(`fail decode token ${err}`)
                this.decodedToken=null
            }
        },
    }
}
</script>
<style></style>