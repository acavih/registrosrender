<template>
  <v-sheet>
    <v-data-iterator :options.sync="optionsIterator" :items="attentions">
      <template #default="props">
        <v-card v-for="attention in props.items" :key="attention._id" outlined class="mb-4">
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
    <v-dialog :value="attentionEditing.length > 1" @click:outside="attentionEditing = ''">
      <attention-form v-if="attentionEditing" :attention-to-edit="attentionActive" />
    </v-dialog>
  </v-sheet>
</template>

<script>
import Vue from 'vue'
import dayjs from 'dayjs'
import AttentionForm from './AttentionForm.vue'

export default Vue.extend({
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
  props: {
    options: {
      type: Object,
      default: () => ({}),
      required: true
    },
    attentions: {
      type: Array,
      default: () => ([]),
      required: true
    }
  },
  data () {
    return {
      optionsIterator: this.options,
      attentionEditing: '',
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
    attentionActive () {
      return this.attentions.filter(a => a._id === this.attentionEditing)[0]
    }
  },
  watch: {
    optionsIterator () {
      this.$emit('update:options', this.optionsIterator)
    }
  }
})
</script>
