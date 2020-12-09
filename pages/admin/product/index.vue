<template>
  <div>
    <div class="text-2xl mb-6"><span>Products</span></div>
    <ClientOnly>
      <vue-good-table
        :columns="columns"
        :rows="products"
        style-class="vgt-table"
        :search-options="{ enabled: true, trigger: 'enter' }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
        }"
        @on-row-click="onRowClick"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'price'">
            <span>{{ props.row.price | currency }}</span>
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
    </ClientOnly>
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
  async asyncData({ store, $axios }) {
    try {
      const products = await $axios.get(
        `${store.state.env.apiUrl || 'http://localhost:4000'}/product`
      )
      return {
        products: products.data,
        categories: [...new Set(products.data.map((c) => c.category))],
      }
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      categories: [],
      columns: [
        {
          label: 'Code',
          field: 'code',
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Name',
          field: 'name',
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Category',
          field: 'category',
          filterOptions: {
            enabled: true,
            filterDropdownItems: [],
          },
        },
        {
          label: 'Price',
          field: 'price',
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'', // prettier-ignore
          dateOutputFormat: 'dd MMM yyyy - HH:mm',
        },
      ],
    }
  },
  mounted() {
    this.columns[2].filterOptions.filterDropdownItems = this.categories
  },
  methods: {
    onRowClick(params) {
      this.$router.push(`/admin/product/${params.row.code}`)
    },
  },
  head() {
    return {
      title: `Product List - ${this.$store.state.sitePreference.data.title} Administration`,
    }
  },
}
</script>

<style>
@import '~/assets/styles/table.css';
</style>
