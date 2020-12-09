<template>
  <div>
    <div class="text-2xl mb-6">
      <span>Carousel: {{ $route.params.code }}</span>
    </div>
    <form
      class="w-full flex flex-col text-gray-800 mb-6"
      @submit.prevent="saveChanges"
    >
      <AssetsManager
        ref="imgPicker"
        :is-visible="showImgPicker"
        @exit="closeImgPicker"
        @selected="imgSelected"
      />
      <div class="mb-5 w-full">
        <label class="block text-xs font-normal mb-2 uppercase tracking-wider">
          Image
        </label>
        <div
          v-if="
            carousel.img === '' ||
            carousel.img === null ||
            carousel.img === undefined
          "
          class="w-full flex flex-wrap -m-2"
        >
          <div class="p-2">
            <FormImagePreview />
          </div>
        </div>
        <div v-else class="w-full flex flex-wrap -m-2">
          <div class="p-2">
            <FormImagePreview
              :src="`${$store.state.env.apiUrl}/img/${carousel.img}`"
            />
          </div>
        </div>
        <button
          type="button"
          class="py-2 px-4 rounded-md border bg-gray-100 hover:bg-white text-gray-600 mt-3 text-sm transition-colors duration-200 font-medium"
          @click="showImgPicker = true"
        >
          Select Image
        </button>
      </div>
      <div class="mb-5 w-full max-w-xl">
        <label class="block text-xs font-normal mb-2 uppercase tracking-wider">
          Text
        </label>
        <input
          v-model="carousel.text"
          class="border appearance-none bg-gray-100 rounded w-full py-2 px-3 focus:outline-none"
          type="text"
          required
          placeholder="Text displayed on top of this carousel"
        />
      </div>
      <div class="mb-5 w-full max-w-xl">
        <label class="block text-xs font-normal mb-2 uppercase tracking-wider">
          Linked Product
        </label>
        <select
          v-model="carousel.productCode"
          class="border appearance-none bg-gray-100 rounded w-full py-2 px-3 focus:outline-none"
          required
        >
          <option v-for="(c, i) in products" :key="i" :value="c.code">
            {{ c.code }}: {{ c.name }}
          </option>
        </select>
      </div>
      <div class="mb-5 flex flex-row items-center w-full max-w-xl">
        <button
          type="submit"
          :disabled="submitting"
          class="mt-3 flex flex-row items-center justify-center rounded-md border border-transparent px-4 py-2 bg-green-600 text-sm leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-500 focus:shadow-none transition ease-in-out duration-150 sm:leading-5"
        >
          <svg
            v-if="submitting"
            class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="#ffffff"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="#ffffff"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span class="text-white">Save Changes</span>
        </button>
        <button
          type="button"
          class="ml-3 mt-3 flex flex-row items-center justify-center rounded-md border border-transparent px-4 py-2 bg-red-600 text-sm leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-500 focus:shadow-none transition ease-in-out duration-150 sm:leading-5"
          @click.prevent="deleteCarousel"
        >
          <svg
            v-if="deleting"
            class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="#ffffff"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="#ffffff"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span class="text-white">Delete</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'admin',
  async asyncData({ store, $axios, route }) {
    try {
      const products = await $axios.get(
        `${store.state.env.apiUrl || 'http://localhost:4000'}/product`
      )
      const carousel = await $axios.get(
        `${store.state.env.apiUrl || 'http://localhost:4000'}/carousel`
      )
      return {
        products: products.data,
        carousel: carousel.data.filter(
          (c) => c.productCode === route.params.code
        )[0],
      }
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      carousel: {
        img: null,
      },
      showImgPicker: false,
      submitting: false,
      deleting: false,
    }
  },
  methods: {
    async saveChanges() {
      if (
        this.carousel.img === null ||
        this.carousel.img === '' ||
        this.carousel.img === undefined
      ) {
        alert('Select a carousel image first')
      } else {
        this.submitting = true
        const payload = {
          img: this.carousel.img,
          text: this.carousel.text,
          productCode: this.carousel.productCode,
          createdAt: this.carousel.productCode,
          updatedAt: new Date(),
        }
        try {
          const res = await this.$axios.patch(
            `${
              this.$store.state.env.apiUrl || 'http://localhost:4000'
            }/carousel/${this.$route.params.code}`,
            payload
          )
          alert(res.data.msg)
          this.submitting = false
          this.carousel = res.data.carousel
          if (this.$route.params.code !== this.carousel.productCode)
            this.$router.push(`/admin/carousel/${this.carousel.productCode}`)
        } catch (error) {
          this.submitting = false
          alert(error.response.data.msg)
        }
      }
    },
    async deleteCarousel() {
      this.deleting = true
      if (confirm('Do you really want to delete?')) {
        try {
          const res = await this.$axios.delete(
            `${
              this.$store.state.env.apiUrl || 'http://localhost:4000'
            }/carousel/${this.$route.params.code}`
          )
          alert(res.data.msg)
          this.deleting = false
          this.$router.push('/admin/carousel')
        } catch (error) {
          alert(error.response.data.msg)
          this.deleting = false
        }
      }
    },
    imgSelected() {
      if (this.$refs.imgPicker.imageSelected.id === undefined) {
        alert('Select an image first')
      } else if (this.carousel.img === this.$refs.imgPicker.imageSelected.id) {
        alert(
          'Selected image is current carousel image, please select the other one'
        )
      } else {
        this.carousel.img = this.$refs.imgPicker.imageSelected.id
        this.showImgPicker = false
        this.$refs.imgPicker.imageSelected = {}
      }
    },
    closeImgPicker() {
      this.showImgPicker = false
      this.$refs.imgPicker.imageSelected = {}
    },
  },
  head() {
    return {
      title: `Carousel: ${this.$route.params.code} - ${this.$store.state.sitePreference.data.title} Administration`,
    }
  },
}
</script>

<style></style>
