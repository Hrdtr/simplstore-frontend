<template>
  <div>
    <ClientOnly>
      <Splide v-show="items.length !== 0" :options="options">
        <SplideSlide v-for="(item, i) in items" :key="i">
          <img :src="item" class="hidden" />
        </SplideSlide>
      </Splide>
    </ClientOnly>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      options: {
        type: 'loop',
        cover: true,
        heightRatio: 1,
        width: '100%',
        focus: 'center',
      },
    }
  },
}
</script>

<style>
.splide__list {
  overflow: hidden;
}
</style>
