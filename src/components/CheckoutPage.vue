<template>
  <div class="overflow-x-auto p-6 bg-gray-50 min-h-screen flex justify-center animate__animated animate__fadeIn">
    <div class="w-full max-w-8xl bg-white shadow-lg rounded-lg overflow-hidden">
      <!-- หัวข้อ -->
      <div class="bg-gradient-to-r from-pink-500 to-red-500 p-5 text-white text-lg font-semibold text-start">
        ประวัติคำสั่งซื้อ
      </div>

      <div v-if="cart.length === 0" class="p-6 text-center text-gray-500 text-lg">
        ไม่มีรายการประวัติการสั่งซื้อ
      </div>

      <table v-else class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-200 text-gray-700 text-sm uppercase tracking-wider">
            <th class="p-4 text-center">#</th>
            <th class="p-4 w-1/12 text-center">เลขที่</th>
            <th class="p-4 w-2/12 text-left">วันที่</th>
            <th class="p-4 w-2/12 text-center">จำนวน</th>
            <th class="p-4 w-0/12 text-start">ยอดเงิน</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(ct, cartId) in cart"
            :key="cartId"
            class="border-b border-gray-300 hover:bg-gray-100 transition-all duration-200"
          >
            <td class="p-4  w-0/12 text-center font-semibold text-gray-600">{{ ct.row_number }}</td>
            <td class="p-4 w-5/12 text-center">
              <router-link
                :to="`/cartshow/${ct.cartId}`"
                class="text-blue-600 hover:text-blue-800 font-medium underline"
              >
                {{ ct.cartId }}
              </router-link>
            </td>
            <td class="p-4 text-gray-600">{{ formattedDate(ct.cartDate) }}</td>
            <td class="p-4 w-4/12 text-center text-gray-700 font-medium">{{ ct.sqty ?? 0 }}</td>
            <td class="p-4 w-5/12 text-start text-green-600 font-semibold">
              ฿{{ (ct.sprice ?? 0).toLocaleString() }}
            </td>
          </tr>
        </tbody>
      </table>
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
            username:null,
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
            let customer = {  id:this.username }
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
                this.username=this.decodedToken.username
            }catch(err){
                console.error(`fail decode token ${err}`)
                this.decodedToken=null
            }
        },
    }
}
</script>
<style></style>