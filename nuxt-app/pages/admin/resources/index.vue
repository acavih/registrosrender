<template>
  <v-sheet>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Listado de recursos
            <v-spacer />
            <add-resource-button :disabled="activeResource.length === 0" :activeType="activeResource" />
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="resource in activeResourceList" :key="resource._id">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ resource.name }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-title>
            Tipos de recursos
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item @click="activeResource = type" :class="activeResource === type ? 'grey lighten-3' : ''" v-for="type in resourceTypes" :key="type">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ type }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import AddResourceButton from '@/components/resources/AddResourceButton.vue';
import { mapGetters } from "vuex";
export default {
  components: { AddResourceButton },
  data() {
    return {
      activeResource: ''
    }
  },
  computed: {
    ...mapGetters('resources', ['resourceTypes', 'resourcesOfType']),
    activeResourceList () {
      return this.resourcesOfType(this.activeResource)
    }
  }
}
</script>
