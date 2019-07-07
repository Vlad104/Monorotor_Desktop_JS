<template>
  <div id="input-block-ratio">
    <a class="label">{{ label }}</a>
    <div class="ratio">
      <input class="input input_ratio" type="number" :value="valueA" v-on:change="$emit('changeA', $event.target.value)">
      <input class="input input_ratio" type="number" :value="valueB" v-on:change="$emit('changeB', $event.target.value)">
      <a
        class="proc proc_left"
      >{{ (100 * valueA / (parseFloat(valueA) + parseFloat(valueB))).toFixed(3) }}%</a>
      <a
        class="proc proc_right"
      >{{ (100 * valueB / (parseFloat(valueA) + parseFloat(valueB))).toFixed(3) }}%</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputComplexBlock",
  props: ["label", "valueA", "valueB"],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>

#input-block-ratio {
  margin: 10px 0 10px 0;
  width: 200px;
}

.ratio {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: space-between;
}

.input {
  text-align: left;
  background-color: var(--backgroundColor);
  height: 1.6rem;
  width: 100%;
  border: 1px solid var(--mainColor);
  border-radius: 5px;
  color: var(--mainColor);
  padding: 0 0 0 0.8em;
  font-size: 0.9rem;
  box-sizing: border-box;
}


.input:hover {
  box-shadow: 0 0 10px 0px #FFF;
}

.input:focus {
  box-shadow: 0 0 10px 0px #FFF;
}

.input:not(hover) {
   transition: 0.3s;
}


.label {
  display: inline-block;
  font-size: 1em;
  height: 1em;
  margin: 0 0 10px 5px;
}

.input_ratio {
  display: inline;
  width: 45%;
}

.proc {
  position: absolute;
  top: calc(1.6rem + 2px);
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.158);
}

.proc_left {
  left: 22.5%;
  transform: translate(-50%);
}

.proc_right {
  right: 22.5%;
  transform: translate(50%);
}

</style>
