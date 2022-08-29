import { mapGetters } from 'vuex'

export const datasetStatsMixin = {
  computed: {
    // ...mapState('statistics', ['attentionsDataset']),
    ...mapGetters('statistics', ['distinctUsers']),
    ...mapGetters('statistics', {
      attentionsDataset: 'filteredAttentions'
    })
  },
  methods: {
    transformToArray (obj: any) {
      const data = []
      const keys = Object.keys(obj)
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index]
        data.push({ name: key, y: obj[key] })
      }
      return data
    }
  }
}

export default datasetStatsMixin
