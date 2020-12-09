<template>
  <div>
    <div class="text-2xl mb-6">
      <span>Preference</span>
    </div>
    <div class="text-xl mt-2 mb-6 text-gray-800">
      <span>Store Information</span>
    </div>
    <form
      class="w-full flex flex-col text-gray-800 mb-6"
      @submit.prevent="saveStoreInfoChanges"
    >
      <div class="mb-5 w-full max-w-xl">
        <label class="block text-xs font-normal mb-2 uppercase tracking-wider">
          Name
        </label>
        <input
          v-model="storeInfo.name"
          class="border appearance-none bg-gray-100 rounded w-full py-2 px-3 focus:outline-none"
          type="text"
          required
          placeholder="Name"
        />
      </div>
      <div class="mb-5 w-full max-w-xl">
        <label class="block text-xs font-normal mb-2 uppercase tracking-wider">
          Description
        </label>
        <textarea
          v-model="storeInfo.description"
          class="border appearance-none bg-gray-100 rounded w-full py-2 px-3 focus:outline-none"
          rows="3"
          required
          placeholder="Description"
        />
      </div>
      <div class="mb-5 w-full max-w-xl">
        <label class="block text-xs font-normal mb-2 uppercase tracking-wider">
          about
        </label>
        <textarea
          v-model="storeInfo.about"
          class="border appearance-none bg-gray-100 rounded w-full py-2 px-3 focus:outline-none"
          rows="8"
          required
          placeholder="About"
        />
      </div>
      <div class="mb-5 flex flex-row items-center w-full max-w-xl">
        <button
          type="submit"
          :disabled="submittingStoreInfo"
          class="mt-3 flex flex-row items-center justify-center rounded-md border border-transparent px-4 py-2 bg-green-600 text-sm leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-500 focus:shadow-none transition ease-in-out duration-150 sm:leading-5"
        >
          <svg
            v-if="submittingStoreInfo"
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
      </div>
    </form>
    <div class="text-xl mt-2 mb-6 text-gray-800">
      <span>Site Preference</span>
    </div>
    <form
      class="w-full flex flex-col text-gray-800 mb-6"
      @submit.prevent="saveSitePrefChanges"
    >
      <div class="mb-5 w-full max-w-xl">
        <label class="block text-xs font-normal mb-2 uppercase tracking-wider">
          Title
        </label>
        <input
          v-model="sitePref.title"
          class="border appearance-none bg-gray-100 rounded w-full py-2 px-3 focus:outline-none"
          type="text"
          required
          placeholder="Site title"
        />
      </div>
      <AssetsManager
        ref="iconPicker"
        :is-visible="showIconPicker"
        @exit="closeIconPicker"
        @selected="iconSelected"
      />
      <div class="mb-5 w-full">
        <label class="block text-xs font-normal mb-2 uppercase tracking-wider">
          Icon
        </label>
        <div
          v-if="
            sitePref.icon === '' ||
            sitePref.icon === null ||
            sitePref.icon === undefined
          "
          class="w-full flex flex-wrap -m-2"
        >
          <div class="p-2">
            <FormImagePreview />
          </div>
        </div>
        <div v-else class="w-full flex flex-wrap -m-2">
          <div class="p-2">
            <FormImagePreview
              :src="`${$store.state.env.apiUrl}/img/${sitePref.icon}`"
            />
          </div>
        </div>
        <button
          type="button"
          class="py-2 px-4 rounded-md border bg-gray-100 hover:bg-white text-gray-600 mt-3 text-sm transition-colors duration-200 font-medium"
          @click="showIconPicker = true"
        >
          Change Icon
        </button>
      </div>
      <div class="mb-5 flex flex-row items-center w-full max-w-xl">
        <button
          type="submit"
          :disabled="submittingSitePref"
          class="mt-3 flex flex-row items-center justify-center rounded-md border border-transparent px-4 py-2 bg-green-600 text-sm leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-500 focus:shadow-none transition ease-in-out duration-150 sm:leading-5"
        >
          <svg
            v-if="submittingSitePref"
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
      </div>
    </form>

    <div class="text-xl mt-2 mb-6 text-gray-800">
      <span>Help Content</span>
    </div>
    <form
      class="w-full flex flex-col text-gray-800 mb-6"
      @submit.prevent="saveHelpChanges"
    >
      <div class="mb-5 w-full max-w-xl">
        <label class="block text-xs font-normal mb-2 uppercase tracking-wider">
          Title
        </label>
        <input
          v-model="help.title"
          class="border appearance-none bg-gray-100 rounded w-full py-2 px-3 focus:outline-none"
          type="text"
          required
          placeholder="Site title"
        />
      </div>
      <div class="mb-5 w-full max-w-xl">
        <label class="block text-xs font-normal mb-2 uppercase tracking-wider">
          Content
        </label>
        <textarea
          v-model="help.content"
          class="border appearance-none bg-gray-100 rounded w-full py-2 px-3 focus:outline-none"
          rows="3"
          required
          placeholder="Description"
        />
      </div>
      <div class="mb-5 flex flex-row items-center w-full max-w-xl">
        <button
          type="submit"
          :disabled="submittingHelp"
          class="mt-3 flex flex-row items-center justify-center rounded-md border border-transparent px-4 py-2 bg-green-600 text-sm leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-500 focus:shadow-none transition ease-in-out duration-150 sm:leading-5"
        >
          <svg
            v-if="submittingHelp"
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
      </div>
    </form>

    <div class="text-xl mt-2 mb-6 text-gray-800">
      <span>Social Media</span>
    </div>
    <div class="w-full flex flex-col max-w-xl text-gray-800">
      <div v-for="(s, i) in socmed" :key="i">
        <div
          class="cursor-pointer mb-3 text-gray-700"
          @click="s.expanded = !s.expanded"
        >
          <span>
            {{ !s.expanded ? `• ${s.name} (${s.url})` : '• Collapse' }}
          </span>
        </div>
        <form
          v-if="s.expanded"
          class="bg-white shadow-md rounded-md hover:shadow-lg transition-all duration-200 p-6 mb-6"
          @submit.prevent="saveSocmedItemChanges(i)"
        >
          <div class="mb-5 w-full max-w-xl">
            <label
              class="block text-xs font-normal mb-2 uppercase tracking-wider"
            >
              Name
            </label>
            <input
              v-model="s.name"
              class="border appearance-none bg-gray-100 rounded w-full py-2 px-3 focus:outline-none"
              type="text"
              disabled
              required
              placeholder="Name"
            />
          </div>
          <div class="mb-5 w-full max-w-xl">
            <label
              class="block text-xs font-normal mb-2 uppercase tracking-wider"
            >
              Url
            </label>
            <input
              v-model="s.url"
              class="border appearance-none bg-gray-100 rounded w-full py-2 px-3 focus:outline-none"
              type="text"
              required
              placeholder="Name"
            />
          </div>
          <div class="flex flex-row">
            <button
              class="mt-2 flex flex-row items-center justify-center rounded-md border border-transparent px-4 py-2 bg-green-600 text-sm leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-500 focus:shadow-none transition ease-in-out duration-150 sm:leading-5"
              type="submit"
              :disabled="s.submitting"
            >
              <svg
                v-if="s.submitting"
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
              <span>Save Changes</span>
            </button>
            <button
              class="ml-3 mt-2 flex flex-row items-center justify-center rounded-md border border-transparent px-4 py-2 bg-red-600 text-sm leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-500 focus:shadow-none transition ease-in-out duration-150 sm:leading-5"
              @click.prevent="deleteSocmedItem(i)"
            >
              <span>Delete</span>
            </button>
          </div>
        </form>
      </div>
      <div class="mt-4 mb-6 text-gray-800">
        <span>Add Social Media</span>
      </div>
      <form
        class="w-full flex flex-col text-gray-800 mb-6"
        @submit.prevent="addSocmedItem"
      >
        <div class="mb-5 w-full max-w-xl">
          <label
            class="block text-xs font-normal mb-2 uppercase tracking-wider"
          >
            Name
          </label>
          <input
            v-model="newSocmed.name"
            class="border appearance-none bg-gray-100 rounded w-full py-2 px-3 focus:outline-none"
            type="text"
            required
            placeholder="Name"
          />
        </div>
        <div class="mb-5 w-full max-w-xl">
          <label
            class="block text-xs font-normal mb-2 uppercase tracking-wider"
          >
            Url
          </label>
          <input
            v-model="newSocmed.url"
            class="border appearance-none bg-gray-100 rounded w-full py-2 px-3 focus:outline-none"
            type="text"
            required
            placeholder="Name"
          />
        </div>
        <div class="mb-5 flex flex-row items-center w-full max-w-xl">
          <button
            type="submit"
            :disabled="submittingNewSocmed"
            class="mt-3 flex flex-row items-center justify-center rounded-md border border-transparent px-4 py-2 bg-green-600 text-sm leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-500 focus:shadow-none transition ease-in-out duration-150 sm:leading-5"
          >
            <svg
              v-if="submittingNewSocmed"
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
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'admin',
  async asyncData({ store, $axios, route }) {
    try {
      const storeInfo = await $axios.get(
        `${store.state.env.apiUrl || 'http://localhost:4000'}/store`
      )
      const socmed = await $axios.get(
        `${store.state.env.apiUrl || 'http://localhost:4000'}/socmed`
      )
      const sitePref = await $axios.get(
        `${store.state.env.apiUrl || 'http://localhost:4000'}/site-preference`
      )
      const help = await $axios.get(
        `${store.state.env.apiUrl || 'http://localhost:4000'}/help`
      )
      return {
        storeInfo: storeInfo.data,
        socmed: socmed.data.map((item) => {
          return { ...item, submitting: false, expanded: false }
        }),
        sitePref: sitePref.data,
        help: help.data,
      }
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      showIconPicker: false,
      submittingStoreInfo: false,
      submittingSitePref: false,
      submittingNewSocmed: false,
      submittingHelp: false,
      deleting: false,
      newSocmed: {},
    }
  },
  methods: {
    async saveStoreInfoChanges() {
      this.submittingStoreInfo = true
      try {
        const res = await this.$axios.post(
          `${this.$store.state.env.apiUrl || 'http://localhost:4000'}/store`,
          this.storeInfo
        )
        this.storeInfo = res.data.store
        alert(res.data.msg)
        this.submittingStoreInfo = false
      } catch (error) {
        this.submittingStoreInfo = false
        alert(error.response.data.msg)
      }
    },
    async saveSitePrefChanges() {
      this.submittingSitePref = true
      try {
        const res = await this.$axios.post(
          `${
            this.$store.state.env.apiUrl || 'http://localhost:4000'
          }/site-preference`,
          this.sitePref
        )
        this.sitePref = res.data.sitePreferences
        alert(res.data.msg)
        this.submittingSitePref = false
      } catch (error) {
        this.submittingSitePref = false
        alert(error.response.data.msg)
      }
    },
    async saveHelpChanges() {
      this.submittingHelp = true
      try {
        const res = await this.$axios.post(
          `${this.$store.state.env.apiUrl || 'http://localhost:4000'}/help`,
          this.help
        )
        this.help = res.data.help
        alert(res.data.msg)
        this.submittingHelp = false
      } catch (error) {
        this.submittingHelp = false
        alert(error.response.data.msg)
      }
    },
    iconSelected() {
      if (this.$refs.iconPicker.imageSelected.id === undefined) {
        alert('Select an image first')
      } else if (
        this.sitePref.icon === this.$refs.iconPicker.imageSelected.id
      ) {
        alert(
          'Selected image is current site icon, please select the other one'
        )
      } else {
        this.sitePref.icon = this.$refs.iconPicker.imageSelected.id
        this.showIconPicker = false
        this.$refs.iconPicker.imageSelected = {}
      }
    },
    closeIconPicker() {
      this.showIconPicker = false
      this.$refs.iconPicker.imageSelected = {}
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
    async addSocmedItem(i) {
      this.submittingNewSocmed = true
      const payload = {
        name: this.newSocmed.name.replace(/\s+/g, '-'),
        url: this.newSocmed.url,
      }
      try {
        const res = await this.$axios.post(
          `${this.$store.state.env.apiUrl || 'http://localhost:4000'}/socmed`,
          payload
        )
        alert(res.data.msg)
        this.socmed.push({
          ...res.data.item,
          submitting: false,
          expanded: false,
        })
        this.submittingNewSocmed = false
        this.newSocmed = {}
      } catch (error) {
        alert(error.response.data.msg)
        this.submittingNewSocmed = false
      }
    },
    async saveSocmedItemChanges(i) {
      this.socmed[i].submitting = true
      try {
        const res = await this.$axios.patch(
          `${this.$store.state.env.apiUrl || 'http://localhost:4000'}/socmed/${
            this.socmed[i].name
          }`,
          this.socmed[i]
        )
        alert(res.data.msg)
        this.socmed[i].submitting = false
      } catch (error) {
        alert(error.response.data.msg)
        this.socmed[i].submitting = false
      }
    },
    async deleteSocmedItem(i) {
      if (confirm('Do you really want to delete?')) {
        try {
          const res = await this.$axios.delete(
            `${
              this.$store.state.env.apiUrl || 'http://localhost:4000'
            }/socmed/${this.socmed[i].name}`
          )
          alert(res.data.msg)
          this.socmed.splice(i, 1)
        } catch (error) {
          alert(error.response.data.msg)
        }
      }
    },
  },
  head() {
    return {
      title: `Preference - ${this.$store.state.sitePreference.data.title} Administration`,
    }
  },
}
</script>

<style></style>
