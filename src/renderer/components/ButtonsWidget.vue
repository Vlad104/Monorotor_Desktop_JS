<template>
  <div class="widget-buttons">
    <input type="button" class="widget-buttons__button" value="1" v-on:click="buttonPressed(1)">
    <input type="button" class="widget-buttons__button" value="2" v-on:click="buttonPressed(2)">
    <input type="button" class="widget-buttons__button" value="3" v-on:click="buttonPressed(3)">
    <input type="button" class="widget-buttons__button" value="4" v-on:click="buttonPressed(4)">
    <input type="button" class="widget-buttons__button" value="5" v-on:click="buttonPressed(5)">
    <input type="button" class="widget-buttons__button" value="6" v-on:click="buttonPressed(6)">
    <input type="button" class="widget-buttons__button" value="7" v-on:click="buttonPressed(7)">
    <input type="button" class="widget-buttons__button" value="8" v-on:click="buttonPressed(8)">
    <input type="button" class="widget-buttons__button" value="9" v-on:click="buttonPressed(9)">
    <input type="button" class="widget-buttons__button" value="." v-on:click="buttonPressed('.')">
    <input type="button" class="widget-buttons__button" value="0" v-on:click="buttonPressed(0)">
    <input type="button" class="widget-buttons__button" value="<" v-on:click="deleteSymbol">
  </div>
</template>

<script>
import { bus } from "../main";

export default {
  name: "ButtonsWidget",
//   props: ["data"],
  data() {
    return {

    };
  },
  mounted() {

  },
  methods: {
    buttonPressed(symbol) {
      console.log(symbol);
    },
    deleteSymbol() {
      console.log('Symbol deleted from: ');
    }
  }
};
</script>

<style scoped>

.widget-buttons {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
}

.widget-buttons__button {
  width: 4rem;
  height: 2rem;
  border: solid 1px var(--secondColor);
  border-radius: 8px;
  background-color: var(--secondColor);
  color: #FFF;
}

.widget-buttons__button:hover {
  border-color: var(--secondDarkColor);
  background-color: var(--secondDarkColor);
  box-shadow: 0 0 10px 0px var(--secondColor);
}
.widget-buttons__button:active {
  box-shadow: inset 0 0 4px 0px #000;
}

.widget-buttons__button:not(hover), btn:not(active) {
   transition: 0.3s;
}

</style>
