<template>
    <h1 class="text-xl font-semibold">{{ memEmail }}</h1>
    <table class="w-full border-collapse border border-gray-300 mt-4">
        <thead>
            <tr class="bg-gray-200 text-gray-700 h-10">
                <th class="p-2"></th>
                <th class="p-2">เลขที่</th>
                <th class="p-2">วันที่</th>
                <th class="p-2 text-center">จำนวน</th>
                <th class="p-2 text-right">ยอดเงิน</th>
                <th class="p-2"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(ct, cartId) in cart" :key="cartId" class="h-10 border-b border-gray-300">
                <td class="p-2">{{ ct.row_number }}</td>
                <td class="p-2">
                    <span class="text-blue-600">
                        <router-link :to="`/cartshow/${ct.cartId }`" class="no-underline hover:underline">
                            {{ ct.cartId }}
                        </router-link>
                    </span>
                </td>
                <td class="p-2">{{ formattedDate(ct.cartDate) }}</td>
                <td class="p-2 text-center">{{ (ct.sqty??0) }}</td>
                <td class="p-2 text-right">{{ (ct.sprice??0).toLocaleString() }}</td>
                <td class="p-2 text-center">
                    <i class="bi-x-lg text-red-500 cursor-pointer"></i>
                </td>
            </tr>
        </tbody>
    </table>
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