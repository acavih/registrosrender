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
  },
  deleteUser(state, id) {
    state.usersList = state.usersList.filter(u => u._id !== id)
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
  },
  async deleteUser({ commit }, userId) {
    await this.$axios.delete('/users/' + userId)
    commit('deleteUser', userId)
    console.dir(this)
  }
}

export const strict = false
