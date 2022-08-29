<template>
  <v-sheet>
    <v-card>
      <v-card-title>
        Listado de recursos
      </v-card-title>
      <v-card-text>
        <v-card outlined>
          <v-card-text>
            <v-chip-group v-model="activeResourceType" active-class="grey darken-3 white--text">
              <v-chip
                v-for="type in types"
                :key="type"
                :value="type"
                @click="activeResourceType = type"
              >
                {{ type }}
              </v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
        <v-list>
          <v-list-item-group>
            <v-data-iterator :options.sync="iteratorOptions" :items="filteredResources">
              <template #header>
                <v-toolbar flat>
                  <v-text-field v-model="txtQuery" :placeholder="'Buscar elementos'" />
                  <v-btn icon style="margin-left: 10px" @click="addingResource = true">
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
                    <v-btn icon @click="editResource(resource)">
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
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
    <v-dialog :value="modalEditorResorucesIsActive" @click:outside="cleanEditingState">
      <v-card tag="form" @submit.prevent="submitResource">
        <v-card-title>
          Editor de recursos
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="editingResource.name" label="Nombre del recurso" />
          <v-text-field v-model="editingResource.type" label="Tipo del recurso" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" elevation="0" type="submit">
            Guardar recurso
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
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
      addingResource: false,
      resourceEditing: '',
      editingResource: {
        name: '',
        type: ''
      },
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
    },
    modalEditorResorucesIsActive () {
      return this.addingResource || this.resourceEditing.length > 0
    }
  },
  watch: {
    activeResourceType () {
      this.editingResource.type = this.activeResourceType
    }
  },
  async mounted () {
    await this.$store.dispatch('resources/fetchResources')
    this.activeResourceType = this.resourcesList[0].type
    this.editingResource.type = this.resourcesList[0].type
  },
  methods: {
    async submitResource () {
      if (this.addingResource) {
        await this.createResource()
      } else {
        await this.updateResource(this.editingResource, { _id: this.resourceEditing })
      }
      this.cleanEditingState()
    },
    editResource ({ name, type, _id }) {
      this.editingResource.name = name
      this.editingResource.type = type
      this.resourceEditing = _id
    },
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
    cleanEditingState () {
      this.addingResource = false
      this.resourceEditing = ''
      this.editingResource.name = ''
      this.editingResource.type = this.activeResourceType
    },
    async createResource () {
      const { data: { message } } = await this.$store.dispatch('resources/createResource', this.editingResource)

      this.$dialog.notify.info(message, {
        position: 'top-right',
        timeout: 5000
      })

      this.editingResource.name = ''
      this.editingResource.type = ''
      this.editingResource.addingResource = false

      /* if (status === 201) {
        this.resourcesList.push(resource)
      } */
    }
  }
})
</script>
