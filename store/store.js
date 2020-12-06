export const state = () => ({
  data: {},
})

export const mutations = {
  setStoreData(state, payload) {
    state.data = payload
  },
}
