export const state = () => ({
  data: {},
})

export const mutations = {
  setSitePreferenceData(state, payload) {
    state.data = payload
  },
}
