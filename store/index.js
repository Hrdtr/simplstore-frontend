export const actions = {
  async nuxtServerInit({ commit }, { $axios }) {
    if (process.env.API_URL !== undefined) {
      commit('env/setApiUrl', process.env.API_URL)
    }
    try {
      const store = await $axios.get(
        `${process.env.API_URL || 'http://localhost:4000'}/store`
      )
      const help = await $axios.get(
        `${process.env.API_URL || 'http://localhost:4000'}/help`
      )
      const socmed = await $axios.get(
        `${process.env.API_URL || 'http://localhost:4000'}/socmed`
      )
      const sitePreference = await $axios.get(
        `${process.env.API_URL || 'http://localhost:4000'}/site-preference`
      )
      commit('store/setStoreData', store.data)
      commit('help/setHelpTitle', help.data.title)
      commit('help/setHelpContent', help.data.content)
      commit('socmed/setSocmedData', socmed.data)
      commit('sitePreference/setSitePreferenceData', sitePreference.data)
    } catch (error) {
      console.log(error)
    }
  },
}
