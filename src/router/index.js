import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import ShopPage from "@/pages/ShopPage.vue";
import CheckoutPage from "@/pages/CheckoutPage.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { 
        path: "",
        name: "Home", 
        component: HomePage 
      },
      {
        path: "shop",
        name: "Shop",
        component: ShopPage
      },
      {
        path: "checkout",
        name: "Checkout",
        component: CheckoutPage
      }
    ],
  },
  {
    path: "/login",
    component: AuthLayout,
    children: [
      {
        path: "",
        name: "Login",
        component: LoginPage 
      },

      /* ถ้าอยากเพิ่มหน้า Register หรือ Change password ก็เพิ่มตรงนี้ได้เลย */
      // { 
      //   path: "register", 
      //   name: "Register", 
      //   component: RegisterPage 
      // },
      // {
      //   path: "change-password",
      //   name: "ChangePassword",
      //   component: ChangePasswordPage,
      // },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;