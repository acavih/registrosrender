<template>
  <v-autocomplete
    v-model="value"
    :loading="loading"
    :multiple="multiple"
    item-text="name"
    return-object
    :label="label"
    :items="items"
    :small-chips="multiple"
    :search-input.sync="userQuery"
    @keydown.enter="doCreateResource"
  >
    <template #[`no-data`]>
      <v-card :ref="refCreatorContainer">
        <v-card-text>
          <v-chip small @click="doCreateResource">
            Crear {{ userQuery }}
          </v-chip>
        </v-card-text>
      </v-card>
    </template>
    <template #prepend-inner>
      <v-btn v-if="removable" color="red" icon @click="value=null">
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </template>
  </v-autocomplete>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
export default Vue.extend({
  props: {
    typeResource: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    removable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      value: null,
      userQuery: '',
      refCreatorContainer: 'sexosCreatorContainer'
    }
  },
  computed: {
    ...mapState('resources', ['resourcesList', 'loaded']),
    items () {
      return this.resourcesList.filter(r => r.type === this.typeResource)
    }
  },
  async mounted () {
    if (!this.loaded) {
      await this.fetchResources()
    }
    if (this.$attrs.value) {
      this.value = this.$attrs.value
    }
    this.loading = false
  },
  methods: {
    ...mapActions('resources', ['createResource', 'fetchResources']),
    async doCreateResource () {
      if (!this.$refs[this.refCreatorContainer]) {
        return
      }
      this.loading = true
      const newResource = await this.createResource({
        name: this.userQuery,
        type: this.typeResource
      })
      this.loading = false

      this.value = newResource
    }
  },
  watch: {
    value () {
      this.$emit('input', this.value)
    }
  }
})
</script>
