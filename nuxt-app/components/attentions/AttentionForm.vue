<template>
  <v-card
    :loading="loading"
    :disabled="loading"
    tag="form"
    @submit.prevent="onSubmit"
  >
    <v-card-title> Editor de atenciones </v-card-title>
    <v-card-text>
      <menu-datepicker
        v-model="attention.fechaatencion"
        label="Fecha atencion"
      />
      <v-row>
        <v-col>
          <input-resource
            v-model="attention.tipoaenciones"
            :label="'Tipo de atenciones'"
            :rType="'tipoatenciones'"
            :hideArchived="true"
            :multiple="true"
          />
        </v-col>
        <v-col>
          <input-resource
            v-model="attention.motivosatencion"
            :label="'Motivos de atencion'"
            :hideArchived="true"
            :rType="'motivosatencions'"
            :multiple="true"
          />
        </v-col>
      </v-row>
      <input-resource
        v-model="attention.Proyectos"
        :label="'Proyectos'"
        :hideArchived="true"
        :rType="'proyectos'"
        :multiple="true"
      />
      <v-row>
        <v-col>
          <input-resource
            v-model="attention.derivadoa"
            :label="'Derivado a'"
            :hideArchived="true"
            :rType="'derivaciones'"
            :multiple="true"
          />
        </v-col>
        <v-col>
          <input-resource
            v-model="attention.derivadode"
            :label="'Derivado de'"
            :hideArchived="true"
            :rType="'derivaciones'"
            :multiple="true"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <input-resource
            v-model="attention.formacion"
            :label="'Formacion'"
            :hideArchived="true"
            :rType="'formacions'"
            :multiple="true"
          />
        </v-col>
        <v-col>
          <input-resource
            v-model="attention.voluntariado"
            :label="'Voluntariado'"
            :hideArchived="true"
            :rType="'voluntariados'"
            :multiple="true"
          />
        </v-col>
      </v-row>
      <input-resource
        :multiple="false"
        v-model="attention.lugaratencion"
        :label="'Lugar de atencion'"
        :hideArchived="true"
        :rType="'lugaratencions'"
      />

      <v-textarea v-model="attention.comentario" label="Comentario">
        {{ attention.comentario }}
      </v-textarea>

      <menu-datepicker
        v-model="attention.fechacosaspendientes"
        label="Fecha cosas pendientes"
      />
      <v-textarea v-model="attention.cosaspendientes" label="Cosas pendientes">
        {{ attention.cosaspendientes }}
      </v-textarea>
      <test-table-editor
        v-if="attentionToEdit"
        :attention-id="attentionToEdit._id"
        :enfermedades.sync="attention.tests"
      />
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" elevation="0" color="primary"> Submit </v-btn>
      <v-btn elevation="0"> Cancel </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import InputResource from "../resources/InputResource.vue";
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
}

export default {
  components: { InputResource },
  name: "AttentionForm",
  props: {
    attentionToEdit: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      formData: {},
      attention: {
        _id: "",
        comentario: "",
        fechaatencion: null,
        tipoaenciones: [],
        Proyectos: [],
        motivosatencion: [],
        derivadoa: [],
        derivadode: [],
        formacion: [],
        voluntariado: [],
        lugaratencion: null,
        cosaspendientes: "",
        fechacosaspendientes: null,
        tests: [],
      },
    };
  },
  head() {
    return {
      title: "Editor de atenciones",
    };
  },
  created() {
    if (this.attentionToEdit) {
      this.attention.comentario = this.attentionToEdit.comentario;
      this.attention.tipoaenciones = this.attentionToEdit.tipoaenciones;
      this.attention.Proyectos = this.attentionToEdit.Proyectos;
      this.attention.fechaatencion = this.attentionToEdit.fechaatencion;
      this.attention.motivosatencion = this.attentionToEdit.motivosatencion;
      this.attention.derivadoa = this.attentionToEdit.derivadoa;
      this.attention.derivadode = this.attentionToEdit.derivadode;
      this.attention.formacion = this.attentionToEdit.formacion;
      this.attention.voluntariado = this.attentionToEdit.voluntariado;
      this.attention.lugaratencion = this.attentionToEdit.lugaratencion;
      this.attention.cosaspendientes = this.attentionToEdit.cosaspendientes;
      this.attention.fechacosaspendientes =
        this.attentionToEdit.fechacosaspendientes;
      this.attention.tests = this.attentionToEdit.tests;
      this.attention._id = this.attentionToEdit._id;
    }
  },
  methods: {
    async onSubmit(e) {
      try {
        this.loading = true;
        await this.$emit("submit", this.attention);
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
