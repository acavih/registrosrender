<template>
  <v-sheet style="position: relative">
    <v-textarea
      ref="textAreaInput"
      @keydown="handleKeyDown"
      @keyup="updateParams"
    />
    <v-sheet :style="autocompleteContainerStyle" v-if="shouldShowAutocomplete">
      <suggestions-panel ref="suggester" :selectedOption="selectedOption" />
    </v-sheet>
  </v-sheet>
</template>

<script>
import getCaretCoordinates from "textarea-caret";
import SuggestionsPanel from "./SuggestionsPanel.vue";
const keyCodes = {
  ENTER: 13,
  DOWN: 40,
  UP: 38,
};

function getActiveToken(el) {
  const input = el.value;
  const cursorPosition = el.selectionEnd;
  // recuperamos la posición actual del cursor
  if (cursorPosition === undefined) return undefined;
  // creamos un array temporal para guardar las palabras
  const words = [];
  // recorremos el texto y lo separamos por espacios y saltos de línea
  input.split(/[\s\n]/).forEach((word, index) => {
    // recuperamos la palabra anterior
    const previous = words[index - 1];
    // calculamos el rango de la palabra
    // recuperamos el índice inicial de la palabra
    const start = index === 0 ? index : previous.range[1] + 1;
    // recuperamos donde termina la palabra
    const end = start + word.length;
    // guardamos la palabra y su rango en el texto
    words.push({ word, range: [start, end] });
  });

  // buscamos en qué palabra estamos dependiendo de la posición del cursor
  return words.find(
    ({ range }) => range[0] <= cursorPosition && range[1] >= cursorPosition
  );
}

export default {
  components: { SuggestionsPanel },
  data() {
    return {
      selectedOption: 0,
      textAreaState: {
        value: "",
        selectionEnd: 0,
      },
      tokenInfo: {
        word: "",
        range: [], // dos posiciones principio y final
        caretCoords: {
          top: 0,
          left: 0,
          height: 0,
        },
      },
    };
  },
  computed: {
    shouldShowAutocomplete() {
      return new RegExp("^/\\w{1,20}").test(this.tokenInfo.word);
    },
    autocompleteContainerStyle() {
      return {
        position: "absolute",
        top:
          this.tokenInfo.caretCoords.top +
          this.tokenInfo.caretCoords.height +
          "px",
        marginTop: "10px",
        width: "100%",
      };
    },
  },
  methods: {
    handleKeyDown(e) {
      if (e.keyCode === keyCodes["ENTER"]) {
        e.preventDefault();
        if (this.shouldShowAutocomplete) {
          this.$refs.suggester.makeTheAction();
        }
        return;
      }
      if (this.shouldShowAutocomplete) {
        if (e.keyCode === keyCodes["UP"]) {
          e.preventDefault();
          this.selectedOption = Math.max(this.selectedOption - 1, 0);
        }
        if (e.keyCode === keyCodes["DOWN"]) {
          e.preventDefault();
          this.selectedOption = Math.min(this.selectedOption + 1, 1);
        }
      }
      // console.log(e.keyCode);
    },
    updateParams(e) {
      const { value, selectionEnd = 0 } = e.target;
      this.textAreaState.value = value;
      this.textAreaState.selectionEnd = selectionEnd;
      const textAreaRef = this.$refs.textAreaInput.$el;
      const input = textAreaRef.querySelector("textarea");
      const { word, range } = getActiveToken(input);
      this.tokenInfo.word = word;
      this.tokenInfo.range = range;
      if (this.shouldShowAutocomplete) {
        this.tokenInfo.caretCoords = getCaretCoordinates(input);
      }
    },
  },
};
</script>

<style>
</style>
