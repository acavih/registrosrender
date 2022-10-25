<template>
  <v-card :loading="loading" :disabled="loading">
    <v-card-title> Recursos </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field v-model="queryTxt" label="Buscar recurso" />
          <v-data-iterator :items="filteredResources" v-slot="{items}">
            <v-list>
              <v-list-item @click="() => {}" v-for="item in items" :key="item._id">
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.type }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <div>
                    <v-btn icon>
                      <v-icon> mdi-package-{{ item.archived ? 'up' : 'down'}} </v-icon>
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
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ResourcesList",
  data() {
    return {
      loading: false,
      activeResource: "",
      queryTxt: ''
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
    ...mapGetters({
      resourcesTypes: "resources/typesResources",
      resourceBy: "resources/resourceType",
    }),
    currentList() {
      return this.resourceBy(this.activeResource);
    },
    filteredResources() {
      return this.queryTxt.length === 0 ? this.currentList : this.currentList.filter(r => new RegExp(this.queryTxt, 'i').test(r.name))
    }
  },
  methods: {
    ...mapActions({
      retrieveResources: "resources/retrieveResources",
    }),
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
