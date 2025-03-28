<template>
  <body class="flex justify-start gap-4">
    <div
      class="relative flex w-[400px] items-center rounded-xl bg-[#1E293B] p-6 shadow-lg"
    >
      <!-- Avatar -->
      <div class="h-max w-4/12 overflow-hidden rounded-full bg-gray-700">
        <img src="https://i.postimg.cc/JzBWVhW4/my-avatar.png" alt="avatar" />
      </div>

      <!-- Info -->
      <div class="ml-4">
        <h4 class="text-xl font-semibold text-white">{{ username }}</h4>
        <p
          class="mt-1 w-fit rounded-lg bg-gray-700 px-3 py-1 text-sm text-gray-400"
        >
          {{ role }}
        </p>
      </div>
    </div>

    <!-- Second Container -->
    <div
      class="relative flex w-full items-center rounded-xl bg-[#1E293B] p-6 shadow-lg"
    >
      <div class="ml-4">
       
        <button
          class="mt-2 px-2 py-2 text-white bg-gray-500 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
          onclick="my_modal_3.showModal()"
        >
          Change Username
        </button>
        <dialog id="my_modal_3" class="modal">
          <div class="modal-box">
            <form method="dialog">
              <h4 class="text-xl text-black">Change Password</h4>
              <div class="mb-5 mt-2">
                <input
                  v-model="username"
                  id="username"
                  type="text"
                  placeholder="Username"
                />
                <div class="mt-5">
                  <button
                    class="w-[150px] bg-black h-[40px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
                    type="submit"
                    @click="confirmEditUsername"
                  >
                    Change username
                  </button>
                </div>
              </div>
              <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
          </div>
        </dialog>
      </div>

      <div class="ml-4">
        <button
          class="mt-2 px-2 py-2 text-white bg-gray-500 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
          onclick="my_modal_4.showModal()"
        >
          Change Password
        </button>
        <dialog id="my_modal_4" class="modal">
          <div class="modal-box">
            <form method="dialog">
              <h4 class="text-xl text-black">Change Password</h4>
              <div class="mb-5 mt-2">
                <input
                  v-model="old_password"
                  id="old_password"
                  type="text"
                  placeholder="Old password"
                />
                <input
                  v-model="new_password"
                  id="new_passwords"
                  type="text"
                  placeholder="New password"
                />
                <input
                  v-model="confirm_password"
                  id="confirm_password"
                  type="text"
                  placeholder="Confirm password"
                />
                <div class="mt-5">
                  <button
                    class="w-[150px] bg-black h-[40px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
                    type="submit"
                  >
                    Change password
                  </button>
                </div>
              </div>
              <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  </body>

  <div class="mt-10 mx-auto p-15 bg-base-200 rounded-md shadow">
    <h1 class="text-5xl font-semibold text-gray-800">Profile</h1>
    <p class="mt-1 text-xl text-gray-500">
      This information will be displayed publicly so be careful what you share.
    </p>

    <div class="ml-6 space-y-4">
      <!-- Username -->
      <div
        class="flex items-center justify-between p-4 bg-white rounded shadow"
      >
        <div v-if="!editingUsername">
          <div class="text-xl font-medium text-gray-900 mb-2">Username</div>
          <div class="text-3xl text-black-500">{{ username }}</div>
        </div>
        <div v-else class="flex flex-col">
          <label for="username" class="text-xl font-medium text-gray-900 mb-1"
            >Username</label
          >
          <input
            id="username"
            v-model="tempUsername"
            type="text"
            class="mt-1 block w-full border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 text-3xl"
          />
        </div>

        <!-- ปุ่ม Update / ✔ / ✖ สำหรับ Username -->
        <div>
          <button
            v-if="!editingUsername"
            class="text-2xl text-blue-600 hover:underline"
            @click="startEditUsername"
          >
            Update
          </button>
          <div v-else class="flex items-center space-x-2">
            <button
              class="text-2xl text-green-600 hover:underline"
              @click="confirmEditUsername"
            >
              ✔
            </button>
            <button
              class="text-2xl text-red-600 hover:underline"
              @click="cancelEditUsername"
            >
              ✖
            </button>
          </div>
        </div>
      </div>

      <!-- Role  -->
      <div class="items-center p-4 bg-white rounded shadow">
        <div class="text-xl font-medium text-gray-900 mb-2">Role</div>
        <div class="text-3xl text-black-500">{{ role }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// ข้อมูล Profile
const token = ref("");
const decodedToken = ref(null);
const username = ref(null);
const role = ref(null);
const id = ref(null);

// ตัวแปรและฟังก์ชันสำหรับแก้ไข Username
const editingUsername = ref(false);
const tempUsername = ref("");

onMounted(async () => {
  await getCookie();
});

const getCookie = () => {
  try {
    token.value = Cookies.get("token");
    if (token.value) {
      decodedToken.value = jwtDecode(token.value);
      console.log(`MainMenu-->${decodedToken.value}`);
      id.value = decodedToken.value.id;
      username.value = decodedToken.value.username;
      role.value = decodedToken.value.role;
    } else {
      decodedToken.value = null;
    }
  } catch (err) {
    console.error(`fail decode token ${err}`);
    decodedToken.value = null;
  }
};

function startEditUsername() {
  editingUsername.value = true;
  tempUsername.value = username.value;
}
async function confirmEditUsername() {
  const formData = {
    username: tempUsername.value,
  };
  await axios.put(`http://localhost:3000/putusername/${id.value}`, formData);
  editingUsername.value = false;
}

function cancelEditUsername() {
  editingUsername.value = false;
}
</script>