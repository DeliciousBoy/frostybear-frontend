<template>
  <!-- <input type="number" placeholder="กรุณากรอก" class="input" />
  <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Responsive</button> -->
  <div class="flex justify-center">
    <div class="cardbg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-50 backdrop-saturate-50 backdrop-contrast-50 ">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div class="card-body bg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-50 backdrop-saturate-50 backdrop-contrast-50 ">
        <h2 class="card-title bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-transparent bg-clip-text">Card Title</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div class="card-actions">
          <!-- <button class="btn btn-outline btn-primary">Primary</button> -->

          <!-- Open the modal using ID.showModal() method -->
          <button class="btn btn-primary">Primary</button>

          <dialog id="my_modal_1" class="modal">
            <div class="modal-box">
              <h3 class="text-lg font-bold">Hello!</h3>
              <p class="py-4 ">
                Press ESC key or click the button below to close
              </p>
              <div class="modal-action">
                <form method="dialog">
                  <!-- if there is a button in form, it will close the modal -->
                  <button class="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  </div>
</template>