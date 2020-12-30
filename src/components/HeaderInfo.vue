<template>
  <header>
    <span>time: {{ time }}</span>
    <span>step counter: {{ stepCounter }}</span>
    <button class="reset" @click="reset">reset</button>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "header-info",
  computed: {
    ...mapGetters({ stepCounter: "getStepCounter", time: "getTime" })
  },
  methods: {
    reset() {
      this.$emit("reset");
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  padding: 20px 30px;
  border-bottom: 1px solid lightgrey;
  display: flex;
  align-items: center;
  span {
    margin-right: 10px;
  }
  .reset {
    margin-left: auto;
    background-color: grey;
    color: #fff;
    font-size: 16px;
    border: 1px solid #000;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
}
</style>
