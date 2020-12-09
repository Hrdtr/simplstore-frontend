<template>
  <div>
    <div class="text-2xl mb-6"><span>Carousel</span></div>
    <div v-if="carousels.length !== 0" class="w-full mb-10">
      <div class="grid grid-cols-12 gap-4">
        <div
          v-for="(c, i) in carousels"
          :key="i"
          class="col-span-12 sm:col-span-6 md:col-span-3"
        >
          <div
            class="flex flex-col bg-white shadow-md rounded-md hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
            @click="$router.push(`/admin/carousel/${c.productCode}`)"
          >
            <div
              class="flex items-center justify-center flex-shrink-0 h-32 w-full overflow-hidden bg-gray-100"
            >
              <img
                :src="`${
                  $store.state.env.apiUrl || 'http://localhost:4000'
                }/img/${c.img}`"
                :alt="`Carousel ${c.text}`"
                class="object-cover"
              />
            </div>
            <div class="flex flex-col flex-grow px-4 py-3">
              <div class="text-sm text-gray-500">{{ c.productCode }}</div>
              <div class="font-bold text-lg">{{ c.text }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="mb-6 text-gray-600">
      No carousel found. You can add new one by fill form below.
    </div>
    <div class="text-xl mb-6 text-gray-800"><span>Add New Carousel</span></div>
    <form
      class="w-full flex flex-col text-gray-800 mb-6"
      @submit.prevent="addCarousel"
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
            newCarousel.img === '' ||
            newCarousel.img === null ||
            newCarousel.img === undefined
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
              :src="`${
                $store.state.env.apiUrl || 'http://localhost:4000'
              }/img/${newCarousel.img}`"
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
          v-model="newCarousel.text"
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
          v-model="newCarousel.productCode"
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
      </div>
    </form>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'admin',
  async asyncData({ store, $axios }) {
    try {
      const products = await $axios.get(
        `${store.state.env.apiUrl || 'http://localhost:4000'}/product`
      )
      const carousels = await $axios.get(
        `${store.state.env.apiUrl || 'http://localhost:4000'}/carousel`
      )
      return {
        products: products.data,
        carousels: carousels.data,
      }
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      newCarousel: {
        img: null,
      },
      showImgPicker: false,
      submitting: false,
    }
  },
  computed: {
    categories() {
      const map = this.products.map((c) => {
        return c.category
      })
      return [...new Set(map)]
    },
  },
  methods: {
    async addCarousel() {
      if (
        this.newCarousel.img === null ||
        this.newCarousel.img === '' ||
        this.newCarousel.img === undefined
      ) {
        alert('Select a carousel image first')
      } else {
        this.submitting = true
        const payload = {
          img: this.newCarousel.img,
          text: this.newCarousel.text,
          productCode: this.newCarousel.productCode,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        try {
          const res = await this.$axios.post(
            `${
              this.$store.state.env.apiUrl || 'http://localhost:4000'
            }/carousel`,
            payload
          )
          alert(res.data.msg)
          this.submitting = false
          this.carousels.push(res.data.carousel)
          this.newCarousel = { img: null }
        } catch (error) {
          this.submitting = false
          alert(error.response.data.msg)
        }
      }
    },
    imgSelected() {
      if (this.$refs.imgPicker.imageSelected.id === undefined) {
        alert('Select an image first')
      } else if (
        this.newCarousel.img === this.$refs.imgPicker.imageSelected.id
      ) {
        alert(
          'Selected image is current carousel image, please select the other one'
        )
      } else {
        this.newCarousel.img = this.$refs.imgPicker.imageSelected.id
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
      title: `Carousel - ${this.$store.state.sitePreference.data.title} Administration`,
    }
  },
}
</script>

<style></style>
