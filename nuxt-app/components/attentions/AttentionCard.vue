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
      <v-btn
        small
        elevation="0"
        color="secondary"
        @click="attentionEditing = attention._id"
      >
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
        <template v-for="{ value, text } in resourcesKeys">
          <v-list-item
            v-if="attention[value].length > 0"
            :key="value + attention._id"
          >
            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
              <v-list-item-subtitle>
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
    </v-card-text>
  </v-card>
</template>

<script>
import dayjs from "dayjs";
export default {
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
      optionsIterator: this.options,
      attentionEditing: "",
      resourcesKeys: [
        { value: "tipoaenciones", text: "Tipo de atenciones" },
        { value: "derivadoa", text: "Derivado a" },
        { value: "derivadode", text: "Derivado de" },
        { value: "Proyectos", text: "Proyectos" },
        { value: "formacion", text: "Formacion" },
        { value: "motivosatencion", text: "Motivos de atencion" },
      ],
    };
  },
};
</script>

<style>
</style>
