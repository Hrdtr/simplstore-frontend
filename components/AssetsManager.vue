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
          <div
            class="absolute inset-0 bg-black bg-opacity-75"
            style="backdrop-filter: blur(3px)"
          ></div>
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
          class="inline-block align-bottom bg-white rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl md:max-w-3xl lg:max-2-4xl w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white p-6 pb-0">
            <div class="flex flex-col">
              <div class="flex flex-row items-start justify-between">
                <h5 class="text-gray-800 text-xl font-medium">
                  Assets Manager
                </h5>
                <div class="flex flex-row">
                  <button
                    type="button"
                    class="focus:outline-none border border-gray-300 h-8 w-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-all duration-200"
                    @click="showUpload = !showUpload"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="grey"
                    >
                      <path
                        d="M16 16h-3v5h-2v-5h-3l4-4 4 4zm3.479-5.908c-.212-3.951-3.473-7.092-7.479-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h3.5v-2h-3.5c-1.93 0-3.5-1.57-3.5-3.5 0-2.797 2.479-3.833 4.433-3.72-.167-4.218 2.208-6.78 5.567-6.78 3.453 0 5.891 2.797 5.567 6.78 1.745-.046 4.433.751 4.433 3.72 0 1.93-1.57 3.5-3.5 3.5h-3.5v2h3.5c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="ml-3 focus:outline-none border border-red-200 h-8 w-8 rounded-full flex items-center justify-center bg-red-100 hover:bg-red-200 transition-all duration-200"
                    :disabled="deleting"
                    @click.prevent="deleteFile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="red"
                    >
                      <path
                        d="M18.5 15c-2.484 0-4.5 2.015-4.5 4.5s2.016 4.5 4.5 4.5c2.482 0 4.5-2.015 4.5-4.5s-2.018-4.5-4.5-4.5zm2.5 5h-5v-1h5v1zm-5-11v4.501c-.748.313-1.424.765-2 1.319v-5.82c0-.552.447-1 1-1s1 .448 1 1zm-4 0v10c0 .552-.447 1-1 1s-1-.448-1-1v-10c0-.552.447-1 1-1s1 .448 1 1zm1.82 15h-11.82v-18h2v16h8.502c.312.749.765 1.424 1.318 2zm-6.82-16c.553 0 1 .448 1 1v10c0 .552-.447 1-1 1s-1-.448-1-1v-10c0-.552.447-1 1-1zm14-4h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711v2zm-1 2v7.182c-.482-.115-.983-.182-1.5-.182l-.5.025v-7.025h2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div
                v-if="showUpload"
                class="w-full bg-gray-100 p-4 rounded-md mt-4"
              >
                <form
                  class="flex flex-wrap items-center justify-center text-sm"
                  @submit.prevent="uploadFile"
                >
                  <input
                    class="overflow-hidden text-gray-700 bg-white border border-gray-300 mr-0 sm:mr-3 rounded-md p-1"
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
                      class="flex flex-row items-center mr-3 cursor-pointer rounded-md border border-gray-300 px-4 py-2 bg-white leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-600 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 text-sm sm:leading-5"
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
                      <span>Submit</span>
                    </button>
                    <button
                      class="cursor-pointer rounded-md border border-gray-300 px-4 py-2 bg-white leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-600 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 text-sm sm:leading-5"
                      :disabled="submitting"
                      @click.prevent="showUpload = false"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
              <div class="flex my-6 p-4 bg-gray-100 rounded-md">
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
          <div class="bg-gray-50 px-6 pb-6 sm:flex sm:flex-row-reverse">
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
      deleting: false,
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
    async deleteFile() {
      this.deleting = true
      this.refreshing = true
      if (confirm('Do you really want to delete?')) {
        const arr =
          this.imageSelectedArr.length !== 0
            ? this.imageSelectedArr.map((i) => i.id)
            : []
        const payload = [...arr]
        if (this.imageSelected.id !== undefined) {
          payload.push(this.imageSelected.id)
        }
        try {
          const del = await this.$axios.post(
            `${
              this.$store.state.env.apiUrl || 'http://localhost:4000'
            }/img/delete`,
            payload
          )
          try {
            const refresh = await this.$axios.get(
              `${
                this.$store.state.env.apiUrl || 'http://localhost:4000'
              }/img/list`
            )
            this.images = refresh.data
            this.refreshing = false
          } catch (error) {
            alert(error.response.data.msg)
          }
          if (del) {
            this.deleting = false
          }
        } catch (error) {
          alert(error.response.data.msg)
          this.deleting = false
        }
      }
    },
    async uploadFile() {
      this.submitting = true
      this.refreshing = true
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
        try {
          const refresh = await this.$axios.get(
            `${
              this.$store.state.env.apiUrl || 'http://localhost:4000'
            }/img/list`
          )
          this.images = refresh.data
          this.refreshing = false
        } catch (error) {
          alert(error.response.data.msg)
        }
        if (upload) {
          this.submitting = false
        }
      } catch (error) {
        this.submitting = false
        console.log(error)
      }
    },
  },
}
</script>

<style lang="postcss">
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}

.vue-select-image {
  @apply w-full overflow-y-auto;
  max-height: 18rem;
}

.vue-select-image__wrapper {
  @apply w-full h-auto flex flex-wrap items-start justify-start -m-2;
}
.vue-select-image__item {
  @apply p-2 w-1/3;
}

@screen md {
  .vue-select-image__item {
    @apply w-1/5;
  }
}
@screen lg {
  .vue-select-image__item {
    @apply w-1/5;
  }
}
@screen xl {
  .vue-select-image__item {
    @apply w-1/6;
  }
}

.vue-select-image__thumbnail {
  @apply relative w-full bg-gray-100 rounded-md transition-all duration-200 border-2 border-gray-100;
  padding-bottom: 100%;
}

.vue-select-image__thumbnail--selected {
  @apply border-2 border-green-500;
}

.vue-select-image__img {
  @apply absolute top-0 w-full h-full object-contain p-1;
}
</style>
