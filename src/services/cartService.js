import axios from 'axios';
axios.defaults.withCredentials = true;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const API_URL = `${API_BASE_URL}/carts`;

export default {
    async checkCart(data) {
      return axios.post(`${API_URL}/cart/chk`, data);
    },
    
    async createCart(data) {
      return axios.post(`${API_URL}/cart`, data);
    },
    
    async addToCart(data) {
      return axios.post(`${API_URL}/cart/detail`, data);
    },
    
    async sumCart(cartId) {
      return axios.get(`${API_URL}/cart/sum/${cartId}`);
    },
    
    async getCartDetails(cartId) {
      return axios.get(`${API_URL}/cart/detail/${cartId}`);
    }
  };