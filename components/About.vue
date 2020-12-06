<template>
  <section id="about" class="bg-white py-8">
    <div class="container py-8 px-6 mx-auto">
      <a
        class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl mb-8"
        href="#"
      >
        About
      </a>
      <div class="mt-8">
        <p
          v-for="(a, i) in $store.state.store.data.about.split('\n')"
          :key="i"
          class="mb-3"
        >
          {{ a }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style></style>
