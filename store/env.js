export const state = () => ({
  apiUrl: '',
})

export const mutations = {
  setApiUrl(state, payload) {
    state.apiUrl = payload
  },
}
