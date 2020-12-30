<template>
  <div class="board" :style="setStyle">
    <div
      :class="{
        'board-item': true,
        disabled: disableAllItems,
        opened: isItemOpen(index)
      }"
      v-for="(item, index) in items"
      :key="index"
      @click="openItem(index, item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "board",
  data() {
    return {
      openedItem: null,
      openedItems: [],
      disableAllItems: false
    };
  },
  computed: {
    ...mapGetters({
      items: "getItems",
      stepCounter: "getStepCounter",
      time: "getTime"
    }),
    calculateRowNumbers() {
      return Math.ceil(Math.sqrt(this.items.length));
    },
    setStyle() {
      return `grid-template-columns: repeat(${this.calculateRowNumbers}, 75px)`;
    }
  },
  methods: {
    ...mapActions(["increaseCounter"]),
    isItemOpen(index) {
      return this.openedItems.includes(index);
    },
    openItem(index, value) {
      if (!this.disableAllItems && !this.isItemOpen(index)) {
        this.openedItems.push(index);

        if (this.openedItem) {
          if (this.openedItem !== `${value}`) {
            this.disableAllItems = true;
            setTimeout(() => {
              this.disableAllItems = false;
              this.openedItems.splice(-2, 2);
            }, 1000);
          }
          this.openedItem = null;
          this.increaseCounter();
        } else {
          this.openedItem = `${value}`;
        }

        if (this.openedItems.length === this.items.length) {
          alert(
            `Congratilation!\ntime spend: ${this.time}\nsteps: ${this.stepCounter}`
          );
          this.$emit("finish");
        }
      }
    }
  },
  watch: {
    items() {
      this.openedItems = [];
    }
  }
};
</script>

<style lang="scss" scoped>
.board {
  padding: 20px 30px;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-gap: 1px;
  .board-item {
    text-align: center;
    background-color: aqua;
    border: 1px solid lightgrey;
    line-height: 75px;
    font-size: 0;
    height: 75px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
    &.opened {
      font-size: 40px;
      background-color: grey;
      cursor: default;
    }
    &.disabled {
      cursor: default;
    }
  }
}
</style>
