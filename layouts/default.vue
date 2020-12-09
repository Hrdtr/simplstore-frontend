<template>
  <div>
    <Modal
      v-show="showHelp"
      :title="$store.state.help.title"
      @close="showHelp = false"
    >
      <div class="h-64 overflow-y-auto border-b-2 border-gray-200">
        <p
          v-for="(h, i) in $store.state.help.content.split('\n')"
          :key="i"
          class="mb-3 last:mb-0"
        >
          {{ h }}
        </p>
      </div>
      <div slot="footer" class="w-full flex items-center justify-end">
        <button
          class="focus:outline-none p-2 px-6 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors duration-200"
          @click="showHelp = false"
        >
          Close
        </button>
      </div>
    </Modal>
    <nav
      id="header"
      class="w-full z-20 sticky top-0 bg-white bg-opacity-75"
      style="-webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px)"
    >
      <div
        class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-4"
      >
        <label for="menu-toggle" class="cursor-pointer md:hidden block">
          <svg
            class="fill-current text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>

            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>

        <input id="menu-toggle" class="hidden" type="checkbox" />

        <div
          id="menu"
          class="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1"
        >
          <nav>
            <ul
              class="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0"
            >
              <li class="mr-4 last:mr-0">
                <NuxtLink
                  v-scroll-to="'#store'"
                  class="inline-block no-underline hover:text-black hover:underline py-2"
                  to="/"
                  >Shop</NuxtLink
                >
              </li>

              <li class="mr-4 last:mr-0">
                <NuxtLink
                  v-scroll-to="'#about'"
                  class="inline-block no-underline hover:text-black hover:underline py-2"
                  to="/"
                  >About</NuxtLink
                >
              </li>
            </ul>
          </nav>
        </div>

        <div class="order-1 md:order-2">
          <NuxtLink
            class="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl pr-1 md:pr-24"
            to="/"
          >
            <img
              v-if="$store.state.sitePreference.data.icon"
              class="w-6 h-6 mr-2"
              :src="`${
                $store.state.env.apiUrl || 'http://localhost:4000'
              }/img/${$store.state.sitePreference.data.icon}`"
              :alt="`${$store.state.store.data.name} icon`"
            />
            <svg
              v-else
              class="fill-current text-gray-800 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M5,22h14c1.103,0,2-0.897,2-2V9c0-0.553-0.447-1-1-1h-3V7c0-2.757-2.243-5-5-5S7,4.243,7,7v1H4C3.447,8,3,8.447,3,9v11 C3,21.103,3.897,22,5,22z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v1H9V7z M5,10h2v2h2v-2h6v2h2v-2h2l0.002,10H5V10z"
              />
            </svg>

            {{ $store.state.store.data.name.toUpperCase() }}
          </NuxtLink>
        </div>

        <div id="nav-content" class="order-2 md:order-3 flex items-center">
          <button class="-mr-1 focus:outline-none" @click="showHelp = true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              focusable="false"
              width="24"
              height="24"
              style="
                -ms-transform: rotate(360deg);
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
              "
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 36 36"
            >
              <path
                d="M24.18 14.17v-.05c0-3-2.34-5.2-5.88-5.2a7.38 7.38 0 0 0-5.72 2.57a1 1 0 0 0-.32.71a.92.92 0 0 0 .95.92a1.08 1.08 0 0 0 .71-.29a5.7 5.7 0 0 1 4.33-2c2.36 0 3.83 1.52 3.83 3.41v.05c0 2.21-1.76 3.44-4.54 3.65a.8.8 0 0 0-.76.92v2.75a1 1 0 0 0 1 .9h.11a1 1 0 0 0 .9-1v-2.06c2.96-.45 5.39-2 5.39-5.28z"
                class="clr-i-outline--badged clr-i-outline-path-1--badged"
                fill="#626262"
              />
              <circle
                cx="17.78"
                cy="26.2"
                r="1.25"
                class="clr-i-outline--badged clr-i-outline-path-2--badged"
                fill="#626262"
              />
              <path
                d="M33.12 12.81a7.43 7.43 0 0 1-1.91.58a14.05 14.05 0 1 1-8.6-8.6a7.44 7.44 0 0 1 .58-1.91a16.06 16.06 0 1 0 9.93 9.93z"
                class="clr-i-outline--badged clr-i-outline-path-3--badged"
                fill="#626262"
              />
              <circle
                cx="30"
                cy="6"
                r="5"
                class="clr-i-outline--badged clr-i-outline-path-4--badged clr-i-badge"
                fill="#626262"
              />
            </svg>
          </button>
          <!-- Account and Cart Icon -->
          <!-- <a class="inline-block no-underline hover:text-black" href="#">
            <svg
              class="fill-current hover:text-black"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <circle fill="none" cx="12" cy="7" r="3" />

              <path
                d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z"
              />
            </svg>
          </a>

          <a class="pl-3 inline-block no-underline hover:text-black" href="#">
            <svg
              class="fill-current hover:text-black"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z"
              />

              <circle cx="10.5" cy="18.5" r="1.5" />

              <circle cx="17.5" cy="18.5" r="1.5" />
            </svg>
          </a> -->
        </div>
      </div>
    </nav>

    <Nuxt />

    <footer
      class="container mx-auto bg-white py-8 border-t px-6 border-gray-400"
    >
      <div class="container flex py-8">
        <div class="w-full mx-auto flex flex-wrap">
          <div class="flex w-full md:w-1/2 mb-6 md:mb-0">
            <div class="">
              <h3 class="font-bold text-gray-900">
                {{ $store.state.store.data.name }}
              </h3>
              <p class="py-4">
                {{ $store.state.store.data.description }}
              </p>
            </div>
          </div>
          <div class="flex w-full md:w-1/2 md:justify-end md:text-right">
            <div>
              <h3 class="font-bold text-gray-900">Social</h3>
              <ul class="list-reset items-center pt-3">
                <li v-for="(s, i) in $store.state.socmed.data" :key="i">
                  <a
                    class="inline-block no-underline hover:text-black hover:underline py-1"
                    :href="s.url"
                    target="_blank"
                    >{{ s.name }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showHelp: false,
      socmed: [
        {
          name: 'Instagram',
          url: '#',
        },
        {
          name: 'Facebook',
          url: '#',
        },
      ],
    }
  },
}
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}

#menu-toggle:checked + #menu {
  display: block;
}

.hover\:grow {
  transition: all 0.3s;
  transform: scale(1);
}

.hover\:grow:hover {
  transform: scale(1.02);
}
</style>
