<template>
  <v-sheet>
    <v-card :loading="loading" :disabled="loading">
      <v-card-title>
        Recursos ({{ activeResource }})
        <v-spacer />
        <v-btn color="primary" elevation="0" @click="editingModalActive = true"
          >Crear recurso</v-btn
        >
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field v-model="queryTxt" label="Buscar recurso" />
            <v-data-iterator :items="filteredResources" v-slot="{ items }">
              <v-list>
                <v-list-item
                  v-for="item in items"
                  :key="item._id"
                  @click="editResource(item)"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ item.name }}
                      {{
                        (item.archived && "(Archivado)") || ""
                      }}</v-list-item-title
                    >
                    <v-list-item-subtitle>{{ item.type }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <div>
                      <v-btn icon @click.prevent.stop="toggleArchive(item)">
                        <v-icon>
                          mdi-package-{{ item.archived ? "up" : "down" }}
                        </v-icon>
                      </v-btn>
                      <v-btn icon color="primary">
                        <v-icon> mdi-pencil </v-icon>
                      </v-btn>
                    </div>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-data-iterator>
          </v-col>
          <v-col cols="2">
            <v-card outlined>
              <v-card-title> Tipos de recursos </v-card-title>
              <v-card-text class="px-0">
                <v-list dense>
                  <v-list-item
                    :class="activeResource === item ? 'grey lighten-2' : ''"
                    @click="activeResource = item"
                    v-for="item in resourcesTypes"
                    :key="item._id"
                  >
                    <v-list-item-content class="px-3">
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="editingModalActive">
      <template v-if="editingModalActive">
        <resource-editor
          @submit="createResource"
          @close="editingModalActive = false"
          v-if="editingResource === ''"
          :typeResource="activeResource"
        />
        <resource-editor
          @submit="updateResource"
          @close="editingModalActive = false"
          v-else
          :typeReadOnly="true"
          :resourceEditing="resourceEditing"
        />
      </template>
    </v-dialog>
  </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ResourceEditor from "../../../components/resources/ResourceEditor.vue";
export default {
  components: { ResourceEditor },
  name: "ResourcesList",
  data() {
    return {
      editingModalActive: false,
      loading: false,
      activeResource: "",
      queryTxt: "",
      resourceEditing: "",
    };
  },
  head() {
    return {
      title: "Listado de recursos",
    };
  },
  async mounted() {
    await this.retrieveData();
    this.activeResource = this.resourcesTypes[0];
  },
  computed: {
    editingResource() {
      return this.addingResource || this.resourceEditing;
    },
    ...mapGetters({
      resourcesTypes: "resources/typesResources",
      resourceBy: "resources/resourceType",
    }),
    currentList() {
      return this.resourceBy(this.activeResource);
    },
    filteredResources() {
      return this.queryTxt.length === 0
        ? this.currentList
        : this.currentList.filter((r) =>
            new RegExp(this.queryTxt, "i").test(r.name)
          );
    },
  },
  watch: {
    editingModalActive() {
      if (!this.editingModalActive) {
        this.resourceEditing = "";
      }
    },
  },
  methods: {
    ...mapActions({
      retrieveResources: "resources/retrieveResources",
      createResource: "resources/createResource",
      updateResource: "resources/updateResource",
    }),
    toggleArchive(res) {
      this.updateResource({
        ...res,
        archived: !res.archived,
      });
    },
    editResource(item) {
      console.log(item);
      this.resourceEditing = item._id;
      this.editingModalActive = true;
    },
    async retrieveData(e) {
      try {
        this.loading = true;
        await this.retrieveResources();
        console.log(this.formData);
        this.loading = false;
      } catch (error) {
        if (error.isAxiosError) {
          console.dir(error);
          return console.log("ERROR DE AXIOS");
        }
        console.log(error);
      }
    },
  },
};
</script>
