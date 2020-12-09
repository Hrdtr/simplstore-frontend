<template>
  <div>
    <Carousel />
    <section class="bg-white py-8">
      <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <nav id="store" class="w-full px-6 top-0 py-1">
          <div
            class="w-full flex flex-wrap items-center justify-between mt-0 py-3"
          >
            <span
              class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
              href="#"
            >
              Store
            </span>

            <div id="store-nav-content" class="flex items-center">
              <div>
                <select
                  ref="selectSort"
                  class="bg-white h-10 rounded-md focus:outline-none appearance-none"
                  type="select"
                  name="select"
                  @change="categorySelected($event.target.value)"
                >
                  <option
                    value="null"
                    :selected="
                      stateInfo === 'All Products' ||
                      stateInfo.includes('Search')
                    "
                  >
                    Category
                  </option>
                  <option
                    v-for="(c, i) in productCategories"
                    :key="i"
                    :value="c"
                  >
                    {{ c }}
                  </option>
                </select>
              </div>
              <div class="relative m-auto">
                <button
                  class="pl-3 hover:text-black focus:outline-none mt-2"
                  @click="showSortOptions = !showSortOptions"
                >
                  <svg
                    class="fill-current hover:text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                  </svg>
                </button>
                <div class="absolute right-0 mt-0 z-10">
                  <transition name="page">
                    <form
                      v-if="showSortOptions"
                      class="relative mx-auto text-gray-800"
                    >
                      <select
                        ref="selectSort"
                        class="border border-gray-800 bg-white h-10 px-5 rounded-md focus:outline-none"
                        type="select"
                        name="select"
                        @change="sortOptionSelected($event.target.value)"
                      >
                        <option value="null" :selected="activeSort === 'null'">
                          Sort
                        </option>
                        <option
                          value="name,asc"
                          :selected="activeSort === 'name,asc'"
                        >
                          Name: A-Z
                        </option>
                        <option
                          value="name,desc"
                          :selected="activeSort === 'name,desc'"
                        >
                          Name: Z-A
                        </option>
                        <option
                          value="price,asc"
                          :selected="activeSort === 'price,asc'"
                        >
                          Price: Low-High
                        </option>
                        <option
                          value="price,desc"
                          :selected="activeSort === 'price,desc'"
                        >
                          Price: High-Low
                        </option>
                      </select>
                    </form>
                  </transition>
                </div>
              </div>
              <div class="relative m-auto">
                <button
                  class="pl-3 hover:text-black focus:outline-none mt-2"
                  @click="showSearchInput = !showSearchInput"
                >
                  <svg
                    class="fill-current hover:text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"
                    />
                  </svg>
                </button>
                <div class="absolute right-0 mt-0 z-10">
                  <transition name="page">
                    <form
                      v-if="showSearchInput"
                      class="relative mx-auto text-gray-800"
                      @submit.prevent="search()"
                    >
                      <input
                        ref="searchInput"
                        v-model="searchKeyword"
                        class="border border-gray-800 bg-white h-10 px-5 pr-10 rounded-md focus:outline-none"
                        type="search"
                        name="search"
                        placeholder="Search code or name"
                        required
                      />
                      <button
                        type="submit"
                        class="absolute right-0 top-0 mt-3 mr-4 focus:outline-none"
                      >
                        <svg
                          id="Capa_1"
                          class="text-gray-600 h-4 w-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          version="1.1"
                          x="0px"
                          y="0px"
                          viewBox="0 0 56.966 56.966"
                          style="enable-background: new 0 0 56.966 56.966"
                          xml:space="preserve"
                          width="512px"
                          height="512px"
                        >
                          <path
                            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                          />
                        </svg>
                      </button>
                    </form>
                  </transition>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <span class="w-full px-6 text-gray-700 font-semibold">
          {{ stateInfo }}
          <span
            v-if="stateInfo.includes('Sort')"
            class="text-sm font-light cursor-pointer ml-2 px-2 py-1 bg-gray-200 rounded-full"
            @click="clearFilter"
          >
            clear
          </span>
        </span>
        <div
          v-if="products.length === 0"
          class="w-full p-6 flex flex-col items-center justify-center text-gray-800"
        >
          Product not found
        </div>

        <div
          v-for="(p, i) in products"
          v-else
          :key="i"
          class="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-6 flex flex-col items-center"
        >
          <NuxtLink :to="`/product/${p.code}`" class="w-full h-auto">
            <div
              class="relative w-full bg-gray-100 hover:shadow-lg transition-all duration-200"
              style="padding-bottom: 100%"
            >
              <img
                class="absolute top-0 w-full h-full object-cover"
                :src="`${
                  $store.state.env.apiUrl || 'http://localhost:4000'
                }/img/${p.photos[0]}`"
              />
            </div>
            <div class="pt-3 flex items-center justify-between">
              <p class="">{{ p.name }}</p>
              <!-- Love Icon -->
              <!-- <svg
                class="h-6 w-6 fill-current text-gray-500 hover:text-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z"
                />
              </svg> -->
            </div>
            <p class="pt-1 text-gray-900">{{ p.price | currency }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <About />
  </div>
</template>

<script>
export default {
  filters: {
    currency: (value) => {
      if (!value) return ''
      value = value.toString()
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(value)
    },
  },
  async asyncData({ store, $axios }) {
    try {
      const products = await $axios.get(
        `${store.state.env.apiUrl || 'http://localhost:4000'}/product`
      )
      return {
        productsRaw: products.data,
        products: products.data,
      }
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      stateInfo: 'All Products',
      showCategoryOptions: false,
      showSortOptions: false,
      activeSort: 'null',
      showSearchInput: false,
      searchKeyword: '',
    }
  },
  computed: {
    productCategories() {
      const map = this.productsRaw.map((c) => {
        return c.category
      })
      return [...new Set(map)]
    },
  },
  methods: {
    clearFilter() {
      this.products = this.productsRaw
      this.stateInfo = 'All Products'
    },
    async search() {
      const filter = await this.productsRaw.filter(
        (p) =>
          p.code.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
          p.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
          p.description.toLowerCase().includes(this.searchKeyword.toLowerCase())
      )
      this.products = filter
      this.showSearchInput = false
      this.stateInfo = `Search: "${this.searchKeyword}"`
      this.activeSort = 'null'
    },
    async categorySelected(e) {
      if (e === 'null') {
        this.products = this.productsRaw
        this.showCategoryOptions = false
        this.stateInfo = `All Products`
        this.activeSort = 'null'
      } else {
        const filter = await this.productsRaw.filter(
          (p) => p.category.toLowerCase() === e.toLowerCase()
        )
        this.products = filter
        this.showCategoryOptions = false
        this.stateInfo = `Category: ${e}`
        this.activeSort = 'null'
      }
    },
    async sortOptionSelected(e) {
      if (e === 'null') {
        this.showSortOptions = false
        this.stateInfo = `${this.stateInfo.split('&')[0]}`
        this.activeSort = 'null'
      } else {
        const keyOrder = e.split(',')
        const sorted = await this.products.sort(
          this.compareValues(keyOrder[0], keyOrder[1])
        )
        this.products = sorted
        this.showSortOptions = false
        this.activeSort = e
        this.stateInfo = this.stateInfo.includes('Search')
          ? `${this.stateInfo.split('&')[0]} & Sort: ${keyOrder[0]}, ${
              keyOrder[1]
            }`
          : (this.stateInfo = this.stateInfo.includes('Category')
              ? `${this.stateInfo.split('&')[0]} & Sort: ${keyOrder[0]}, ${
                  keyOrder[1]
                }`
              : `Sort: ${keyOrder[0]}, ${keyOrder[1]}`)
      }
    },
    compareValues(key, order = 'asc') {
      return function innerSort(a, b) {
        if (
          !Object.prototype.hasOwnProperty.call(a, key) ||
          !Object.prototype.hasOwnProperty.call(b, key)
        ) {
          return 0
        }

        const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]
        const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]

        let comparison = 0
        if (varA > varB) {
          comparison = 1
        } else if (varA < varB) {
          comparison = -1
        }
        return order === 'desc' ? comparison * -1 : comparison
      }
    },
  },
  head() {
    return {
      title: this.$store.state.sitePreference.data.title,
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: this.$store.state.sitePreference.data.icon,
        },
      ],
    }
  },
}
</script>

<style></style>
