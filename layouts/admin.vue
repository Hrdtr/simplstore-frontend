<template>
  <div class="container mx-auto">
    <nav id="header" class="bg-white sticky top-0 flex flex-col p-4 lg:p-6">
      <div class="flex flex-row items-center justify-between">
        <div class="flex flex-row items-center">
          <div class="block lg:hidden">
            <button
              id="nav-toggle"
              class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-teal-500 appearance-none focus:outline-none"
              @click="showMenu = !showMenu"
            >
              <svg
                class="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <a
            class="hidden lg:block text-gray-900 text-base xl:text-xl no-underline hover:no-underline font-bold ml-4 lg:ml-0"
            href="#"
          >
            Store Admin
          </a>
        </div>
        <div class="relative">
          <button
            id="userButton"
            class="flex items-center focus:outline-none"
            @click="showUserMenu = !showUserMenu"
          >
            <svg
              class="pr-2 h-2"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 129 129"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              enable-background="new 0 0 129 129"
            >
              <g>
                <path
                  d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"
                />
              </g>
            </svg>
            <img
              class="w-8 h-8 rounded-full bg-black"
              :src="`https://ui-avatars.com/api/?name=${$auth.user.username}&background=000000&color=fff`"
              :alt="`${$auth.user.username} Avatar`"
            />
          </button>
          <div
            id="userMenu"
            class="bg-white rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30"
            :class="showUserMenu ? 'block' : 'hidden'"
          >
            <ul class="list-reset">
              <!-- <li>
                <a
                  href="#"
                  class="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                  >My account</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                  >Notifications</a
                >
              </li>
              <li>
                <hr class="border-t mx-2 border-gray-400" />
              </li> -->
              <li>
                <a
                  href="#"
                  class="px-4 py-2 block text-sm text-gray-800 hover:bg-gray-400 no-underline hover:no-underline"
                  @click="$auth.logout()"
                  >Logout</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <transition name="dropdown">
        <div
          id="nav-content"
          :class="showMenu ? 'block' : 'hidden'"
          class="w-full flex-grow lg:flex lg:items-center lg:w-auto mt-4 lg:mt-2 bg-white z-20"
        >
          <ul
            class="list-reset lg:flex flex-1 items-center px-2 lg:px-0 pb-2 lg:pb-0"
          >
            <li v-for="(m, i) in menu" :key="i" class="mr-6 my-2 md:my-0">
              <NuxtLink
                :to="m.path"
                class="block py-1 md:pb-0 md:pt-5 align-baseline text-gray-500 hover:text-gray-900 transition-color duration-200"
                :exact="m.exactActive"
              >
                <span class="pb-1 md:pb-0 text-sm">{{ m.title }}</span>
              </NuxtLink>
            </li>
          </ul>

          <div class="relative pull-right pl-2 pr-2 pb-2 lg:pb-0 lg:pr-0">
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search"
              class="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-gray-700 rounded p-2 pl-10 appearance-none leading-normal"
              @keyup.enter="search"
            />
            <div
              class="absolute search-icon"
              style="top: 0.725rem; left: 1.75rem"
            >
              <svg
                class="fill-current pointer-events-none text-gray-800 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </transition>
    </nav>

    <div class="bg-white flex flex-col p-6">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data() {
    return {
      searchQuery: '',
      showMenu: false,
      showUserMenu: false,
      menu: [
        {
          title: 'Home',
          exactActive: true,
          path: '/admin',
        },
        {
          title: 'Product',
          exactActive: false,
          path: '/admin/product',
        },
        {
          title: 'Carousel',
          exactActive: false,
          path: '/admin/carousel',
        },
        {
          title: 'Preference',
          exactActive: false,
          path: '/admin/preference',
        },
      ],
    }
  },
  methods: {
    search() {
      this.$router.push(
        `/admin/search?q=${this.searchQuery.replace(/\s+/g, '_').toLowerCase()}`
      )
    },
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
.nuxt-link-active {
  font-weight: bold;
  color: #1a202c;
}
</style>
