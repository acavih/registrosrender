export const state = () => ({
  usersList: []
})

export const getters = {
}

export const mutations = {
  setUsers(state, users) {
    state.usersList = users
  }
}

export const actions = {
  async retrieveUsers({commit}) {
    const reqUsers = await this.$axios.get('/users')
    commit('setUsers', reqUsers.data.payload)
  }
}

export const strict = false
