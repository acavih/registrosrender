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
              <td>Fecha de nacimiento</td>
              <td>
                {{ currentPartner.fechanacimiento && currentPartner.fechanacimiento | date }}
                ({{ edadSocio }} años)
              </td>
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
        <v-btn color="primary" @click="addingAttention = true">
          Crear atención
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-data-iterator :options.sync="iteratorOptions" :items="attentions">
          <template #default="props">
            <v-card v-for="attention in props.items" :key="attention._id" class="mb-4">
              <v-card-title>
                {{ attention.fechaatencion | date }}
                <v-spacer />
                <v-btn small elevation="0" color="primary" @click="attentionEditing = attention._id">
                  Editar atencion
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-alert v-if="attention.lugaratencion" type="warning" colored-border border="bottom">
                  <strong>Lugar de atencion</strong>: {{ attention.lugaratencion?.name }}
                </v-alert>
                <v-list>
                  <template v-for="{value, text} in resourcesKeys">
                    <v-list-item v-if="attention[value].length > 0" :key="value + attention._id">
                      <v-list-item-content>
                        <v-list-item-title>{{ text }}</v-list-item-title>
                        <v-list-item-subtitle>
                          <v-chip-group>
                            <v-chip v-for="resource in attention[value]" :key="resource._id" dark color="indigo">
                              {{ resource.name }}
                            </v-chip>
                          </v-chip-group>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list>
                <v-alert color="#2A3B4D" dark>
                  {{ attention.comentario }}
                </v-alert>
                <v-alert v-if="attention.cosaspendientes" type="warning" colored-border border="bottom">
                  <strong>{{ attention.fechacosaspendientes | date }}</strong> {{ attention.cosaspendientes }}
                </v-alert>
              </v-card-text>
            </v-card>
          </template>
        </v-data-iterator>
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
import AttentionForm from '@/components/attentions/AttentionForm.vue'

export default Vue.extend({
  name: 'ShowPartner',
  components: { AttentionForm },
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
      console.log('PARTNEEEER ID', this.$route.params)
      const partner = this.partners.filter(p => p._id === this.$route.params.partnerId)
      return partner[0]
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
    const attentions = await this.$axios.get('/attentions/' + this.$route.params.partnerId)
    this.attentions = attentions.data.payload.attentions
  },
  methods: {
    addAttention (attention) {
      console.log(attention)
    },
    updateAttention (attention) {
      console.log(attention)
    }
  }
})
</script>
