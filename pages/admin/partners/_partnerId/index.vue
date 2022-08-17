<template>
  <v-sheet>
    <v-card>
      <v-card-title>
        {{ currentPartner?.nombre }} {{ currentPartner?.apellidos }}
        <v-spacer />
        <v-btn color="primary" elevation="0" :to="'/admin/partners/' + $route.params.partnerId + '/edit'">
          Editar socio
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-simple-table>
          <tbody>
            <tr>
              <td>Tarjeta sip</td>
              <td>{{ currentPartner.sipCard || 'n/a' }}</td>
            </tr>
            <tr>
              <td>Codigo</td>
              <td>{{ currentPartner.codigo || 'n/a' }}</td>
            </tr>
            <tr>
              <td>Correo electrónico</td>
              <td>{{ currentPartner.correoelectronico || 'n/a' }}</td>
            </tr>
            <tr>
              <td>Telefono</td>
              <td>{{ currentPartner.telefono || 'n/a' }}</td>
            </tr>
            <tr>
              <td>Sexo</td>
              <td>{{ currentPartner.sexo?.name || 'n/a' }}</td>
            </tr>
            <tr>
              <td>Socio o no</td>
              <td>{{ currentPartner.socioono?.name || 'n/a' }}</td>
            </tr>
            <tr>
              <td>Ciudad residencia</td>
              <td>{{ currentPartner.ciudadresidencia?.name || 'n/a' }}</td>
            </tr>
            <tr>
              <td>Nacionalidad</td>
              <td>{{ currentPartner.nacionalidad?.name || 'n/a' }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <v-card outlined class="mt-4">
      <v-card-title>
        Atenciones
        <v-spacer />
        <v-btn color="primary">
          Crear atención
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-data-iterator :options.sync="iteratorOptions" :items="attentions">
          <template #default="props">
            <v-card v-for="attention in props.items" :key="attention._id" class="mb-4">
              <v-card-title>
                {{ attention.fechaatencion }}
              </v-card-title>
              <v-card-text>
                {{ attention.comentario }}
              </v-card-text>
            </v-card>
          </template>
        </v-data-iterator>
      </v-card-text>
    </v-card>
    <nuxt />
  </v-sheet>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'ShowPartner',
  data () {
    return {
      attentions: [],
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
    ...mapState('partners', ['partners']),
    currentPartner () {
      console.log('PARTNEEEER ID', this.$route.params)
      const partner = this.partners.filter(p => p._id === this.$route.params.partnerId)
      return partner[0]
    }
  },
  async mounted () {
    const attentions = await this.$axios.get('/attentions/' + this.$route.params.partnerId)
    this.attentions = attentions.data.payload.attentions
  }
})
</script>
