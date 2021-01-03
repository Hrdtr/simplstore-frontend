<template>
  <section class="h-screen top-0">
    <div class="container mx-auto px-4 h-full">
      <div class="flex content-center items-center justify-center h-full">
        <div class="w-full lg:w-4/12 px-4">
          <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 bg-white border-0"
          >
            <div class="rounded-t mb-0 px-6 py-6">
              <div class="text-gray-800 text-left text-2xl mb-6 font-bold">
                Login
              </div>
              <form @submit.prevent="userLogin">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                    >Username</label
                  >
                  <input
                    v-model="login.username"
                    type="text"
                    class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded-md focus:outline-none w-full"
                    placeholder="Username"
                    style="transition: all 0.15s ease 0s"
                    required
                  />
                </div>
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                    >Password</label
                  >
                  <input
                    v-model="login.password"
                    type="password"
                    class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded-md focus:outline-none w-full"
                    placeholder="Password"
                    style="transition: all 0.15s ease 0s"
                    required
                  />
                </div>
                <div class="text-center mt-6">
                  <p v-if="error" class="text-red-600 mb-1 text-sm">
                    {{ error.response.data.message }}
                  </p>
                  <button
                    class="inline-flex items-center justify-center bg-gray-900 text-white text-sm font-bold uppercase px-6 py-3 rounded-md hover:bg-black transition-color duration-200 outline-none focus:outline-none mr-1 mb-1 w-full"
                    type="submit"
                    style="transition: all 0.15s ease 0s"
                    :disabled="submitting"
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
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
          <!-- <div class="flex flex-wrap mt-6">
            <div class="w-1/2">
              <a href="#pablo" class="text-gray-300"
                ><small>Forgot password?</small></a
              >
            </div>
            <div class="w-1/2 text-right">
              <a href="#pablo" class="text-gray-300"
                ><small>Create new account</small></a
              >
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  auth: 'guest',
  layout: 'blank',
  data() {
    return {
      login: {
        username: '',
        password: '',
      },
      error: null,
      submitting: false,
    }
  },
  methods: {
    async userLogin() {
      this.submitting = true
      try {
        const response = await this.$auth.loginWith('local', {
          data: this.login,
        })
        console.log(response)
      } catch (err) {
        this.error = err
        this.submitting = false
      }
    },
  },
}
</script>

<style></style>
