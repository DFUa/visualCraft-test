import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    stepCounter: 0,
    interval: null,
    time: 0
  },

  getters: {
    getItems: state => state.items,
    getStepCounter: state => state.stepCounter,
    getTime: state => {
      if (state.time < 60) {
        return `${state.time}s`;
      } else {
        let minutes = Math.floor(state.time / 60);
        let sec = state.time - minutes * 60;
        return `${minutes}min ${sec}s`;
      }
    }
  },

  mutations: {
    generateItems(state, { length }) {
      let items = [];
      items = Array.from({ length: length }, (a, i) => {
        return [i, i];
      }).flat();

      for (let i = items.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }

      state.items = items;
    },
    resetTimer(state) {
      clearInterval(state.interval);
      state.time = 0;

      state.interval = setInterval(() => {
        state.time = state.time + 1;
      }, 1000);
    },
    increaseCounter(state) {
      state.stepCounter = state.stepCounter + 1;
    },
    resetCounter(state) {
      state.stepCounter = 0;
    }
  },

  actions: {
    startGame(context, length) {
      context.commit("generateItems", { length });
      context.commit("resetTimer");
      context.dispatch("resetCounter");
    },
    increaseCounter(context) {
      context.commit("increaseCounter");
    },
    resetCounter(context) {
      context.commit("resetCounter");
    },
    stopCounter(context) {
      context.commit("stopCounter");
    }
  }
});
