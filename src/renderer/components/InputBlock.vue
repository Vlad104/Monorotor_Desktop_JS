<template>
  <div id="input-block">
    <a class="label">{{ label }}</a>
    <input class="input" type="number" :value="value" v-on:change="$emit('update:value', $event.target.value)">
  </div>
</template>

<script>

export default {
  name: "InputBlock",
  props: ["label", "value"],
  data() {
    return {
        localValue: this.value,
        localSlug: this.value,
    };
  },
  methods: {

  },
};
</script>

<style scoped>

#input-block {
  margin: 10px 0 10px 0;
  width: 200px;
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

</style>
