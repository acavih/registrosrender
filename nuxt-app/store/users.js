export const state = () => ({
  usersList: []
})

export const getters = {
}

export const mutations = {
  setUsers(state, users) {
    state.usersList = users
  },
  pushUser(state, user) {
    state.usersList.push(user)
  }
}

export const actions = {
  async retrieveUsers({commit}) {
    const reqUsers = await this.$axios.get('/users')
    commit('setUsers', reqUsers.data.payload)
  },
  async createUser({ commit }, user) {
    const reqUsers = await this.$axios.post('/users', user)
    commit('pushUser', reqUsers.data.payload)
  }
}

export const strict = false
