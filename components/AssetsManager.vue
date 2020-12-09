<template>
  <transition name="page">
    <div v-if="isVisible" class="fixed z-50 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-black bg-opacity-75"></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span
        >&#8203;
        <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl md:max-w-3xl lg:max-2-4xl w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex flex-col">
              <div class="flex flex-row items-center justify-between">
                <h5
                  class="text-gray-600 text-sm tracking-widest font-display rounded-t-lg"
                >
                  ASSETS
                </h5>
                <div
                  v-if="!showUpload"
                  class="cursor-pointer rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:leading-5"
                  @click="showUpload = true"
                >
                  Upload
                </div>
                <div v-else class="">
                  <form
                    class="flex sm:flex-row flex-col sm:items-center items-end ml-3 text-sm"
                    @submit.prevent="uploadFile"
                  >
                    <input
                      class="w-48 mr-0 sm:mr-3 overflow-hidden text-gray-700"
                      type="file"
                      accept="image/x-png,image/x-png,image/gif,image/jpeg"
                      :disabled="submitting"
                      required
                      multiple
                      @change="handleChange"
                    />
                    <button
                      ref="submitButton"
                      type="submit"
                      class="hidden"
                    ></button>
                    <div class="flex flex-row items-center mt-3 sm:mt-0">
                      <button
                        class="flex flex-row items-center mr-3 cursor-pointer rounded-md border border-gray-300 px-4 py-2 bg-white leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 text-sm sm:leading-5"
                        type="submit"
                        :disabled="submitting"
                        @click="$refs.submitButton.click()"
                      >
                        <svg
                          v-if="submitting"
                          class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="#4a5568"
                            stroke-width="4"
                          ></circle>
                          <path
                            class="opacity-75"
                            fill="#4a5568"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Upload</span>
                      </button>
                      <button
                        class="cursor-pointer rounded-md border border-gray-300 px-4 py-2 bg-white leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 text-sm sm:leading-5"
                        :disabled="submitting"
                        @click.prevent="showUpload = false"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div
                class="flex mt-4 py-4 bg-gray-100 rounded-lg h-72 overflow-y-auto"
              >
                <div
                  v-if="refreshing"
                  class="flex flex-row items-center w-full justify-center text-gray-700"
                >
                  <svg
                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#4a5568"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="#4a5568"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>refreshing...</span>
                </div>
                <vue-select-image
                  v-else
                  :is-multiple="multiple"
                  :data-images="dataImages"
                  h="80px"
                  w="80px"
                  @onselectimage="onSelectImage"
                  @onselectmultipleimage="onSelectMultipleImage"
                >
                </vue-select-image>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                @click="$emit('selected')"
              >
                Add
              </button>
            </span>
            <span
              class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto"
            >
              <button
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                @click="$emit('exit')"
              >
                Close
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      defaul: false,
    },
  },
  data() {
    return {
      images: [],
      imageSelected: {},
      imageSelectedArr: [],
      showUpload: false,
      fileForUpload: {},
      submitting: false,
      refreshing: false,
    }
  },
  computed: {
    dataImages() {
      if (this.images.length !== 0) {
        const formatted = this.images.map((a) => {
          return {
            id: a,
            src: `${this.$store.state.env.apiUrl}/img/${a}`,
            alt: a,
          }
        })
        return formatted
      }
      return []
    },
  },
  async created() {
    try {
      const res = await this.$axios.get(
        `${this.$store.state.env.apiUrl || 'http://localhost:4000'}/img/list`
      )
      this.images = res.data
    } catch (error) {
      console.log(error)
    }
  },
  //   mounted() {
  //     console.log(this.dataImages)
  //   },
  methods: {
    onSelectImage(data) {
      this.imageSelected = data
    },
    onSelectMultipleImage(data) {
      this.imageSelectedArr = data
    },
    handleChange(e) {
      this.fileForUpload = e.target.files
    },
    async uploadFile() {
      this.submitting = true
      const data = new FormData()
      for (const i of Object.keys(this.fileForUpload)) {
        data.append('files', this.fileForUpload[i])
      }
      try {
        const upload = await this.$axios.post(
          `${
            this.$store.state.env.apiUrl || 'http://localhost:4000'
          }/img/upload`,
          data
        )
        if (upload) {
          this.submitting = false
          this.refreshing = true
        }
      } catch (error) {
        this.submitting = false
        console.log(error)
      }
      try {
        const refresh = await this.$axios.get(
          `${this.$store.state.env.apiUrl || 'http://localhost:4000'}/img/list`
        )
        this.images = refresh.data
        this.refreshing = false
      } catch (error) {
        console.log(error)
        this.refreshing = false
      }
    },
  },
}
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>
