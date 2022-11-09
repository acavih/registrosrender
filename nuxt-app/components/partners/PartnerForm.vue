<template>
  <v-card
    :loading="loading"
    :disabled="loading"
    tag="form"
    @submit.prevent="onSubmit"
  >
    <v-card-title> Editor de socios </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field v-model="partnerData.codigo" label="Codigo" />
        </v-col>
        <v-col>
          <v-text-field v-model="partnerData.nombre" label="Nombre" />
        </v-col>
        <v-col>
          <v-text-field v-model="partnerData.apellidos" label="Apellidos" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="partnerData.correoelectronico"
            label="Correo electrónico"
          />
        </v-col>
        <v-col>
          <v-text-field v-model="partnerData.telefono" label="Telefono" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <menu-datepicker
            v-model="partnerData.fechanacimiento"
            label="Fecha de nacimiento"
          />
        </v-col>
        <v-col>
          <v-text-field v-model="partnerData.sipcard" label="Tarjeta sip" />
        </v-col>
      </v-row>
      <v-textarea v-model="partnerData.observaciones" label="Observaciones">
        {{ partnerData.observaciones }}
      </v-textarea>
      <v-textarea
        v-model="partnerData.cosaspendientes"
        label="Cosas pendientes"
      >
        {{ partnerData.cosaspendientes }}
      </v-textarea>

      <v-row>
        <v-col>
          <input-resource
            v-model="partnerData.sexo"
            :multiple="false"
            :rType="'sexos'"
            :hideArchived="true"
            :label="'Introduzca el sexo'"
          />
        </v-col>
        <v-col>
          <input-resource
            v-model="partnerData.socioono"
            :multiple="false"
            :hideArchived="true"
            :rType="'socioonos'"
            :label="'Introduzca socio o no'"
          />
        </v-col>
        <v-col>
          <input-resource
            v-model="partnerData.ciudadresidencia"
            :multiple="false"
            :hideArchived="true"
            :rType="'residencias'"
            :label="'Introduzca la residencia'"
          />
        </v-col>
        <v-col>
          <input-resource
            v-model="partnerData.nacionalidad"
            :multiple="false"
            :hideArchived="true"
            :rType="'nacionalidads'"
            :label="'Introduzca la nacionalidad'"
          />
        </v-col>
        <v-col cols="12">
          <input-resource
            v-model="partnerData.howDidKnowUs"
            :multiple="false"
            :hideArchived="true"
            :rType="'comoNosConoció'"
            :label="'Como nos conociste'"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" elevation="0" color="primary">
        Guardar cambios
      </v-btn>
      <v-btn elevation="0" @click="$emit('cancel')"> Cancelar </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import MenuDatepicker from "../MenuDatepicker.vue";
import InputResource from "../resources/InputResource.vue";

const defaultMemberData = {
  codigo: "",
  nombre: "",
  apellidos: "",
  fechanacimiento: null,
  sipcard: "",
  correoelectronico: "",
  telefono: "",
  observaciones: "",
  cosaspendientes: "",
  sexo: "",
  socioono: "",
  nacionalidad: "",
  ciudadresidencia: "",
  howDidKnowUs: "",
};

export default {
  components: { MenuDatepicker, InputResource },
  name: "PartnerForm.vue",
  props: {
    partnerToEdit: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      partnerData: {},
    };
  },
  created() {
    this.partnerData =
      this.partnerToEdit === null
        ? { ...defaultMemberData }
        : {
            ...this.partnerToEdit,
            fechanacimiento:
              this.partnerToEdit.fechanacimiento === null
                ? null
                : new Date(this.partnerToEdit.fechanacimiento),
          };
  },
  head() {
    return {
      title: "Añadir miembro",
    };
  },
  methods: {
    async onSubmit(e) {
      try {
        this.loading = true;
        this.$emit("submit", this.partnerData);
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
