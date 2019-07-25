<template>
  <div class="modal">
    <h2 class="modal__title">Ошибка</h2>
    <p class="modal__text">{{ text }}</p>
  </div>
</template>

<script>

export default {
  props: ["text"],
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style scope>

.modal {
  text-align: center;
  /* background-color: var(--backgroundLightColor); */
  /* width: 100%;
  height: 100%; */
}

.modal__title {
  /* color: var(--mainColor); */
  color: #bb6222;  
}

.modal__text {
  color: var(--secondColor);
}

</style>