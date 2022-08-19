import { mapState, mapGetters } from 'vuex'

export const datasetStatsMixin = {
  computed: {
    ...mapState('statistics', ['attentionsDataset']),
    ...mapGetters('statistics', ['distinctUsers'])
  }
}

export default datasetStatsMixin
