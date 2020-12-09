<template>
  <div>
    <div class="text-2xl mb-6"><span>Home</span></div>
    <div class="w-full mb-10">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 sm:col-span-6 md:col-span-3">
          <div
            class="flex flex-row bg-white shadow-md rounded-md hover:shadow-lg transition-all duration-200 p-4 cursor-pointer"
            @click="$router.push('/admin/product')"
          >
            <div
              class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </div>
            <div class="flex flex-col flex-grow ml-4">
              <div class="text-sm text-gray-500">Products</div>
              <div class="font-bold text-lg">{{ totalProduct }}</div>
            </div>
          </div>
        </div>
        <div class="col-span-12 sm:col-span-6 md:col-span-3">
          <div
            class="flex flex-row bg-white shadow-md rounded-md hover:shadow-lg transition-all duration-200 p-4 cursor-pointer"
          >
            <div
              class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-orange-100 text-orange-500"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
            </div>
            <div class="flex flex-col flex-grow ml-4">
              <div class="text-sm text-gray-500">Product Categories</div>
              <div class="font-bold text-lg">{{ totalCategory }}</div>
            </div>
          </div>
        </div>
        <div class="col-span-12 sm:col-span-6 md:col-span-3">
          <div
            class="flex flex-row bg-white shadow-md rounded-md hover:shadow-lg transition-all duration-200 p-4 cursor-pointer"
            @click="$router.push('/admin/carousel')"
          >
            <div
              class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <div class="flex flex-col flex-grow ml-4">
              <div class="text-sm text-gray-500">Carousels</div>
              <div class="font-bold text-lg">{{ totalCarousel }}</div>
            </div>
          </div>
        </div>
        <!-- <div class="col-span-12 sm:col-span-6 md:col-span-3">
          <div class="flex flex-row bg-white shadow-sm rounded p-4">
            <div
              class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-red-100 text-red-500"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="flex flex-col flex-grow ml-4">
              <div class="text-sm text-gray-500">Revenue</div>
              <div class="font-bold text-lg">$ 32k</div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="text-xl mb-6 text-gray-800"><span>Add New Product</span></div>
    <form
      class="w-full flex flex-col text-gray-800"
      @submit.prevent="addProduct"
    >
      <div class="mb-5 w-full max-w-xl">
        <label class="block text-xs font-normal mb-2 uppercase tracking-wider">
          Code
        </label>
        <input
          ref="code"
          v-model="newProduct.code"
          class="border appearance-none bg-gray-100 rounded w-full py-2 px-3 focus:outline-none"
          :class="codeInvalid ? 'border-red-600' : ''"
          type="text"
          required
          placeholder='Product code, eg. "a-21"'
        />
        <span
          class="text-xs"
          :class="codeInvalid ? 'text-red-500' : 'text-gray-500'"
          >Note: Only lowercase alphabet, number, and dash<i>(-)</i> are
          allowed</span
        >
      </div>
      <div class="mb-5 w-full max-w-xl">
        <label class="block text-xs font-normal mb-2 uppercase tracking-wider">
          Name
        </label>
        <input
          v-model="newProduct.name"
          class="border appearance-none bg-gray-100 rounded w-full py-2 px-3 focus:outline-none"
          type="text"
          required
          placeholder="Product name"
        />
      </div>
      <div class="mb-5 w-full max-w-xl">
        <label class="block text-xs font-normal mb-2 uppercase tracking-wider">
          Category
        </label>
        <select
          v-model="newProduct.category"
          class="border appearance-none bg-gray-100 rounded w-full py-2 px-3 focus:outline-none"
        >
          <option v-for="(c, i) in categories" :key="i" :value="c">
            {{ c }}
          </option>
          <option value="new">Add new</option>
        </select>
        <div v-if="newProduct.category === 'new'" class="mt-4">
          <input
            v-model="newProduct.newCategory"
            class="border appearance-none bg-gray-100 rounded w-full py-2 px-3 focus:outline-none"
            type="text"
            required
            placeholder="New category"
          />
        </div>
      </div>
      <AssetsManager
        ref="imgPicker"
        :is-visible="showImgPicker"
        :multiple="true"
        @exit="closeImgPicker"
        @selected="imgSelected"
      />
      <div class="mb-5 w-full">
        <label class="block text-xs font-normal mb-2 uppercase tracking-wider">
          Photos
        </label>
        <div
          v-if="newProduct.photos.length === 0"
          class="w-full flex flex-wrap -m-2"
        >
          <div class="p-2">
            <FormImagePreview />
          </div>
        </div>
        <div v-else class="w-full flex flex-wrap -m-2">
          <div
            v-for="(p, i) in newProduct.photos"
            :key="i"
            class="p-2 relative"
          >
            <FormImagePreview :src="`${$store.state.env.apiUrl}/img/${p}`" />
            <div
              class="absolute h-5 w-5 m-auto bg-red-500 text-white rounded-full top-0 right-0 text-xs text-center cursor-pointer"
              @click="removePhoto(p)"
            >
              x
            </div>
          </div>
        </div>
        <button
          type="button"
          class="py-2 px-4 rounded-md border bg-gray-100 hover:bg-white text-gray-600 mt-3 text-sm transition-colors duration-200 font-medium"
          @click="showImgPicker = true"
        >
          + photos
        </button>
      </div>
      <div class="mb-5 w-full max-w-xl">
        <label class="block text-xs font-normal mb-2 uppercase tracking-wider">
          Description
        </label>
        <textarea
          v-model="newProduct.description"
          class="border appearance-none bg-gray-100 rounded w-full py-2 px-3 focus:outline-none"
          rows="10"
          required
          placeholder="Description"
        />
      </div>
      <div class="mb-5 w-full max-w-xl">
        <label class="block text-xs font-normal mb-2 uppercase tracking-wider">
          Price
        </label>
        <currency-input
          v-model="newProduct.price"
          class="border appearance-none bg-gray-100 rounded w-full py-2 px-3 focus:outline-none"
          placeholder="Product price"
          required
        />
      </div>
      <div class="mb-5 w-full max-w-xl">
        <button
          type="submit"
          :disabled="submitting || codeInvalid"
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
          <span class="text-white">Submit</span>
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
        totalProduct: products.data.length,
        totalCategory: [...new Set(products.data.map((c) => c.category))]
          .length,
        totalCarousel: carousels.data.length,
      }
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      newProduct: {
        createdAt: new Date(),
        photos: [],
      },
      showImgPicker: false,
      submitting: false,
      codeInvalid: false,
    }
  },
  computed: {
    categories() {
      const map = this.products.map((c) => {
        return c.category
      })
      return [...new Set(map)]
    },
    code() {
      return this.newProduct.code
    },
  },
  watch: {
    code(val) {
      this.codeInvalid = /([^a-z-\d])/.test(val)
    },
  },
  methods: {
    async addProduct() {
      this.submitting = true
      const payload = {
        code: this.newProduct.code,
        name: this.newProduct.name,
        photos: this.newProduct.photos,
        category:
          this.newProduct.category === 'new'
            ? this.newProduct.newCategory
            : this.newProduct.category,
        description: this.newProduct.description,
        price: this.newProduct.price,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      try {
        const res = await this.$axios.post(
          `${this.$store.state.env.apiUrl || 'http://localhost:4000'}/product`,
          payload
        )
        alert(res.data.msg)
        this.submitting = false
        this.$router.push(`/admin/product/${res.data.product.code}`)
      } catch (error) {
        this.submitting = false
        alert(error.response.data.msg)
      }
    },
    imgSelected() {
      if (this.$refs.imgPicker.imageSelectedArr.length === 0) {
        alert('Select an image first')
      } else {
        const arr = [...new Set(this.newProduct.photos)].concat(
          this.$refs.imgPicker.imageSelectedArr.map((p) => p.id)
        )
        if (new Set(arr).size !== arr.length) {
          alert('(Some) Selected photo already exist in this product')
        } else {
          this.newProduct.photos = arr
          this.showImgPicker = false
        }
      }
    },
    removePhoto(p) {
      const index = this.newProduct.photos.indexOf(p)
      if (index > -1) {
        this.newProduct.photos.splice(index, 1)
      }
    },
    closeImgPicker() {
      this.showImgPicker = false
      this.$refs.imgPicker.imageSelectedArr = []
    },
  },
  head() {
    return {
      title: `${this.$store.state.sitePreference.data.title} Administration`,
    }
  },
}
</script>

<style></style>
