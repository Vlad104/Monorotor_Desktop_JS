<template>
  
  <div id="select-block">
    <a class="label">{{ label }}</a>
    <select class="select-items" v-on:change="$emit('select', $event.target.value)">
      <option v-for="item in items" :key="item.id" :value="item.value">{{ item.text }}</option>
    </select>
  </div>
</template>

<script>

import { bus } from "../main";

export default {
  name: "SelectBlock",
  props: ["items", "label"],
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style scope>


#select-block {
  margin: 20px 0 10px 0;
  width: 200px;
}

.select-items {
  /* margin: 10px 0 0 0; */
  text-align: left;
  background-color: var(--backgroundColor);
  height: 1.6rem;
  width: 200px;
  border: 1px solid var(--mainColor);
  border-radius: 5px;
  color: var(--mainColor);
  padding: 0 0 0 0.8em;
  font-size: 0.9rem;
  box-sizing: border-box;
  /* margin-top: 20px; */
}

.select-items:hover {
  box-shadow: 0 0 10px 0px #fff;
}

.select-items:focus {
  box-shadow: 0 0 10px 0px #fff;
}

.select-items:not(hover) {
  transition: 0.3s;
}

.label {
  display: inline-block;
  font-size: 1em;
  height: 1em;
  margin: 0 0 10px 5px;
}

</style>
