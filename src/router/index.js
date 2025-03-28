import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import ProfileLayout from "@/layouts/ProfileLayout.vue";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import ShopPage from "@/pages/ShopPage.vue";
import CheckoutPage from "@/pages/CheckoutPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import ChangePasswordPage from "@/pages/ChangePasswordPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import DropdownlistPage from "@/pages/DropdownlistPage.vue";
import Profile from "@/components/Profile.vue";
import { components } from "daisyui/imports";
import CartShow from "../components/CartShow.vue"
import CartList from "../components/CartList.vue"
import ProductShow from "../components/ProductShow.vue"
import Cookies from 'js-cookie';

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: HomePage,
      },
      {
        path: "shop",
        name: "Shop",
        component: ShopPage,
      },
      {
        path: "Profile",
        name: "Profile",
        component: ProfilePage
      },
      {
        path: "history",
        name: "History",
        component: CheckoutPage,
        meta: { requiresAuth: true }
      },
      {
        path: "dropdown",
        name: "Dropdown",
        component: DropdownlistPage,
      },
      {
        // กำหนดว่า route นี้รับ parameter ต้องระบุให้ตรงกันด้วย
        path: '/products/:id',
        name: 'ProductShow',
        component: ProductShow
      },
      {
        // กำหนดว่า route นี้รับ parameter ต้องระบุให้ตรงกันด้วย
        path: '/cartShow/:cartId',
        name: 'CartShow',
        component: CartShow
    },
    {
        path:'/cartList/',
        name:'CartList',
        component:CartList
    },
    ],
  },
  {
    path: "/login",
    component: AuthLayout,
    children: [
      {
        path: "",
        name: "Login",
        component: LoginPage,
      },
      {
        path: "change-password",
        name: "ChangePasswordPage",
        component: ChangePasswordPage,
      },
      {
        path: "register",
        name: "registerPage",
        component: RegisterPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = Cookies.get('token')
  const isAuthenticated = !!token

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router;