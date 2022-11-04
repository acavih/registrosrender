<template>
  <v-card outlined class="mb-4">
    <v-card-title>
      {{ attention.fechaatencion | date }}
      <v-spacer />
      <v-btn
        small
        elevation="0"
        class="mr-5"
        color="error"
        @click="removeAttention(attention)"
      >
        Eliminar atencion
      </v-btn>
      <v-btn small elevation="0" color="secondary" @click="editing = true">
        Editar atencion
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-alert
        v-if="attention.lugaratencion"
        type="warning"
        colored-border
        border="bottom"
      >
        <strong>Lugar de atencion</strong>:
        {{ attention.lugaratencion?.name }}
      </v-alert>
      <v-list>
        {{ resourcesKeys }}
        <template v-for="{ value, text } in resourcesKeys">
          <v-list-item
            v-if="attention[value] && attention[value].length > 0"
            :key="value + attention._id"
          >
            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ value }}
                <v-chip-group>
                  <v-chip
                    v-for="resource in attention[value]"
                    :key="resource._id"
                    dark
                    color="indigo"
                  >
                    {{ resource.name }}
                  </v-chip>
                </v-chip-group>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <v-alert v-if="attention.comentario" color="#2A3B4D" dark>
        {{ attention.comentario }}
      </v-alert>
      <v-alert
        v-if="attention.cosaspendientes"
        type="warning"
        colored-border
        border="bottom"
      >
        <strong>{{ attention.fechacosaspendientes | date }}</strong>
        {{ attention.cosaspendientes }}
      </v-alert>
      <v-dialog v-model="editing">
        <attention-form
          @submit="updateAttentions"
          v-if="editing"
          :attentionToEdit="attention"
        />
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script>
import dayjs from "dayjs";
import AttentionForm from "./AttentionForm.vue";
import { mapActions } from "vuex";
export default {
  components: { AttentionForm },
  props: {
    attention: {
      type: Object,
      required: true,
    },
  },
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
      editing: false,
      optionsIterator: this.options,
      resourcesKeys: [
        { value: "tipoaenciones", text: "Tipo de atenciones" },
        { value: "derivadoa", text: "Derivado a" },
        { value: "derivadode", text: "Derivado de" },
        { value: "Proyectos", text: "Proyectos" },
        { value: "formacion", text: "Formación" },
        { value: "motivosatencion", text: "Motivos de atención" },
        { value: "voluntariado", text: "Voluntariados" },
      ],
    };
  },
  methods: {
    ...mapActions({
      updateAttention: "attentions/updateAttention",
    }),
    async updateAttentions(attention) {
      await this.updateAttention({
        payload: attention,
        id: this.attention._id,
      });
      this.editing = false;
      this.$emit("updateData");
    },
  },
};
</script>

<style>
</style>
