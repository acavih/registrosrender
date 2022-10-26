<template>
  <v-card
    :loading="loading"
    :disabled="loading"
    tag="form"
    @submit.prevent="onSubmit"
  >
    <v-card-title>Editor de recursos</v-card-title>
    <v-card-text>
      <v-text-field label="Nombre del recurso" v-model="formData.name" />
      <v-text-field
        label="Tipo del recurso"
        v-model="formData.type"
        :readonly="typeReadOnly"
        :disabled="typeReadOnly"
      />
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" elevation="0" color="primary"> Submit </v-btn>
      <v-btn elevation="0"> Cancel </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ResourceEditor.vue",
  props: {
    typeReadOnly: {
      type: Boolean,
      default: false,
    },
    resourceEditing: {
      type: String,
      default: ''
    },
    typeResource: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      configured: false,
      loading: false,
      formData: {
        _id: '',
        name: '',
        type: ''
      },
    };
  },
  head() {
    return {
      title: "Editor de recursos",
    };
  },
  mounted () {
    this.setParams()
  },
  updated () {
    this.setParams()
  },
  computed: {
    ...mapGetters({
      getResource: 'resources/getResoruce'
    })
  },
  methods: {
    setParams () {
      if (this.configured) return
      if (this.resourceEditing !== '') {
        const resourceGot = this.getResource(this.resourceEditing)
        const resource = {...resourceGot}
        this.formData._id = resource._id
        this.formData.name = resource.name
        this.formData.type = resource.type
      } else {
        this.formData.name = ''
        this.formData.type = this.typeResource
      }
      this.configured = true
    },
    async onSubmit(e) {
      try {
        this.loading = true;
        await this.$emit('submit', this.formData)
        this.loading = false;
        this.$emit('close')
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
