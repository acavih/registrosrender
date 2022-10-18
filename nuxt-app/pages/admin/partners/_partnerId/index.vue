<template>
  <v-sheet>
    <v-card>
      <v-card-title>
        {{ currentPartner?.nombre }} {{ currentPartner?.apellidos }}
        <v-spacer />
        <v-btn color="error" class="mr-5" elevation="0" @click="removePartner">
          Eliminar socio
        </v-btn>
        <v-btn color="primary" elevation="0" :to="'/admin/partners/' + $route.params.partnerId + '/edit'">
          Editar socio
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-simple-table>
          <tbody>
            <tr>
              <td>Tarjeta sip</td>
              <td>{{ currentPartner?.sipCard || 'n/a' }}</td>
            </tr>
            <tr>
              <td>Codigo</td>
              <td>{{ currentPartner?.codigo || 'n/a' }}</td>
            </tr>
            <tr>
              <td>Correo electrónico</td>
              <td>{{ currentPartner?.correoelectronico || 'n/a' }}</td>
            </tr>
            <tr>
              <td>Telefono</td>
              <td>{{ currentPartner?.telefono || 'n/a' }}</td>
            </tr>
            <tr>
              <td>Fecha de nacimiento</td>
              <td>
                <template v-if="currentPartner?.fechanacimiento">
                  {{ currentPartner?.fechanacimiento && currentPartner?.fechanacimiento | date }}
                  ({{ edadSocio }} años)
                </template>
                <template v-else>
                  N/A
                </template>
              </td>
            </tr>
            <tr>
              <td>Sexo</td>
              <td>{{ currentPartner?.sexo?.name || 'n/a' }}</td>
            </tr>
            <tr>
              <td>Socio o no</td>
              <td>{{ currentPartner?.socioono?.name || 'n/a' }}</td>
            </tr>
            <tr>
              <td>Ciudad residencia</td>
              <td>{{ currentPartner?.ciudadresidencia?.name || 'n/a' }}</td>
            </tr>
            <tr>
              <td>Nacionalidad</td>
              <td>{{ currentPartner?.nacionalidad?.name || 'n/a' }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <v-card outlined class="mt-4">
      <v-card-title>
        Atenciones
        <v-spacer />
        <v-btn color="primary" elevation="0" @click="addingAttention = true">
          Crear atención
        </v-btn>
      </v-card-title>

      <v-card-text>
        <attentions-iterator :options.sync="iteratorOptions" :attentions="attentions" @retrieve-attentions="retrieveAttentions" />
      </v-card-text>
    </v-card>
    <v-dialog v-model="addingAttention">
      <attention-form v-if="addingAttention" @submit-attention="addAttention" />
    </v-dialog>
    <v-dialog v-if="isEditingAttention" :value="true" @click:outside="attentionEditing = ''">
      <attention-form v-if="isEditingAttention" :attention-to-edit="currentAttention" @submit-attention="updateAttention" />
    </v-dialog>
    <nuxt />
  </v-sheet>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import dayjs from 'dayjs'
import AttentionsIterator from '../../../../components/attentions/AttentionsIterator.vue'
import AttentionForm from '@/components/attentions/AttentionForm.vue'

export default Vue.extend({
  name: 'ShowPartner',
  components: { AttentionForm, AttentionsIterator },
  filters: {
    date (d) {
      try {
        return dayjs(d).format('DD/MM/YYYY')
      } catch (error) {
        return 'n/a'
      }
    }
  },
  data () {
    return {
      addingAttention: false,
      attentionEditing: '',
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
      },
      resourcesKeys: [
        { value: 'tipoaenciones', text: 'Tipo de atenciones' },
        { value: 'derivadoa', text: 'Derivado a' },
        { value: 'derivadode', text: 'Derivado de' },
        { value: 'Proyectos', text: 'Proyectos' },
        { value: 'formacion', text: 'Formacion' },
        { value: 'motivosatencion', text: 'Motivos de atencion' }
      ]
    }
  },
  computed: {
    ...mapState('partners', ['partners']),
    currentAttention () {
      if (!this.attentionEditing) { return null }
      return this.attentions.filter(a => a._id === this.attentionEditing)[0]
    },
    isEditingAttention () {
      return this.currentAttention !== null
    },
    currentPartner () {
      try {
        const partner = this.partners.filter(p => p._id === this.$route.params.partnerId)
        return partner[0]
      } catch (error) {
        return null
      }
    },
    edadSocio () {
      if (!this.currentPartner.fechanacimiento) { return '' }
      const hoy = new Date()
      const cumpleanos = new Date(this.currentPartner.fechanacimiento)
      let edad = hoy.getFullYear() - cumpleanos.getFullYear()
      const m = hoy.getMonth() - cumpleanos.getMonth()

      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--
      }

      return edad
    }
  },
  async mounted () {
    if (!this.currentPartner) {
      console.log('retrieving partner...')
    }
    await this.retrieveAttentions()
  },
  methods: {
    async retrieveAttentions () {
      const attentions = await this.$axios.get('/attentions/' + this.$route.params.partnerId)
      this.attentions = attentions.data.payload.attentions
    },
    async removePartner () {
      try {
        await this.$axios.delete('/partners/' + this.$route.params.partnerId)
        this.$router.push('/admin/partners')
      } catch (error) {
        if (error.isAxiosError) {
          return this.$dialog.notify.error(
            error.response.status === 400 ? error.response.data.message : 'Hubo un error durante la peticion'
          )
        }
        console.dir(error)
        return this.$dialog.notify.error(
          'Hubo un error interno'
        )
      }
    },
    async addAttention (attention) {
      const { _id, ...payload } = attention
      const partnerId = this.$route.params.partnerId
      await this.$axios.post('/attentions/' + partnerId, payload)
      this.retrieveAttentions()
      this.addingAttention = ''
    },
    async updateAttention (attention) {
      console.log(attention)
      await this.$axios.put('/attentions/' + attention._id, attention)
      this.retrieveAttentions()
      this.attentionEditing = ''
    }
  }
})
</script>
