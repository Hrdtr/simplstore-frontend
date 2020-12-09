<template>
  <div class="container mx-auto" style="max-width: 1600px">
    <ClientOnly>
      <Splide v-if="items.length !== 0" :options="options">
        <SplideSlide v-for="(item, i) in items" :key="i">
          <img
            :src="`${$store.state.env.apiUrl || 'http://localhost:4000'}/img/${
              item.img
            }`"
            class="hidden"
          />
          <div class="container mx-auto h-full flex items-center">
            <div
              class="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide"
            >
              <p class="text-white text-xl sm:text-2xl md:text-3xl mt-4 mb-2">
                {{ item.text }}
              </p>
              <NuxtLink
                class="text-base sm:text-lg md:text-xl inline-block no-underline border-b border-white leading-relaxed text-white"
                :to="`product/${item.productCode}`"
                >View product
              </NuxtLink>
            </div>
          </div>
        </SplideSlide>
      </Splide>
    </ClientOnly>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        type: 'loop',
        cover: true,
        width: '100%',
        heightRatio: 0.35,
        focus: 'center',
        breakpoints: {
          480: {
            heightRatio: 0.65,
          },
          768: {
            heightRatio: 0.55,
          },
          1024: {
            heightRatio: 0.45,
          },
        },
      },
      items: [],
    }
  },
  async mounted() {
    try {
      const carousels = await this.$axios.get(
        `${this.$store.state.env.apiUrl || 'http://localhost:4000'}/carousel`
      )
      this.items = carousels.data
    } catch (error) {
      console.log(error)
    }
  },
}
</script>
