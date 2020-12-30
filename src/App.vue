<template>
  <div>
    <header-info @reset="resetGame"></header-info>
    <board @finish="resetGame"></board>
  </div>
</template>

<script>
import HeaderInfo from "./components/HeaderInfo";
import Board from "./components/Board";

import { mapActions } from "vuex";

export default {
  components: { HeaderInfo, Board },
  mounted() {
    this.resetGame();
  },
  methods: {
    ...mapActions(["startGame"]),
    resetGame() {
      let answer = prompt("enter the number of elements", 6);
      if (answer > 0 && +answer) {
        this.startGame(answer);
      } else {
        this.resetGame();
      }
    }
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body,
html {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
}
</style>
