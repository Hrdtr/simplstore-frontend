export const state = () => ({
  title: '',
  content: '',
})

export const mutations = {
  setHelpTitle(state, payload) {
    state.title = payload
  },
  setHelpContent(state, payload) {
    state.content = payload
  },
}
