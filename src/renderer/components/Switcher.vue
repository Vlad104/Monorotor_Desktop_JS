<template>
  <div id="switcher">
    <input type="checkbox" id="switch"/>
    <label for="switch">Toggle</label>
  </div>
</template>

<script>

export default {
  name: "Switcher",
  data() {
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style scope>

input[type=checkbox] {
  height: 0;
  width: 0;
  visibility: hidden;
}
label {
  cursor: pointer;
  text-indent: -9999px;
  width: 40px;
  height: 20px;
  background: var(--secondDarkColor);
  display: block;
  border-radius: 20px;
  position: relative;
}
label:after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: var(--secondColor);
  border-radius: 50%;
  transition: 0.3s;
}
input:checked + label {
  background: var(--secondDarkColor);
}
input:checked + label:after {
  left: calc(100% - 1px);
  transform: translateX(-100%);
}
label:active:after {
  width: 26px;
}

label:hover {
  box-shadow: 0 0 4px 0px var(--mainColor);
}

</style>