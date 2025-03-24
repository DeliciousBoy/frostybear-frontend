import './assets/main.css'
import "animate.css";
import 'font-awesome/css/font-awesome.min.css';
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import './assets/main.css'

createApp(App).use(router, ToastPlugin).mount("#app");