<template>
  <v-sheet>
    <v-card>
      <v-card-title>
        <template v-if="currentPartner">
          {{currentPartner.nombre}} {{currentPartner.apellidos}}
        </template>
        <template v-else>
          Pagina de socio
        </template>
      </v-card-title>
      <v-card-text>
        <template v-if="!currentPartner">
          cargando...
        </template>
        <template v-else>
          <v-simple-table>
            <tbody>
              <tr>
                <td>Código</td>
                <td>{{currentPartner.codigo}}</td>
              </tr>
              <tr>
                <td>Tarjeta sip</td>
                <td>{{currentPartner.sipcard}}</td>
              </tr>
              <tr>
                <td>Correo electrónico</td>
                <td>{{currentPartner.correoelectronico}}</td>
              </tr>
              <tr>
                <td>Telefono</td>
                <td>{{currentPartner.telefono}}</td>
              </tr>
              <tr>
                <td>Fecha de nacimiento</td>
                <td>{{currentPartner.fechanacimiento}}</td>
              </tr>
              <tr>
                <td>Socio o no</td>
                <td>{{currentPartner.socioono?.name}}</td>
              </tr>
              <tr>
                <td>Sexo</td>
                <td>{{currentPartner.sexo?.name}}</td>
              </tr>
              <tr>
                <td>Ciudad residencia</td>
                <td>{{currentPartner.ciudadresidencia?.name}}</td>
              </tr>
              <tr>
                <td>Nacionalidad</td>
                <td>{{currentPartner.nacionalidad?.name}}</td>
              </tr>
              <tr>
                <td>Como nos conocio</td>
                <td>{{currentPartner.howDidKnowUs?.name}}</td>
              </tr>
            </tbody>
          </v-simple-table>
          <v-alert color="primary" dark v-if="currentPartner.observaciones">
            <strong>Observaciones</strong>: {{currentPartner.observaciones}}
          </v-alert>
          <v-alert color="primary" dark v-if="currentPartner.cosaspendientes">
            <strong>Cosas pendientes</strong>: {{currentPartner.cosaspendientes}}
          </v-alert>
        </template>
      </v-card-text>
    </v-card>
    <v-card style="margin-top: 10px;">
      <v-card-title>Listado de atenciones</v-card-title>
      <v-card-text>
        <attention-iterator :attentions="attentions" />
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
import AttentionIterator from '@/components/attentions/AttentionIterator.vue';
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  components: { AttentionIterator },
  head() {
    return {
      title: 'Página de socio'
    }
  },
  computed: {
    ...mapGetters('partners', ['getPartnerById']),
    ...mapState('partners', ['currentPartner']),
    ...mapState('attentions', ['attentions'])
  },
  async mounted() {
    const { partnerId } = this.$route.params
    if (this.currentPartner?._id !== partnerId) {
      await this.fetchPartner(partnerId)
    }
    await this.getUserAttentions(partnerId)
  },
  methods: {
    ...mapActions('partners', ['fetchPartner']),
    ...mapActions('attentions', ['getUserAttentions'])
  }
}
</script>
