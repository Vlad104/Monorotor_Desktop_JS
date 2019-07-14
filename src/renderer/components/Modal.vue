<template>
  <div class="modal">
    <h2>This is created inline</h2>
    <p>{{ text }}</p>
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
  /* margin-left: auto; */
  /* margin-right: auto; */
  /* width: 300px; */
  /* height: 200px; */
}

</style>