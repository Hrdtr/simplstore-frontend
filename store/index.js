export const actions = {
  async nuxtServerInit({ commit }, { $axios }) {
    if (process.env.API_URL !== undefined) {
      commit('env/setApiUrl', process.env.API_URL)
    }
    try {
      const store = await $axios.get(
        `${process.env.API_URL || 'http://localhost:4000'}/store`
      )
      commit('store/setStoreData', store.data)
    } catch (error) {
      console.log(error)
    }
  },
}
