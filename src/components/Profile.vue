<template>
    <div v-if="currentTab === 'profile'">
        <div class="mx-auto p-15 bg-base-200 rounded-md shadow">
          <h1 class="text-5xl font-semibold text-gray-800">Profile</h1>
          <p class="mt-1 text-xl text-gray-500">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div class="mt-6 space-y-4">
            <!-- Username -->
            <div class="flex items-center justify-between p-4 bg-white rounded shadow">
              <div v-if="!editingUsername">
                <div class="text-xl font-medium text-gray-900 mb-2">Username</div>
                <div class="text-3xl text-black-500">{{ username }}</div>
              </div>
              <div v-else class="flex flex-col">
                <label for="username" class="text-xl font-medium text-gray-900 mb-1">Username</label>
                <input id="username" v-model="tempUsername" type="text"
                  class="mt-1 block w-full border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 text-3xl" />
              </div>

              <!-- ปุ่ม Update / ✔ / ✖ สำหรับ Username -->
              <div>
                <button v-if="!editingUsername" class="text-2xl text-blue-600 hover:underline"
                  @click="startEditUsername">
                  Update
                </button>
                <div v-else class="flex items-center space-x-2">
                  <button class="text-2xl text-green-600 hover:underline" @click="confirmEditUsername">
                    ✔
                  </button>
                  <button class="text-2xl text-red-600 hover:underline" @click="cancelEditUsername">
                    ✖
                  </button>
                </div>
              </div>
            </div>

            <!-- Role -->
            <div class="items-center p-4 bg-white rounded shadow">
              <div class="text-xl font-medium text-gray-900 mb-2">Role</div>
              <div class="text-3xl text-black-500">{{ role }}</div>
            </div>
          </div>
        </div>
      </div>
</template>