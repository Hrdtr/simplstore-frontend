<template>
  <transition name="page">
    <div class="fixed inset-0 flex items-center justify-center z-40">
      <div
        class="fixed inset-0 z-40 bg-black bg-opacity-75"
        style="backdrop-filter: blur(3px)"
        @click="$emit('close')"
      ></div>
      <div
        class="h-auto w-full md:w-1/2 p-5 bg-white rounded-none sm:rounded-md shadow-lg text-gray-900 z-50 max-w-2xl mt-32"
      >
        <div class="flex flex-col w-full h-auto">
          <!-- Header -->
          <div class="flex w-full h-auto justify-center items-center mb-4">
            <div
              class="flex w-full h-auto justify-between items-center text-xl md:text-2xl font-bold"
            >
              {{ title }}
            </div>
            <div
              class="flex h-auto justify-center cursor-pointer"
              @click="$emit('close')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <!--Header End-->
          </div>
          <!-- Modal Content-->
          <div class="w-full h-auto p-4 rounded-md bg-gray-200">
            <slot></slot>
          </div>
          <!-- End of Modal Content-->
          <!-- Header -->
          <div class="flex w-full h-auto mt-4">
            <slot name="footer"></slot>
            <!--Header End-->
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Modal',
    },
  },
}
</script>

<style></style>
