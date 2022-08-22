<template>
  <v-card>
    <v-card-title>
      Listado de recursos (<strong>{{ activeResourceType }}</strong>)
    </v-card-title>
    <v-card-text>
      <v-card outlined>
        <v-card-text>
          <v-chip-group>
            <v-chip
              v-for="type in types"
              :key="type"
              :dark="activeResourceType === type"
              @click="activeResourceType = type"
            >
              {{ type }}
            </v-chip>
          </v-chip-group>
        </v-card-text>
      </v-card>
      <v-list>
        <v-data-iterator :options.sync="iteratorOptions" :items="filteredResources">
          <template #header>
            <v-toolbar flat>
              <v-text-field v-model="txtQuery" :placeholder="'Buscar elementos'" />
              <v-btn icon style="margin-left: 10px" @click="createResource">
                <v-icon>
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-toolbar>
          </template>
          <template #default="props">
            <v-list-item v-for="resource in props.items" :key="resource._id">
              <v-list-item-content>
                <v-list-item-title>
                  {{ resource.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ resource.archived ? 'Archivado' : 'No archivado' }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="renameResource(resource)">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-action>
                <v-btn icon @click="archiveResource(resource)">
                  <v-icon>
                    mdi-archive{{ resource.archived ? '-remove' : '' }}
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-data-iterator>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
import { mapGetters } from 'vuex'
export default Vue.extend({
  name: 'ResourcesList',
  data () {
    return {
      activeResourceType: '',
      txtQuery: '',
      iteratorOptions: {
        page: 1,
        itemsPerPage: 20,
        sortBy: [], // string[],
        sortDesc: [], // boolean[],
        groupBy: [], // string[],
        groupDesc: [], // boolean[],
        multiSort: false, // boolean,
        mustSort: false // boolean
      }
    }
  },
  computed: {
    types () {
      return _.uniq(this.resourcesList.map(r => r.type))
    },
    ...mapGetters('resources', { filterResources: 'resourcesFiltered' }),
    resourcesList () {
      return this.$store.state.resources.resourcesList
    },
    filteredResources () {
      return this.filterResources(this.activeResourceType, this.txtQuery)
    }
  },
  async mounted () {
    await this.$store.dispatch('resources/fetchResources')
    this.activeResourceType = this.resourcesList[0].type
  },
  methods: {
    async renameResource (resourceToEdit) {
      const response = await this.$dialog.prompt({
        value: resourceToEdit.name,
        title: 'Nombre del nuevo recurso'
      })
      if (!response) { return }
      const payload = {
        ...resourceToEdit,
        name: response
      }
      this.updateResource(payload, resourceToEdit)
    },
    archiveResource (resourceToEdit) {
      const payload = {
        ...resourceToEdit,
        archived: !resourceToEdit.archived
      }
      this.updateResource(payload, resourceToEdit)
    },
    async updateResource (payload, resourceToEdit) {
      try {
        const { message } = await this.$store.dispatch('resources/updateResource', { payload, resourceToEdit })
        this.$dialog.notify.info(message, {
          position: 'top-right',
          timeout: 5000
        })
      } catch (error) {
        if (error.isAxiosError) {
          const { data: { message } } = error.response
          this.$dialog.notify.error(message, {
            position: 'top-right',
            timeout: 5000
          })
        } else {
          console.dir(error)
        }
      }
    },
    async createResource () {
      const response = await this.$dialog.prompt({
        title: 'Nombre del nuevo recurso'
      })

      if (!response) { return }

      const { data: { message } } = await this.$store.dispatch('resources/createResource', {
        name: response,
        type: this.activeResourceType
      })

      this.$dialog.notify.info(message, {
        position: 'top-right',
        timeout: 5000
      })

      /* if (status === 201) {
        this.resourcesList.push(resource)
      } */
    }
  }
})
</script>
