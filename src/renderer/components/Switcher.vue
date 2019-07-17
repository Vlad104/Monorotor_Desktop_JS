<template>
  <div id="switcher">
    <input type="checkbox" :id="id" class="switcher__input"/>
    <label :for="id" class="switcher__label">Toggle</label>
  </div>
</template>

<script>

export default {
  name: "Switcher",
  props: ["id"],
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

.switcher__input {
  height: 0;
  width: 0;
  visibility: hidden;
}
.switcher__label {
  cursor: pointer;
  text-indent: -9999px;
  width: 40px;
  height: 20px;
  background: var(--secondDarkColor);
  display: block;
  border-radius: 20px;
  position: relative;
}
.switcher__label:after {
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
.switcher__input:checked + .switcher__label {
  background: var(--secondDarkColor);
}
.switcher__input:checked + .switcher__label:after {
  left: calc(100% - 1px);
  transform: translateX(-100%);
}
.switcher__label:active:after {
  width: 26px;
}

.switcher__label:hover {
  box-shadow: 0 0 4px 0px var(--mainColor);
}

</style>