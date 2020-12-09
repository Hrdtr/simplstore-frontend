<template>
  <div>
    <div class="text-2xl mb-6">
      <span>Product: {{ $route.params.code }}</span>
    </div>
    <form
      class="w-full flex flex-col text-gray-800"
      @submit.prevent="saveChanges"
    >
      <div class="mb-5 w-full max-w-xl">
        <label class="block text-xs font-normal mb-2 uppercase tracking-wider">
          Code
        </label>
        <input
          v-model="product.code"
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
          v-model="product.name"
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
          v-model="product.category"
          class="border appearance-none bg-gray-100 rounded w-full py-2 px-3 focus:outline-none"
        >
          <option v-for="(c, i) in categories" :key="i" :value="c">
            {{ c }}
          </option>
          <option value="new">Add new</option>
        </select>
        <div v-if="product.category === 'new'" class="mt-4">
          <input
            v-model="product.newCategory"
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
          v-if="product.photos.length === 0"
          class="w-full flex flex-wrap -m-2"
        >
          <div class="p-2">
            <FormImagePreview />
          </div>
        </div>
        <div v-else class="w-full flex flex-wrap -m-2">
          <div v-for="(p, i) in product.photos" :key="i" class="p-2 relative">
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
          v-model="product.description"
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
          v-model="product.price"
          class="border appearance-none bg-gray-100 rounded w-full py-2 px-3 focus:outline-none"
          placeholder="Product price"
          required
        />
      </div>
      <div class="mb-5 flex flex-row items-center w-full max-w-xl">
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
          <span class="text-white">Save Changes</span>
        </button>
        <button
          type="button"
          class="ml-3 mt-3 flex flex-row items-center justify-center rounded-md border border-transparent px-4 py-2 bg-red-600 text-sm leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-500 focus:shadow-none transition ease-in-out duration-150 sm:leading-5"
          @click.prevent="deleteProduct"
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
      const product = await $axios.get(
        `${store.state.env.apiUrl || 'http://localhost:4000'}/product/${
          route.params.code
        }`
      )
      return {
        products: products.data,
        product: product.data,
      }
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      showImgPicker: false,
      submitting: false,
      deleting: false,
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
      return this.product.code
    },
  },
  watch: {
    code(val) {
      this.codeInvalid = /([^a-z-\d])/.test(val)
    },
  },
  methods: {
    async saveChanges() {
      this.submitting = true
      const payload = {
        code: this.product.code,
        name: this.product.name,
        photos: this.product.photos,
        category:
          this.product.category === 'new'
            ? this.product.newCategory
            : this.product.category,
        description: this.product.description,
        price: this.product.price,
        createdAt: this.product.createdAt,
        updatedAt: new Date(),
      }
      try {
        const res = await this.$axios.patch(
          `${this.$store.state.env.apiUrl || 'http://localhost:4000'}/product/${
            this.$route.params.code
          }`,
          payload
        )
        const products = await this.$axios.get(
          `${this.$store.state.env.apiUrl || 'http://localhost:4000'}/product`
        )
        this.product = res.data.product
        this.products = products.data
        alert(res.data.msg)
        this.submitting = false
        if (this.$route.params.code !== this.product.code)
          this.$router.push(`/admin/product/${this.product.code}`)
      } catch (error) {
        this.submitting = false
        alert(error.response.data.msg)
      }
    },
    imgSelected() {
      if (this.$refs.imgPicker.imageSelectedArr.length === 0) {
        alert('Select an image first')
      } else {
        const arr = [...new Set(this.product.photos)].concat(
          this.$refs.imgPicker.imageSelectedArr.map((p) => p.id)
        )
        if (new Set(arr).size !== arr.length) {
          alert('(Some) Selected photo/s already exist in this product')
        } else {
          this.product.photos = arr
          this.showImgPicker = false
        }
      }
    },
    removePhoto(p) {
      const index = this.product.photos.indexOf(p)
      if (index > -1) {
        this.product.photos.splice(index, 1)
      }
    },
    closeImgPicker() {
      this.showImgPicker = false
      this.$refs.imgPicker.imageSelectedArr = []
    },
    async deleteProduct() {
      if (confirm('Do you really want to delete?')) {
        try {
          const res = await this.$axios.delete(
            `${
              this.$store.state.env.apiUrl || 'http://localhost:4000'
            }/product/${this.$route.params.code}`
          )
          alert(res.data.msg)
          this.$router.push('/admin/product')
        } catch (error) {
          alert(error.response.data.msg)
        }
      }
    },
  },
  head() {
    return {
      title: `Product: ${this.product.code} - ${this.$store.state.sitePreference.data.title} Administration`,
    }
  },
}
</script>

<style></style>
