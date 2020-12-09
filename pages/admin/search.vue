<template>
  <div>
    <div class="text-2xl mb-6">
      <span>Search Results: "{{ $route.query.q.replace(/_+/g, ' ') }}"</span>
    </div>
    <div class="mb-6 text-gray-800 max-w-xl">
      <div class="text-xl mb-4"><span>Products:</span></div>
      <div v-if="products === null || products.length === 0" class="mb-3">
        <p class="font-medium">No product found</p>
      </div>
      <NuxtLink
        v-for="(p, i) in products"
        v-else
        :key="i + 'p'"
        :to="`/admin/product/${p.code}`"
        class="mb-4 flex flex-row bg-white shadow-lg rounded-md overflow-hidden hover:shadow-md transition-all duration-200"
      >
        <div class="w-1/4 h-auto">
          <img
            class="w-full h-full object-cover"
            :src="`${$store.state.env.apiUrl || 'http://localhost:4000'}/img/${
              p.photos[0]
            }`"
          />
        </div>
        <div class="flex-1 flex flex-col p-5">
          <span class="mb-2 text-lg font-medium">{{ p.name }}</span>
          <span class="mb-2 font-medium">Category: {{ p.category }}</span>
          <p class="text-sm mb-2">{{ p.description.substring(0, 120) }}...</p>
          <p class="font-medium">{{ p.price | currency }}</p>
        </div>
      </NuxtLink>

      <div class="text-xl mb-4 pt-4"><span>Carousels:</span></div>
      <div v-if="carousels === null || carousels.length === 0" class="mb-3">
        <p class="font-medium">No carousels found</p>
      </div>
      <NuxtLink
        v-for="(c, i) in carousels"
        v-else
        :key="i + 'c'"
        :to="`/admin/carousel/${c.productCode}`"
        class="mb-4 flex flex-row bg-white shadow-lg rounded-md overflow-hidden hover:shadow-md transition-all duration-200"
      >
        <div class="w-1/4 h-auto">
          <img
            class="w-full h-full object-cover"
            :src="`${$store.state.env.apiUrl || 'http://localhost:4000'}/img/${
              c.img
            }`"
          />
        </div>
        <div class="flex-1 flex flex-col p-5">
          <span class="mb-2 text-lg font-medium">{{ c.text }}</span>
          <p>Product related: {{ c.productCode }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'admin',
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
  data() {
    return {
      products: null,
      carousels: null,
    }
  },
  computed: {
    query() {
      return this.$route.query.q
    },
  },
  watch: {
    query() {
      this.search()
    },
  },
  async mounted() {
    await this.search()
  },
  methods: {
    async search() {
      if (this.$route.query.q) {
        try {
          const resProducts = await this.$axios.get(
            `${this.$store.state.env.apiUrl || 'http://localhost:4000'}/product`
          )
          const resCarousels = await this.$axios.get(
            `${
              this.$store.state.env.apiUrl || 'http://localhost:4000'
            }/carousel`
          )
          const products = resProducts.data.filter(
            (p) =>
              p.code
                .toLowerCase()
                .includes(
                  this.$route.query.q.replace(/_+/g, ' ').toLowerCase()
                ) ||
              p.name
                .toLowerCase()
                .includes(
                  this.$route.query.q.replace(/_+/g, ' ').toLowerCase()
                ) ||
              p.description
                .toLowerCase()
                .includes(this.$route.query.q.replace(/_+/g, ' ').toLowerCase())
          )
          const carousels = resCarousels.data.filter(
            (c) =>
              c.productCode
                .toLowerCase()
                .includes(
                  this.$route.query.q.replace(/_+/g, ' ').toLowerCase()
                ) ||
              c.text
                .toLowerCase()
                .includes(this.$route.query.q.replace(/_+/g, ' ').toLowerCase())
          )
          this.products = products
          this.carousels = carousels
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
}
</script>

<style></style>
