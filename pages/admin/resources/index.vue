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
export default Vue.extend({
  name: 'ResourcesList',
  data () {
    return {
      resourcesList: [],
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
    filteredResources () {
      return this.resourcesList
        .filter(r => r.type === this.activeResourceType)
        .filter(r => new RegExp(this.txtQuery, 'i').test(r.name))
    }
  },
  async mounted () {
    const resources = await this.$axios.get('/resources')
    this.resourcesList = resources.data.payload.resources
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
        const { status, data: { message, payload: { resource } } } = await this.$axios.put('/resources/' + resourceToEdit._id, payload)
        if (status < 400) {
          this.resourcesList = this.resourcesList.map((r) => {
            if (r._id === resource._id) { return resource }
            return r
          })
        }
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
      const payload = {
        name: response,
        type: this.activeResourceType
      }
      const { status, data: { message, payload: { resource } } } = await this.$axios.post('/resources', payload)

      this.$dialog.notify.info(message, {
        position: 'top-right',
        timeout: 5000
      })

      if (status === 201) {
        this.resourcesList.push(resource)
      }
    }
  }
})
</script>
