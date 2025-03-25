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
      // {
      //   path: "profile",
      //   name: "Profile",
      //   component: ProfilePage,
      // },
      // {
      //   path: "Profile",
      //   name: "Profile",
      //   component: ProfilePage
      // },
      {
        path: "checkout",
        name: "Checkout",
        component: CheckoutPage,
      },
      {
        path: "dropdown",
        name: "Dropdown",
        component: DropdownlistPage,
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
  {
    path: "/profile",
    components: ProfileLayout,
    children: [
      {
        path: "",
        name: "profile",
        components: Profile,
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;