<template>
  <v-card :loading="loading" :disabled="loading">
    <v-card-title>
      Vista de socio
      <v-spacer />
      <v-btn
        color="primary"
        elevation="0"
        :to="'/admin/partners/' + $route.params.partnerId + '/AddAttention'"
        >Añadir atención</v-btn
      >
    </v-card-title>
    <v-card-text>
      <v-simple-table>
        <tbody>
          <tr>
            <td>Tarjeta sip</td>
            <td>{{ partner?.sipCard || "n/a" }}</td>
          </tr>
          <tr>
            <td>Codigo</td>
            <td>{{ partner?.codigo || "n/a" }}</td>
          </tr>
          <tr>
            <td>Correo electrónico</td>
            <td>{{ partner?.correoelectronico || "n/a" }}</td>
          </tr>
          <tr>
            <td>Telefono</td>
            <td>{{ partner?.telefono || "n/a" }}</td>
          </tr>
          <tr>
            <td>Fecha de nacimiento</td>
            <td>
              <template v-if="partner?.fechanacimiento">
                {{
                  partner?.fechanacimiento && partner?.fechanacimiento | date
                }}
                ({{ edadSocio }} años)
              </template>
              <template v-else> N/A </template>
            </td>
          </tr>
          <tr>
            <td>Sexo</td>
            <td>{{ partner?.sexo?.name || "n/a" }}</td>
          </tr>
          <tr>
            <td>Socio o no</td>
            <td>{{ partner?.socioono?.name || "n/a" }}</td>
          </tr>
          <tr>
            <td>Ciudad residencia</td>
            <td>{{ partner?.ciudadresidencia?.name || "n/a" }}</td>
          </tr>
          <tr>
            <td>Nacionalidad</td>
            <td>{{ partner?.nacionalidad?.name || "n/a" }}</td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-card-text>
        <attentions-iterator :attentions="userAttentions" />
      </v-card-text>
    </v-card-text>
    <nuxt />
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import dayjs from "dayjs";
import AttentionsIterator from "../../../../components/attentions/AttentionsIterator.vue";

export default {
  components: { AttentionsIterator },
  name: "PartnerView",
  filters: {
    date(d) {
      try {
        return dayjs(d).format("DD/MM/YYYY");
      } catch (error) {
        return "n/a";
      }
    },
  },
  data() {
    return {
      loading: false,
      data: [],
      headers: [{ text: "Calories", value: "calories" }],
    };
  },
  head() {
    return {
      title: "Vista de socio",
    };
  },
  async mounted() {
    // await this.retrieveData();
    await this.retrieveData();
    this.loading = false;
  },
  computed: {
    ...mapState({
      partners: (s) => s.partners.partners,
      userAttentions: (s) => s.attentions.userAttentions,
    }),
    partner() {
      return this.partners.filter(
        (p) => p._id === this.$route.params.partnerId
      )[0];
    },
    edadSocio() {
      if (!this.partner.fechanacimiento) {
        return "";
      }
      const hoy = new Date();
      const cumpleanos = new Date(this.partner.fechanacimiento);
      let edad = hoy.getFullYear() - cumpleanos.getFullYear();
      const m = hoy.getMonth() - cumpleanos.getMonth();

      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
      }

      return edad;
    },
  },
  methods: {
    ...mapActions({
      retrievePartner: "partners/retrievePartner",
      retrieveAttentions: "attentions/getUserAttentions",
    }),
    async retrieveData() {
      try {
        this.loading = true;
        if (!this.partner) {
          await this.retrievePartner(this.$route.params.partnerId);
        }
        await this.retrieveAttentions(this.$route.params.partnerId);
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
